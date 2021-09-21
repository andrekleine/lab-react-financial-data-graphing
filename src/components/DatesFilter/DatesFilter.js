import './DatesFilter.css';
import { useState, useEffect } from "react";

const DatesFilter = ({ filterGraph }) => {
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
          />          
        </div>
        <div className="end-date">
          <label>To: </label>
          <input 
            type="date" 
            name="end" 
            value={dates.end}
            onChange={handleChange}
          />          
        </div>        
      </form>
    </div>
  );
};

export default DatesFilter;