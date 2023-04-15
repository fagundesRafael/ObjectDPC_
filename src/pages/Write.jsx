import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "../contexts/AuthContext";
import { useInsertDocument } from "../hooks/useInsertDocument";

const Write = () => {
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
  const [formError, setFormError] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("objects");

  const navigate = useNavigate();

  const itemsChar = [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    setLoading(true)
    setMessage("Objeto inserito no sistema com sucesso!")

    itemsChar.push(
      type,
      color,
      brand,
      inquiryNumber,
      reportNumber,
      term,
      aai,
      "deposited"
    );

    console.log(itemsChar);

    await insertDocument({
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
      status: "deposited",
      uid: user.uid,
      registredBy: user.displayName,
      itemsChar,
    });

    console.log(user.uid);

    setLoading(false)

    navigate("/");
  };

  return (
    <div className="write">
      <h1>Registrar objeto no depósito:</h1>
      <form onSubmit={handleSubmit}>
        <div className="qtt">
          <input
            required
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            value={unity}
            onChange={(e) => setUnity(e.target.value)}
            required
          >
            <option value="unid(s)">unid</option>
            <option value="kgr(s)">kg</option>
            <option value="gr(s)">gr</option>
            <option value="mt(s)">mt</option>
            <option value="ml(s)">ml</option>
            <option value="lt(s)">lt(s)</option>
            <option value="Outros">Outros</option>
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
            <option value="N.I.">Tipo de objeto</option>
            <option value="Arma">Arma</option>
            <option value="Munição">Munição</option>
            <option value="Entorpecente">Entorpecente</option>
            <option value="Documento">Documento</option>
            <option value="Celular">Celular</option>
            <option value="Ferramenta">Ferramenta</option>
            <option value="Jóia">Jóia</option>
            <option value="Semi-jóia">Semi-jóia</option>
            <option value="Eletrodoméstico">Eletrodoméstico</option>
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
        {!response.loading || !loading ? (
          <button>Registrar</button>
        ) : (
          <button className="loadingBTN" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p>{response.error}</p>}
        <span>
          <p>Retornar para a página inicial?</p>
          <Link to="/">Clique aqui!</Link>
        </span>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Write;
