import { useState } from "react";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import ObjectDetailAll from "../../components/ObjectDetailAll";
import ObjectDetailDeposited from "../../components/ObjectDetailDeposited"
import ObjectDetailRefound from "../../components/ObjectDetailRefound"

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const [status, setStatus] = useState("all");

  const { documents: objects, loading } = useFetchDocuments("objects", search);

  return (
    <div className="searchedItems">
      <h1>Resultado do parâmetro de busca:</h1>
      <div className="items">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Todos objetos (histórico)</option>
          <option value="deposited">Objetos presentes no depósito</option>
          <option value="refound">Objetos retirados do depósito</option>
        </select>
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
        {objects && objects.length === 0 && (
          <>
            <p>
              Não foram encontrados resultados na sua busca referente aos
              parãmetros mencionados...
            </p>
          </>
        )}
        {loading && <p>Carregando...</p>}
        {objects && status === "all" && objects.map((object) => <ObjectDetailAll key={object.id} object={object} />)}
        {objects && status === "deposited" && objects.map((object) => <ObjectDetailDeposited key={object.id} object={object} />)}
        {objects && status === "refound" && objects.map((object) => <ObjectDetailRefound key={object.id} object={object} />)}
        <Link to="/">Voltar</Link>
      </div>
    </div>
  );
};

export default Search;
