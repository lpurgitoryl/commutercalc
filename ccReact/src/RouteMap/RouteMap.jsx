import { useEffect, useContext } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context";
import classes from "./RouteMap.module.css";
import isEmpty from "lodash/isEmpty";
// lol this isnt my token pls dont abuse it
const token = "pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g";
mapboxgl.accessToken = token;

let map;
function RouteMap() {
  const ctx = useContext(ThemeAndFormContext);

  useEffect(() => {
    //
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-118.242766, 34.053691], // los angeles
      zoom: 10,
    });
  }, []);

  useEffect(() => {
    if (
      isEmpty(ctx.commuteData) ||
      ctx.invalidLocA ||
      ctx.invalidLocB ||
      ctx.invalidTrips
    ) {
      console.log("no valid data yet");
      return;
    }
    if (!ctx.invalidLocA) {
      var o = new MapboxDirections({
        accessToken: token,
        controls: {
          inputs: false,
        },
        interactive: false,
      });

      const origin = o.setOrigin(ctx.commuteData.locA);
      map.addControl(origin);
      console.log("adding origin");
    }
    if (!ctx.invalidLocB) {
      var d = new MapboxDirections({
        accessToken: token,
        controls: {
          inputs: false,
          instructions: false,
        },
        interactive: false,
      });
      const destination = d.setDestination(ctx.commuteData.locB);
      map.addControl(destination);
      console.log("adding destination");
    }
  }, [ctx.commuteData]);

  return (
    <div
      className={classes.wrapper}
      id="map"
      onChange={setTimeout(ctx.domChange, 1500)}
    />
  );
}
export default RouteMap;
