import { useEffect } from 'react';
import classes from "./RouteMap.module.css"

// lol this isnt my token pls dont abuse it
mapboxgl.accessToken =
  'pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g';

function RouteMap  ()  {

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-73.985664, 40.748514],
            zoom: 12,
          });
      
          const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
          });
      }, []);  
  
    return (<div className={classes.wrapper} id="map" />);
  
}
export default RouteMap;
