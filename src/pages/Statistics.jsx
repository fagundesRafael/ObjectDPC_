import { useState, useEffect } from "react";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import BarChart from "../components/Charts/BarChart";

const Statistics = () => {
  const { documents: userData } = useFetchDocuments("objects");
  const [chartData, setChartData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("deposited");

  const types = [];

  useEffect(() => {
    if (userData) {
      // Filtrar documentos por status
      const filteredDocs = userData.filter(
        (doc) => doc.status === selectedOption
      );
      console.log(filteredDocs);

      // Calcular quantidade total de objetos na coleção
      const totalQuantity = filteredDocs.reduce(
        (acc, doc) => acc + doc.quantity,
        0
      );

      // Calcular a quantia de cada tipo de objeto
      const typeQuantities = {};
      filteredDocs.forEach((doc) => {
        const type = doc.type;
        if (!typeQuantities[type]) {
          typeQuantities[type] = 0;
        }
        typeQuantities[type] += doc.quantity;
      });

      // Criar o chart data
      const labels = types;
      const data = labels.map((label) => typeQuantities[label] || 0);
      types.push(data);
      setChartData({
        labels,
        datasets: [
          {
            label: "Objetos",
            data: typeQuantities,
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [userData, selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="statistics">
      <div className="graphics">
        <h1>Estatísticas gerais:</h1>
        <div className="labelTop">
          <label htmlFor="status">Informe a condição do objeto:</label>
          <select
            id="status"
            name="status"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="deposited">Depósito</option>
            <option value="refound">Restituído (histórico)</option>
            <option value="incinerated">Incinerado (histórico)</option>
          </select>
        </div>
        {chartData && (
          <div style={{ width: "750px" }}>
            <BarChart chartData={chartData} />
          </div>
        )}
      </div>
      <div className="numbers">
          <h1>relatórios</h1>
          <h1>relatórios</h1>
          <h1>relatórios</h1>
          <h1>relatórios</h1>
          <h1>relatórios</h1>
          <h1>relatórios</h1>
          <h1>relatórios</h1>
          <h1>relatórios</h1>
          <h1>relatórios</h1>
      </div>
    </div>
  );
};

export default Statistics;
