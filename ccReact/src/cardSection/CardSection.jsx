import { useContext, useEffect, useState } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context.jsx";
import classes from "./CardSection.module.css";

function CardSection(props) {
  return (
    <section className={classes.section}>
      <div className={classes.infoWrapper}>{props.children}</div>
    </section>
  );
}

export default CardSection;
