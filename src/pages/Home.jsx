import React from "react";

import { useAuthValue } from "../contexts/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { useNavigate, Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

import { useState } from "react";
// import ObjectDetailAll from "../components/ObjectDetailAll";
// import ObjectDetailDeposited from "../components/ObjectDetailDeposited";
// import ObjectDetailRefound from "../components/ObjectDetailRefound";

const Home = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [message, setMessage] = useState("");

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: objects, loading } = useFetchDocuments(
    "objects",
    null,
    uid
  );

  const { deleteDocument } = useDeleteDocument("objects");

  console.log(uid);
  console.log(objects);

  const messageDelete = () => {
    setMessage("Clique duas vezes para deletar o objeto selecionado!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="home">
      <h1>Lista de objetos no depósito:</h1>
      <form onSubmit={handleSubmit}>
        <div className="search">
          <input
            type="text"
            placeholder="Informe apenas um parâmetro de busca (Tipo/classe, marca/modelo, cor, número de IPL, TC, AAI ou ocorrência policial):"
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Todos objetos (histórico)</option>
            <option value="deposited">Objetos presentes no depósito</option>
            <option value="refound">Objetos retirados do depósito</option>
          </select>
          <button>Pesquisar</button>
        </div>
      </form>
      <div className="items">
        <div className="infoBar">
          <h4>Quantidade</h4>
          <h4>Item</h4>
          <h4>Tipo/classe</h4>
          <h4>Marca/modelo</h4>
          <h4>Cor</h4>
          <h4>IPL</h4>
          <h4>TC</h4>
          <h4>AAI</h4>
          <h4>Oc Policial</h4>
        </div>
        {loading && <p className="loading">Carregando...</p>}
        {message && <p className="message">{message}</p>}
        {/* --------------------------ALL CONDITION----------------------- */}
        {/* {objects && status === "all" && objects.map((object) => <ObjectDetailAll key={object.id} object={object} />)} */}
        {objects &&
          status === "all" &&
          objects.map((object) => (
            <div className="objects" key={object.id}>
              <h4>
                {object.quantity} {object.unity}
              </h4>
              <h4>{object.title}</h4>
              <h4>{object.type}</h4>
              <h4>{object.brand}</h4>
              <h4>{object.color}</h4>
              <h4>{object.inquiryNumber}</h4>
              <h4>{object.term}</h4>
              <h4>{object.aai}</h4>
              <h4>{object.reportNumber}</h4>
              <div className="links">
                <Link to={`/object/${object.id}`}>
                  <span>
                    <BsIcons.BsSearch />
                  </span>
                </Link>
                <Link to={`/edit/${object.id}`}>
                  <span>
                    <FaIcons.FaEdit />
                  </span>
                </Link>
                <button
                  onClick={messageDelete}
                  onDoubleClick={() => deleteDocument(object.id)}
                >
                  <span>
                    <MdIcons.MdDelete />
                  </span>
                </button>
              </div>
            </div>
          ))}
        {/* --------------------------DEPOSITED CONDITION----------------------- */}
        {/* {objects &&
          status === "deposited" &&
          objects.map((object) => (
            <ObjectDetailDeposited key={object.id} object={object} />
          ))} */}
        {objects &&
          status === "deposited" &&
          objects.map((object) => (
            <div className="objects" key={object.id}>
              {object.status === "deposited" && (
                <h4>
                  {object.quantity} {object.unity}
                </h4>
              )}
              {object.status === "deposited" && <h4>{object.title}</h4>}
              {object.status === "deposited" && <h4>{object.type}</h4>}
              {object.status === "deposited" && <h4>{object.brand}</h4>}
              {object.status === "deposited" && <h4>{object.color}</h4>}
              {object.status === "deposited" && <h4>{object.inquiryNumber}</h4>}
              {object.status === "deposited" && <h4>{object.term}</h4>}
              {object.status === "deposited" && <h4>{object.aai}</h4>}
              {object.status === "deposited" && <h4>{object.reportNumber}</h4>}
              {object.status === "deposited" && (
                <div className="links">
                  <Link to={`/object/${object.id}`}>
                    <span>
                      <BsIcons.BsSearch />
                    </span>
                  </Link>
                  <Link to={`/edit/${object.id}`}>
                    <span>
                      <FaIcons.FaEdit />
                    </span>
                  </Link>
                  <button
                    onClick={messageDelete}
                    onDoubleClick={() => deleteDocument(object.id)}
                  >
                    <span>
                      <MdIcons.MdDelete />
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
        {/* --------------------------REFOUND CONDITION----------------------- */}
        {/* {objects &&
          status === "refound" &&
          objects.map((object) => (
            <ObjectDetailRefound key={object.id} object={object} />
          ))} */}
        {objects &&
          status === "refound" &&
          objects.map((object) => (
            <div className="objects" key={object.id}>
              {object.status === "refound" && (
                <h4>
                  {object.quantity} {object.unity}
                </h4>
              )}
              {object.status === "refound" && <h4>{object.title}</h4>}
              {object.status === "refound" && <h4>{object.type}</h4>}
              {object.status === "refound" && <h4>{object.brand}</h4>}
              {object.status === "refound" && <h4>{object.color}</h4>}
              {object.status === "refound" && <h4>{object.inquiryNumber}</h4>}
              {object.status === "refound" && <h4>{object.term}</h4>}
              {object.status === "refound" && <h4>{object.aai}</h4>}
              {object.status === "refound" && <h4>{object.reportNumber}</h4>}
              {object.status === "refound" && (
                <div className="links">
                  <Link to={`/object/${object.id}`}>
                    <span>
                      <BsIcons.BsSearch />
                    </span>
                  </Link>
                  <Link to={`/edit/${object.id}`}>
                    <span>
                      <FaIcons.FaEdit />
                    </span>
                  </Link>
                  <button
                    onClick={messageDelete}
                    onDoubleClick={() => deleteDocument(object.id)}
                  >
                    <span>
                      <MdIcons.MdDelete />
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
        {objects && objects.length === 0 && (
          <p>Não foram encontrados Objetos</p>
        )}
      </div>
    </div>
  );
};

export default Home;
