// import { UserData } from "../Chart/Data";
import { useState, useEffect } from "react";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";

const Statistics = () => {
  const { documents: userData } = useFetchDocuments("objects");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (userData) {
      const labels = userData.map((data) => data.type);
      console.log(labels)
      const data = userData.map((data) => data.quantity);
      setChartData({
        labels,
        datasets: [
          {
            label: "Objeto",
            data,
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
  }, [userData]);

  return (
    <div>
      {chartData && (
        <>
          <div style={{ width: "700px" }}>
            <BarChart chartData={chartData} />
          </div>
          <div style={{ width: "700px" }}>
            <LineChart chartData={chartData} />
          </div>
          <div style={{ width: "700px" }}>
            <PieChart chartData={chartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
