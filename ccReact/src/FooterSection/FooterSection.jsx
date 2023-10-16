import { useContext, useEffect, useState } from "react";
import ThemeAndFormContext from "../store/ThemeAndForm-context.jsx";
import ToggleSwitch from "../Toggle/ToggleSwitch.jsx";
import classes from "./FooterSection.module.css";

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
        <div className="main-container">
          <h2 className="">
            Social
          </h2>
          <div className="Social">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/nicoleb-garcia/"
            >
              <img
                className="main-footer__icon"
                src="./assets/png/linkedin-ico.png"
                alt="icon"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/lpurgitoryl"
            >
              <img
                className="main-footer__icon"
                src="./assets/png/github-ico.png"
                alt="icon"
              />
            </a>
            <a
              href="mailto:ngarc084@ucr.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="main-footer__icon"
                src="./assets/png/email.png"
                alt="icon"
              />
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
