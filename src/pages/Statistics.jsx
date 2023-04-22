import { useState, useEffect } from "react";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import BarChart from "../components/Charts/BarChart";

const Statistics = () => {
  const { documents: userData } = useFetchDocuments("objects");
  const [chartData, setChartData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("deposited");
  const [totalDepositedItems, setTotalDepositedItems] = useState()
  const [depositedPhones, setDepositedPhones] = useState()
  const [depositedDrugs, setDepositedDrugs] = useState()
  const [depositedGuns, setDepositedGuns] = useState()
  const [depositedMunition, setDepositedMunition] = useState()
  const [depositedEletronic, setDepositedEletronic] = useState()
  const [depositedMobile, setDepositedMobile] = useState()
  const [depositedDocumentation, setDepositedDocumentation] = useState()
  const [depositedTool, setDepositedTool] = useState()
  const [depositedCosmetic, setDepositedCosmetic] = useState()
  const [depositedJewel, setDepositedJewel] = useState()

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

      console.log(totalQuantity)

      const deposited = userData.filter(element => element.status === "deposited")

      // Itens no depósito
      setTotalDepositedItems(deposited.reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedGuns(deposited.filter(element => element.type === "Arma").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedMunition(deposited.filter(element => element.type === "Munição").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedPhones(deposited.filter(element => element.type === "Celular").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedDrugs(deposited.filter(element => element.type === "Entorpecente").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedEletronic(deposited.filter(element => element.type === "Eletrônico").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedMobile(deposited.filter(element => element.type === "Móvel").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedDocumentation(deposited.filter(element => element.type === "Documento").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedTool(deposited.filter(element => element.type === "Ferramenta").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedCosmetic(deposited.filter(element => element.type === "Cosmético").reduce((acc, element)=> (acc + element.quantity), 0))
      setDepositedJewel(deposited.filter(element => element.type === "Jóia").reduce((acc, element)=> (acc + element.quantity), 0))

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
        <h1>Gráficos gerais:</h1>
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
          <div style={{ width: "900px" }}>
            <BarChart chartData={chartData} />
          </div>
        )}
      </div>
      <div className="numbersInfo">
          <h1>Itens presentes no depósito:</h1>
          <div className="numbersIn">
            <h2>Total de item(s) no depósito: <span>{totalDepositedItems}</span></h2>
            <h2>Aparelho(s) smartphone(s): <span>{depositedPhones}</span></h2>
            <h2>Entorpecente(s): <span>{depositedDrugs}</span></h2>
            <h2>Arma(s): <span>{depositedGuns}</span></h2>
            <h2>Munição(ões): <span>{depositedMunition}</span></h2>
            <h2>Eletrônico(s): <span>{depositedEletronic}</span></h2>
            <h2>Móvel(eis): <span>{depositedMobile}</span></h2>
            <h2>Documento(s): <span>{depositedDocumentation}</span></h2>
            <h2>Ferramenta(s): <span>{depositedTool}</span></h2>
            <h2>Cosmético(s): <span>{depositedCosmetic}</span></h2>
            <h2>Jóia(s) / Semi-jóia(s): <span>{depositedJewel}</span></h2>
          </div>
      </div>
    </div>
  );
};

export default Statistics;
