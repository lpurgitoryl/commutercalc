import { useState, createContext } from "react";

const ThemeAndFormContext = createContext({
  theme: "",
  commuteData: []
});

export function ThemeAndFormContextProvider(props) {
  const [currTheme, setTheme] = useState("light");
  const [userData, setUserData] = useState([]);

  function setThemeHandler() {
    (prevTheme) => {
      if (prevTheme == "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };
  }

  function userDataHandler(formData) {
    // doesnt rely on prev, just override
    const validatedData = validateUserData(formData);
    setUserData(validatedData);
  }

  function validateUserData(formData) {
    console.log("validating...");

    return formData;
  }

  const context = {
    theme: currTheme,
    commuteData: userData,
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