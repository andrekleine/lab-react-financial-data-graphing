import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const Graph = () => {
  const [state, setState] = useState({
    dates: [],
    values: [],
  });
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        transformData(response.data.bpi);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    renderChart();
  }, [state]);

  const transformData = data => {
      const dates = Object.keys(data);
      const values = Object.values(data);
      setState({
          ...state,
          dates: [...dates],
          values: [...values]
      });
  };

  const renderChart = () => {
    if (chartInstance) chartInstance.destroy();

    const myChart = new Chart(document.getElementById("myChart"), {
        type: "line",
        data: {
          labels: state.dates,
          datasets: [
            {
              label: "Bitcoin Price Index",
              data: state.values,
              fill: true,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      });
      setChartInstance(myChart);
  };  

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Graph;