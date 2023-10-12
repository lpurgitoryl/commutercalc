import { useState, createContext } from "react";
import isEqual from "lodash/isEqual";

const ThemeAndFormContext = createContext({
  theme: "",
  commuteData: {},
  commuteTime: "",
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
    console.log(userData);
    console.log(formData);
    if (isEqual(userData, formData)) {
      console.log("omg twins");
    } else {
      setUserData(formData);
    }

    validateUserData(formData);
  }

  function validateUserData(userData) {
    if (userData.locA == " " || userData.locA.length > 200) {
      setIsValidLocA(true);
      console.log("INVALID LOCA");
    } else {
      setIsValidLocA(false);
      console.log("VALID LOCA");
    }

    if (userData.locB == " " || userData.locB.length > 200) {
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
    commuteTime: "",
    invalidLocA: isValidLocA,
    invalidLocB: isValidLocB,
    invalidTrips: isValidTrips,
    setTheme: setThemeHandler,
    userData: userDataHandler,
  };

  return (
    <ThemeAndFormContext.Provider value={context}>
      {props.children}
    </ThemeAndFormContext.Provider>
  );
}

export default ThemeAndFormContext;
