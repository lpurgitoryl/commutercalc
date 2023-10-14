import { useState, createContext, useEffect } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import { waitFor, AbortError } from 'poll-until-promise';

const ThemeAndFormContext = createContext({
  theme: "",
  commuteData: {},
  commuteTime: "",
  commuteDistance: "",
  invalidLocA: false,
  invalidLocB: false,
  invalidTrips: false,
});

export function ThemeAndFormContextProvider(props) {
  const [currTheme, setTheme] = useState("light");
  const [userData, setUserData] = useState([]);
  const [isValidLocA, setIsValidLocA] = useState(false);
  const [isValidLocB, setIsValidLocB] = useState(false);
  const [isValidTrips, setIsValidTrips] = useState(false);
  const [dist, setDist] = useState("");
  const [time, setTime] = useState("");

  function setThemeHandler(checked) {
    if (!checked) {
      setTheme(() => {
        return "light";
      });
    } else {
      setTheme(() => {
        return "dark";
      });
    }
  }

  function userDataHandler(formData) {
    // doesnt rely on prev, just override
    console.log(formData);
    if (isEqual(userData, formData)) {
      console.log("omg twins");
      console.log("no new data set");
    } else {
      validateUserData(formData);
      setUserData(formData);
    }
  }

  function validateUserData(userData) {
    if (userData.locA.trim().length === 0 || userData.locA.length > 200) {
      setIsValidLocA(true);
      console.log("INVALID LOCA");
    } else {
      setIsValidLocA(false);
      console.log("VALID LOCA");
    }

    if (userData.locB.trim().length === 0 || userData.locB.length > 200) {
      setIsValidLocB(true);
      console.log("INVALID LOCB");
    } else {
      setIsValidLocB(false);
      console.log("VALID LOCB");
    }

    if (userData.trips <= 0 || userData.trips >= 1000000) {
      setIsValidTrips(true);
      console.log("INVALID Trips");
    } else {
      setIsValidTrips(false);
      console.log("VALID Trips");
    }
  }

  const context = {
    theme: currTheme,
    commuteData: userData,
    commuteTime: time,
    commuteDistance: dist,
    invalidLocA: isValidLocA,
    invalidLocB: isValidLocB,
    invalidTrips: isValidTrips,
    setTheme: setThemeHandler,
    userData: userDataHandler,
  };

  async function grabDOMVals() {
    try {
      const element = await waitFor(() => {
        const element = window.document.getElementsByClassName("mapbox-directions-route-summary");
        if (!element){ throw new Error("failed to find popup"); }
        const timeElement = element.item(0).getElementsByTagName('h1')[0].textContent;
        console.log(timeElement);

        const distanceElement = element.item(0).getElementsByTagName('span')[0].textContent;
        console.log(distanceElement);

        setDist(distanceElement);
        setTime(timeElement);

        return;
      }, { timeout: 60_000 });
  
      return element;
    } catch (e) {
      console.error('faled to find dom element:', e);
      throw e;
    }
  }

  useEffect(() => {
    if (
      isEmpty(context.commuteData) ||
      context.invalidLocA ||
      context.invalidLocB ||
      context.invalidTrips
    ) {
      return;
    }

    // if here theres valid data, so grab DOM commute time and distance...
    //grab fuel econ data too

    grabDOMVals();

  }, [context.commuteData]);

  return (
    <ThemeAndFormContext.Provider value={context}>
      {props.children}
    </ThemeAndFormContext.Provider>
  );
}

export default ThemeAndFormContext;
