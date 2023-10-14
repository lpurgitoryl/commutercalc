import { useEffect, useContext } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context";
import classes from "./RouteMap.module.css";
import isEmpty from "lodash/isEmpty";
// lol this isnt my token pls dont abuse it
const token =
  "pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g";
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
    if (isEmpty(ctx.commuteData) || ctx.invalidLocA || ctx.invalidLocB || ctx.invalidTrips) {
      console.log("no valid data yet");
      return;
    }
    if (!ctx.invalidLocA) {
      var origin = new MapboxDirections({
        accessToken: token,
        controls : {
            inputs: false
          },
        interactive: false
      });
      origin = origin.setOrigin(ctx.commuteData.locA);
      map.addControl(origin);
      console.log("adding origin");
    }
    if (!ctx.invalidLocB) {
      var destination = new MapboxDirections({
        accessToken: token,
        controls: false,
        interactive: false
      });
      destination = destination.setDestination(ctx.commuteData.locB);
      map.addControl(destination);
      console.log("adding destination");
    }
  }, [ctx.commuteData]);

  return <div className={classes.wrapper} id="map" />;
}
export default RouteMap;
