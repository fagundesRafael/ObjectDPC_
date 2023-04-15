import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchDocument } from "../hooks/useFetchDocument";

import img from "../resources/imagenotfound.webp";

const Object = () => {
  const { id } = useParams();
  const { document: object, loading } = useFetchDocument("objects", id);


  const [date, setDate] = useState("");

  useEffect(() => {
    if (object) {
      const date = new Date(object.createdAt.seconds * 1000);

      const formatter = Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric"
      });

      const formatedDate = formatter.format(date);
      setDate(formatedDate);
    }
  }, [object]);

  return (
    <div className="singleObject">
      {loading && <p>Carregando dados...</p>}
      {object && (
        <div className="generalInfo">
          <h1>Objeto selecionado:</h1>
          <h5>
            {object.quantity} - {object.unity} {object.title}
            <span>
              {object.status === "deposited" ? (
                <h3 className="deposited">ARQUIVADO NO DEPÓSITO</h3>
              ) : (
                <h2 className="refound">RESTITUÍDO</h2>
              )}
            </span>
          </h5>
          <label>Características do objeto: </label>
          <h2>
            {object.type} - {object.brand} - {object.color}
          </h2>
          <label>Localização do objeto: </label>
          <h2>
            SEÇÃO: {object.section}, PRATELEIRA: {object.shelf}.{" "}
          </h2>

          <div className="inscription">
            <label>Inscrição:</label>
            {object.inquiryNumber && (
              <h2>Inquérito Policial nº: {object.inquiryNumber}</h2>
            )}
            {object.term && <h2>Termo Circunstanciado nº: {object.term}</h2>}
            {object.aai && <h2>Auto de Ato Infracional nº: {object.aai}</h2>}
            {object.reportNumber && (
              <h2>Ocorrência policial nº: {object.reportNumber}</h2>
            )}
          </div>
          <h3>
            Objeto inserido por <span>{object.registredBy}</span>, {date}.
          </h3>
          <div className="itemsEdit">
            <Link to="/">Voltar</Link>
          </div>
        </div>
      )}
      <div className="imgInfo">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default Object;
