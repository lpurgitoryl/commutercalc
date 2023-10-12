import { useContext, useEffect, useState } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context.jsx";
import ToggleSwitch from "../Toggle/ToggleSwitch.jsx";
import classes from "./HeaderSection.module.css";

function HeaderSection(props) {
  const [color, setColor] = useState([]);
  const ctx = useContext(ThemeAndFormContext);

  useEffect(() => {
    // change bg color when context changes
    if (ctx.theme == "light") {
      setColor([classes.headerNav, classes.light].join(" "));
    } else {
      setColor([classes.headerNav, classes.dark].join(" "));
    }
  }, [ctx.theme]);

  return (
    <header id="header">
      <nav className={color}>
        <img className={classes.icon} src={props.logo} />
        <a className={classes.title}>CommuterCalc</a>
        <ToggleSwitch></ToggleSwitch>
      </nav>
    </header>
  );
}

export default HeaderSection;
