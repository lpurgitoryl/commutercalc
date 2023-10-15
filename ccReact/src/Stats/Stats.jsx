import { useEffect, useContext, useState } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context";
import isEmpty from "lodash/isEmpty";

function Stats() {
  const ctx = useContext(ThemeAndFormContext);
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [miles, setMiles] = useState("");

  function parseCommuteTime(time) {
    time = time.split(" ");
    console.log(time);
    // deal with hour and minutes
    if (time.length >= 2) {
      console.log("hours and mins");
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

  return (
    <div>
      {isEmpty(ctx.vehicle) ? (
        <h1>STATS Waiting</h1>
      ) : (
        <h1>
          STATS RECCIEVED{" "}
          {`got ${hour}hours and ${min} mins with a distance of ${miles} miles`}
        </h1>
      )}
    </div>
  );
}

export default Stats;
