import { useContext, useEffect, useState } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context.jsx";
import classes from "./FooterSection.module.css";
import github from "../assets/github.svg";
import linkedIn from "../assets/linkedin.svg";
import email from "../assets/email.svg";

function FooterSection() {
  const [color, setColor] = useState([]);
  const ctx = useContext(ThemeAndFormContext);

  useEffect(() => {
    // change bg color when context changes
    if (ctx.theme == "light") {
      setColor([classes.foot, classes.light].join(" "));
    } else {
      setColor([classes.foot, classes.dark].join(" "));
    }
  }, [ctx.theme]);
  return (
    <footer>
      <div className={color}>
        <div className={classes.foot}>
          <h2>Info</h2>
          <div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/nicoleb-garcia/"
            >
              <img src={linkedIn} alt="icon" className={classes.icon} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/lpurgitoryl"
            >
              <img className={classes.icon} src={github} alt="icon" />
            </a>
            <a
              href="mailto:ngarc084@ucr.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={classes.icon} src={email} alt="icon" />
            </a>
          </div>
        </div>

        <div>
          &copy; Copyright 2023. made by <span></span>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/lpurgitoryl"
          >
            Nicole G. (lpurgitoryl)
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
