import { useContext, useEffect, useState } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context.jsx";
import classes from "./CardSection.module.css";

function CardSection(props) {
  const [color, setColor] = useState([]);
  const ctx = useContext(ThemeAndFormContext);

  useEffect(() => {
    // change bg color when context changes
    if (ctx.theme == "light") {
      setColor([classes.section, classes.light].join(" "));
    } else {
      setColor([classes.section, classes.dark].join(" "));
    }
  }, [ctx.theme]);

  return (
    <section className={color}>
      <div className={classes.infoWrapper}>{props.children}</div>
    </section>
  );
}

export default CardSection;
