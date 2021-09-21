import DatesFilter from "../DatesFilter/DatesFilter";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const Graph = () => {
  const [state, setState] = useState({
    dates: [],
    values: [],
  });
  const [chartInstance, setChartInstance] = useState(null);
  const [indices, setIndices] = useState({
    start: '',
    end: ''
  });
  
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
  }, [state, indices]);

  const transformData = (data) => {
    const dates = Object.keys(data);
    const values = Object.values(data);

    setIndices({
      ...indices, 
      start: 0,
      end: dates.length - 1
    });

    setState({
      ...state,
      dates: [...dates],
      values: [...values],
    });
  };

  const renderChart = () => {
    if (chartInstance) chartInstance.destroy();

    const myChart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: state.dates.slice(indices.start, indices.end),
        datasets: [
          {
            label: "Bitcoin Price Index",
            data: state.values.slice(indices.start, indices.end),
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
    });
    setChartInstance(myChart);
  };

  const filterGraph = (start, end) => {    
    const startIndex = (start === '') ? 0 : Object.values(state.dates).indexOf(start);
    const endIndex = (end === '') ? state.dates.length - 1 : Object.values(state.dates).indexOf(end) + 1;
    setIndices({
      ...indices,
      start: startIndex,
      end: endIndex
    });
  }; 

  return (
    <div>
      <DatesFilter 
        filterGraph={filterGraph}
        state={state}
      />
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Graph;