import { useState, createContext, useEffect } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import { waitFor } from "poll-until-promise";
import { toast } from "react-toastify";

const ThemeAndFormContext = createContext({
  theme: "light",
  commuteData: {},
  commuteTime: "",
  commuteDistance: "",
  vehicle: {},
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
  const [userVehicle, setVehicle] = useState([]);

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
      toast.success("Scroll for Commute Data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
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

    // if both locations are equal
    if( !isEmpty(userData.locA) && !isEmpty(userData.locB) && isEqual(userData.locA,userData.locB) ){
      setIsValidLocB(true);
      console.log("Same Location!! LOCB is invalid");
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
    vehicle: userVehicle,
    invalidLocA: isValidLocA,
    invalidLocB: isValidLocB,
    invalidTrips: isValidTrips,
    setTheme: setThemeHandler,
    userData: userDataHandler,
    domChange: grabDOMVals,
  };

  async function grabDOMVals() {
    try {
      // const element =
      await waitFor(
        () => {
          const element = window.document.getElementsByClassName(
            "mapbox-directions-route-summary"
          );
          if (!element) {
            throw new Error("failed to find popup");
          }
          const timeElement = element
            .item(0)
            .getElementsByTagName("h1")[0].textContent;
          console.log(timeElement);

          const distanceElement = element
            .item(0)
            .getElementsByTagName("span")[0].textContent;
          console.log(distanceElement);

          setDist(distanceElement);
          setTime(timeElement);

          return;
        },
        { timeout: 60_000 }
      );
    } catch (e) {
      console.error("faled to find dom element:", e);
      throw e;
    }
  }

  async function grabFuelEconData() {
    let id = "";
    fetch(
      "https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=" +
        context.commuteData.year +
        "&make=" +
        context.commuteData.make +
        "&model=" +
        context.commuteData.model,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.menuItem);
        if (data.menuItem.length > 1) {
          id = data.menuItem[0].value;
        } else {
          id = data.menuItem.value;
        }
        console.log(
          `vehicle search for : ${
            context.commuteData.year +
            " " +
            context.commuteData.make +
            " " +
            context.commuteData.model
          }`
        );
        console.log(`vehicle id : ${id}`);
        return fetch("https://www.fueleconomy.gov/ws/rest/vehicle/" + id, {
          headers: {
            Accept: "application/json",
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("vehicle data found");
        setVehicle(data);
      });
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

    //grab fuel econ data too
      grabFuelEconData();

  }, [context.commuteData]);

  return (
    <ThemeAndFormContext.Provider value={context}>
      {props.children}
    </ThemeAndFormContext.Provider>
  );
}

export default ThemeAndFormContext;
