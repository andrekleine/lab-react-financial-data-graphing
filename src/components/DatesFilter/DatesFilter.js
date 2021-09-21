import './DatesFilter.css';
import { useState, useEffect } from "react";

const DatesFilter = ({ filterGraph, state }) => {
  const [dates, setDates] = useState({
    start: '',
    end: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDates({ ...dates, [name] : value});    
  };

  useEffect(() => {
    filterGraph(dates.start, dates.end);
  }, [dates]);  

  return (
    <div>
      <form className="filters-box">
        <div className="start-date">
          <label>From: </label>
          <input 
            type="date" 
            name="start"            
            value={dates.start}
            onChange={handleChange}
            min={state.dates[0]}
            max={state.dates[state.dates.length - 1]}
          />          
        </div>
        <div className="end-date">
          <label>To: </label>
          <input 
            type="date" 
            name="end" 
            value={dates.end}
            onChange={handleChange}
            min={state.dates[0]}
            max={state.dates[state.dates.length - 1]}
          />          
        </div>        
      </form>
    </div>
  );
};

export default DatesFilter;