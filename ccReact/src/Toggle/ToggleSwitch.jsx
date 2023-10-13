import { useState, useContext } from "react";
import classes from "./ToggleSwitch.module.css";
import ThemeAndFormContext from "../store/ThemeAndForm-context";

function ToggleSwitch() {
  const ctx = useContext(ThemeAndFormContext);

  const [isChecked, setIsChecked] = useState(() => {
    let theme = localStorage.getItem("theme");
    if (theme == null || theme == "false") {
      localStorage.setItem("theme", "false");
      return false;
    }

    if (theme == "true") {
      ctx.setTheme(true);
      return true;
    }
  });

  function clickHandler(e) {
    setIsChecked(e.target.checked);
    ctx.setTheme(e.target.checked);
    localStorage.setItem("theme", JSON.stringify(e.target.checked));
    console.log("CURR THEME");
    console.log(JSON.stringify(e.target.checked));
  }
  return (
    <div>
      <label className={classes.switch}>
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={clickHandler}
        />
        <span className={[classes.slider, classes.round].join(" ")}></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
