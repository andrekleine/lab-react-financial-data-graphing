import { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "chart.js";

const Graph = () => {
    const [state, setState] = useState({
        dates: [],
        values: [],
    });

    useEffect(() => {
        axios
        .get('http://api.coindesk.com/v1/bpi/historical/close.json')
        .then(response => {
            console.log(response.data);
        })
        .catch(err => console.error(err));
    }, []);

    



    return (
        <div>HELLLLOOOOO
            
        </div>
    );

}    

export default Graph;