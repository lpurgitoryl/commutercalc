import { useEffect, useContext, useState } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context";
import isEmpty from "lodash/isEmpty";
import classes from "./Stats.module.css";
import Data from "../Data/Data";

function Stats() {
  const ctx = useContext(ThemeAndFormContext);
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [miles, setMiles] = useState("");
  const [gasPrice, setGas] = useState("5.23");
  const [currMPG, setCurrMPG] = useState(
    isEmpty(ctx.vehicle) ? "25" : ctx.vehicle.comb08
  );

  function parseCommuteTime(time) {
    time = time.split(" ");
    // deal with hour and minutes
    if (time.length >= 2) {
      const h = time[0].split("h")[0];
      setHour(h);
      const m = time[1].split("min")[0];
      setMin(m);
    }
    // deal with just hour
    else if (time[0].includes("h")) {
      const h = time[0].split("h")[0];
      setMin("");
      setHour(h);
    }
    // deal with just mins
    else if (time[0].includes("min")) {
      const m = time[0].split("min")[0];
      setMin(m);
      setHour("");
    }
  }

  function parseCommuteDistance(dist) {
    setMiles(dist.split("mi")[0]);
    return;
  }

  useEffect(() => {
    if (isEmpty(ctx.vehicle)) {
      console.log("no vehicle data yet for Stats");
      return;
    }

    parseCommuteTime(ctx.commuteTime);
    parseCommuteDistance(ctx.commuteDistance);
  }, [ctx.commuteTime, ctx.commuteDistance]);

  function gasHandler(e) {
    if (isEmpty(e.target.value)) {
      console.log(`gas price changed to default`);
      setGas("5.23");
      return;
    }
    setGas(e.target.value);
    console.log(`gas price changed to: ${e.target.value}`);
  }

  function mpgHandler(e) {
    if (isEmpty(e.target.value)) {
      console.log(`mpg changed to default`);
      setCurrMPG(ctx.vehicle.comb08);
      return;
    }
    setCurrMPG(e.target.value);
    console.log(`curr mpg changed to: ${e.target.value}`);
  }
  return (
    <>
      <div className={classes.container}>
        {isEmpty(ctx.vehicle) ? (
          <>
            <h1>Fill out the form above for infomation about your commute!</h1>
            <img className={classes.icon} src="/assets/formPlaceHolder.svg"></img>
          </>
        ) : (
          <>
            <div className={classes.container}>
              <div className={classes.inputWrapper}>
                <input
                  className={classes.stats}
                  type="number"
                  placeholder="5.23"
                  step="0.01"
                  min="2"
                  max="100"
                  onChange={gasHandler}
                />
                <h3>Price Per Gallon@</h3>
              </div>
              <div className={classes.inputWrapper}>
                <input
                  className={classes.stats}
                  type="number"
                  placeholder={ctx.vehicle.comb08}
                  step="1"
                  min="1"
                  max="1000"
                  onChange={mpgHandler}
                />
                <h3>Miles Per Gallon@</h3>
              </div>
              <div className={classes.dataWrapper}>
                <h3>Single Trip </h3>
                <Data
                  mpg={currMPG}
                  dist={miles}
                  gasPrice={gasPrice}
                  co2={ctx.vehicle.co2TailpipeGpm}
                  min={min}
                  hour={hour}
                  RTT={false}
                />
              </div>
              <div className={classes.dataWrapper}>
                <h3>Round Trip </h3>
                <Data
                  mpg={currMPG}
                  dist={miles * 2}
                  gasPrice={gasPrice}
                  co2={ctx.vehicle.co2TailpipeGpm}
                  min={min}
                  hour={hour}
                  RTT={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Stats;
