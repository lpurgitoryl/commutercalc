import classes from "./Form.module.css";
import { useState, useEffect } from "react";
import btnclasses from "./Button.module.css"

function Form(props) {
  const [yearOptions, setYearOptions] = useState([]);
  const [selectedYear, setYear] = useState("2023");
  const [makeOptions, setMakeOptions] = useState([]);
  const [selectedMake, setMake] = useState("Acura");
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedModel, setModel] = useState([]);
  const [locAOptions, setLocAOptions] = useState([]);
  const [locA, setLocA] = useState([]);
  const [locBOptions, setLocBOptions] = useState([]);
  const [locB, setLocB] = useState([]);

  useEffect(() => {
    // YEAR onload
    fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/year", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setYearOptions(data.menuItem));
  }, []); // empty 2nd param signfies on page load

  useEffect(() => {
    // make
    fetch(
      "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" +
        selectedYear,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMakeOptions(data.menuItem);
        console.log(selectedMake);
      });
  }, [selectedYear]);

  useEffect(() => {
    // model
    fetch(
      "https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=" +
        selectedYear +
        "&make=" +
        selectedMake,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setModelOptions(data.menuItem);
        console.log(selectedModel);
      });
  }, [selectedYear, selectedMake]);

  useEffect(() => {
    // locationA suggs
    fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        locA +
        ".json?access_token=" +
        props.token,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLocAOptions(data.features);
        console.log(locA);
      });
  }, [locA]);

  useEffect(() => {
    // locationB suggs
    fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        locB +
        ".json?access_token=" +
        props.token,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLocBOptions(data.features);
        console.log(locB);
      });
  }, [locB]);

  function makeHandler(e) {
    console.log(e.target.value);
    setMake(e.target.value);
  }

  function yearHandler(e) {
    console.log(e.target.value);
    setYear(e.target.value);
  }

  function modelHandler(e) {
    console.log(e.target.value);
    setModel(e.target.value);
  }

  function handleLocASugggestions(e) {
    setLocA(e.target.value);
  }

  function handleLocBSugggestions(e) {
    setLocB(e.target.value);
  }

  function submitHandler(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData)
    console.log([...formData.entries()]);
  }

  return (
    <form id="userInput" onSubmit={submitHandler}>
      <div className={classes.inputSec}>
        <div className={classes.inputField}>
          <label htmlFor="year">Year</label>
          <select
            name="year"
            id="year"
            value={selectedYear}
            onInput={yearHandler}
            required
          >
            {yearOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.inputField}>
          <label htmlFor="make">Make</label>
          <select
            name="make"
            id="make"
            value={selectedMake}
            onInput={makeHandler}
            required
          >
            {makeOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.inputField}>
          <label htmlFor="model">Model</label>
          <select
            name="model"
            id="model"
            value={selectedModel}
            onInput={modelHandler}
            required
          >
            {modelOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            ))}
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
              min="1"
              max="256"
              placeholder="e.g University of California Riverside"
              onInput={handleLocASugggestions}
              required
            />
            <datalist id="locationA">
              {locAOptions.map((option) => (
                <option value={option.place_name} key={option.place_name}>
                  {option.place_name}
                </option>
              ))}
            </datalist>
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
              min="1"
              max="256"
              placeholder="e.g SoFi Stadium"
              onInput={handleLocBSugggestions}
              required
            />
            <datalist id="locationB">
              {locBOptions.map((option) => (
                <option value={option.place_name} key={option.place_name}>
                  {option.place_name}
                </option>
              ))}
            </datalist>
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
            defaultValue="1"
          />
        </div>

        <div className={classes.inputField}>
        <button type="submit" form="userInput" className={btnclasses.submitBtn}>Calculate!</button>
        </div>
        
      </div>
    </form>
  );
}

export default Form;
