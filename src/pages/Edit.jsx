import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuthValue } from "../contexts/AuthContext";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
import { useFetchDocument } from "../hooks/useFetchDocument";

const Edit = () => {
  const { id } = useParams();
  const { document: object } = useFetchDocument("objects", id);

  const [quantity, setQuantity] = useState("");
  const [unity, setUnity] = useState("unid(s)");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("N.I.");
  const [brand, setBrand] = useState("N.I.");
  const [section, setSection] = useState("");
  const [shelf, setShelf] = useState("");
  const [inquiryNumber, setInquiryNumber] = useState("");
  const [reportNumber, setReportNumber] = useState("");
  const [term, setTerm] = useState("");
  const [aai, setAai] = useState("");
  const [itemsChar, setItemsChar] = useState([]);
  const [status, setStatus] = useState("");
  const [formError, setFormError] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (object) {
      setQuantity(object.quantity);
      setUnity(object.unity);
      setTitle(object.title);
      setType(object.type);
      setColor(object.color);
      setBrand(object.brand);
      setSection(object.section);
      setShelf(object.shelf);
      setInquiryNumber(object.inquiryNumber);
      setReportNumber(object.reportNumber);
      setTerm(object.term);
      setAai(object.aai);
      setFormError(object.formError);
      setStatus(object.status);
      setItemsChar([]);
    }
  }, [object]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("objects");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("Ocorreu algum erro!");
    setLoading(true);
    setMessage("Objeto atualizado no sistema com sucesso!");

    const data = {
      quantity,
      unity,
      title,
      type,
      color,
      brand,
      section,
      shelf,
      inquiryNumber,
      reportNumber,
      term,
      aai,
      status,
      uid: user.uid,
      registredBy: user.displayName,
      itemsChar: [
        type,
        color,
        brand,
        inquiryNumber,
        reportNumber,
        term,
        aai,
        "deposited",
      ],
    };

    await updateDocument(id, data);

    console.log(user.uid);

    setLoading(false);

    navigate("/");
  };

  return (
    <div className="edit">
      <h1>Editar detalhes do objeto registrado:</h1>
      {object && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="qtt">
              <input
                required
                type="number"
                placeholder="Quantidade"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <select
                value={unity}
                onChange={(e) => setUnity(e.target.value)}
                required
              >
                <option value="unid">unidade(s)</option>
                <option disabled value="kgr">kilo(s)</option>
                <option disabled value="gr">grama(s)</option>
                <option disabled value="mt">metro(s)</option>
                <option disabled value="ml">mililitro(s)</option>
                <option disabled value="lt">litro(s)</option>
                <option disabled value="fls">folha(s)</option>
              </select>
            </div>
            <input
              required
              type="text"
              placeholder="Nome do objeto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="especifications ">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Tipo de objeto</option>
                <option value="Arma">Arma</option>
                <option value="Munição">Munição</option>
                <option value="Entorpecente">Entorpecente</option>
                <option value="Documento">Documento</option>
                <option value="Celular">Celular</option>
                <option value="Ferramenta">Ferramenta</option>
                <option value="Jóia">Jóia / semi-jóia</option>
                <option value="Eletrodoméstico">Eletrodoméstico</option>
                <option value="Eletrônico">Eletrônico</option>
                <option value="Cosmético">Cosmético</option>
                <option value="Móvel">Móvel</option>
                <option value="Outro">Outro</option>
              </select>
              {type !== "Arma" && type !== "Munição" && type !== "Documento" ? (
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  <option value="N.I.">Cor</option>
                  <option value="azul">azul</option>
                  <option value="amarelo">amarelo</option>
                  <option value="vermelho">vermelho</option>
                  <option value="verde">verde</option>
                  <option value="preto">preto</option>
                  <option value="cinza">cinza</option>
                  <option value="branco">branco</option>
                  <option value="rosa">rosa</option>
                  <option value="roxo">roxo</option>
                  <option value="prata">prata</option>
                  <option value="grafite">grafite</option>
                  <option value="marrom">marrom</option>
                  <option value="lilás">lilás</option>
                </select>
              ) : (
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  <option value="N.I.">N.I.</option>
                  <option value="outros">outros</option>
                </select>
              )}
              {type === "Celular" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="N.I.">Marca</option>
                  <option value="iPhone">iPhone</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Motorola">Motorola</option>
                  <option value="Asus">Asus</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Nokia">Nokia</option>
                  <option value="Sony">Sony</option>
                </select>
              )}

              {type === "Eletrodoméstico" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="Samsung">Samsung</option>
                  <option value="Philco">Philco</option>
                  <option value="Philips">Philips</option>
                  <option value="LG">LG</option>
                  <option value="Toshiba">Toshiba</option>
                  <option value="Brastemp">Brastemp</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Elgin">Elgin</option>
                  <option value="Eletrolux">Eletrolux</option>
                  <option value="Gree">Gree</option>
                  <option value="Consul">Consul</option>
                  <option value="Midea">Midea</option>
                  <option value="Dako">Dako</option>
                  <option value="Aoc">Aoc</option>
                  <option value="Outros">Outros</option>
                </select>
              )}
              {type === "Eletrônico" && (
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            >
              <option value="Samsung">Samsung</option>
              <option value="Philco">Philco</option>
              <option value="Philips">Philips</option>
              <option value="LG">LG</option>
              <option value="Toshiba">Toshiba</option>
              <option value="Brastemp">Brastemp</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Elgin">Elgin</option>
              <option value="Eletrolux">Eletrolux</option>
              <option value="Gree">Gree</option>
              <option value="Consul">Consul</option>
              <option value="Midea">Midea</option>
              <option value="Dako">Dako</option>
              <option value="Aoc">Aoc</option>
            </select>
          )}
              {type === "Cosmético" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="Boticário">Boticário</option>
                  <option value="Natura">Natura</option>
                  <option value="Pacco Rabane">Pacco Rabane</option>
                  <option value="Dolce e Gabbana">Dolce e Gabbana</option>
                  <option value="Hinodde">Hinodde</option>
                  <option value="Calvin Klein">Calvin Klein</option>
                  <option value="Outros">Outros</option>
                </select>
              )}
              {type === "Munição" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="N.I.">Marca</option>
                  <option value="CBC">CBC</option>
                  <option value="CCI">CCI</option>
                  <option value="Elei">Elei</option>
                  <option value="Aguila">Aguila</option>
                  <option value="Sellier&Bellot">Sellier&Bellot</option>
                  <option value="Speer">Speer</option>
                  <option value="Outros">Outros</option>
                </select>
              )}
              {type === "Arma" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="N.I.">Marca</option>
                  <option value="Imbel">Imbel</option>
                  <option value="Taurus">Taurus</option>
                  <option value="Glock">Glock</option>
                  <option value="Rossi">Rossi</option>
                  <option value="Boito">Boito</option>
                  <option value="DFA">DFA</option>
                  <option value="Outros">Outros</option>
                </select>
              )}
              {type === "Documento" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="Original">Original</option>
                  <option value="Cópia">Cópia</option>
                  <option value="Outros">Outros</option>
                </select>
              )}
              {type === "Entorpecente" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="N.I">N.I</option>
                  <option value="Outros">Outros</option>
                </select>
              )}
              {type === "Ferramenta" && (
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  <option value="N.I.">Marca</option>
                  <option value="Husquivarna">Husquivarna</option>
                  <option value="Tramontina">Tramontina</option>
                  <option value="Sthill">Sthill</option>
                  <option value="Makita">Makita</option>
                  <option value="Bosh">Bosh</option>
                  <option value="Dewalt">Dewalt</option>
                  <option value="Outros">Outros</option>
                </select>
              )}
            </div>
            <div className="place">
              <input
                required
                type="number"
                placeholder="Seção"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
              <input
                required
                type="number"
                placeholder="Prateleira"
                value={shelf}
                onChange={(e) => setShelf(e.target.value)}
              />
            </div>
            <div className="procedure">
              <input
                type="text"
                placeholder="Nº de Inquérito"
                value={inquiryNumber}
                onChange={(e) => setInquiryNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nº de TC"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nº de AAI"
                value={aai}
                onChange={(e) => setAai(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Nº de Ocorrência"
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
              />
            </div>
            <div className="editstatus">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="deposited">
                  O objeto permanece arquivado no depósito.
                </option>
                <option value="refound">
                  O referido objeto foi restituído
                </option>
                <option value="incinerated">
                  O referido objeto foi incinerado
                </option>
              </select>
            </div>
            {!response.loading || !loading ? (
              <button>Atualizar</button>
            ) : (
              <button className="loadingBTN" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p>{response.error}</p>}
            {formError && <p>{formError}</p>}
            <span>
              <p>Retornar para a página inicial?</p>
              <Link to="/">Clique aqui!</Link>
            </span>
          </form>
        </>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Edit;
