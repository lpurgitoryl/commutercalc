import classes from "./Form.module.css";
import { useState } from "react";
import { useEffect } from "react";

function Form() {
  const [yearOptions, setYearOptions] = useState([]);
  const [selectedYear, setYear] = useState('2024');
  const [makeOptions, setMakeOptions] = useState([]);
  
  useEffect(() => {
    fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/year", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setYearOptions(data.menuItem));
  }, []); // empty 2nd param signfies on page load

  function yearHandler(e){
    console.log(e.target.value)
    setYear(e.target.value); 
  }

  useEffect(() => {
    fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" + selectedYear, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => { setMakeOptions(data.menuItem); console.log(selectedYear);});
  }, [selectedYear]);

  return (
    <form id="userInput">
      <div className={classes.inputSec}>
        <div className={classes.inputField}>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" value={selectedYear} onChange={yearHandler}>
            {/* <option value="none" selected hidden>
              Year of your vehicle
            </option> */}
            {yearOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.inputField}>
          <label htmlFor="make">Make</label>
          <select name="make" id="make">
            <option value="none" selected hidden>
              Make of your vehicle
            </option>
            {makeOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.inputField}>
          <label htmlFor="model">Model</label>
          <select name="model" id="model" disabled>
            <option value="none" selected hidden>
              Model of your vehicle
            </option>
          </select>
        </div>

        <div className={classes.inputField}>
          <label htmlFor="locA">Location A</label>
          <div>
            <input
              type="text"
              list="locationA"
              id="locA"
              name="locA"
              placeholder="e.g University of California Riverside"
            />
            <datalist id="locationA"></datalist>
          </div>
        </div>

        <div className={classes.inputField}>
          <label htmlFor="locB">Location B</label>
          <div>
            <input
              type="text"
              id="locB"
              list="locationB"
              name="locB"
              placeholder="e.g SoFi Stadium"
            />
            <datalist id="locationB"></datalist>
          </div>
        </div>

        <div className={classes.inputField}>
          Round trip?
          <div>
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              name="round_trip"
              id="yes"
              value="yes"
              checked
            />

            <label htmlFor="no">No</label>
            <input type="radio" name="round_trip" id="no" value="no" />
          </div>
        </div>

        <div className={classes.inputField}>
          <label htmlFor="trips">Number of trips</label>
          <input
            type="number"
            id="trips"
            name="trips"
            min="1"
            step="1"
            max="1000000"
            value="1"
          />
        </div>
      </div>
    </form>
  );
}

export default Form;
