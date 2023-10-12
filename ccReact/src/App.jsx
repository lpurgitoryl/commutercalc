import { useState, useEffect, useContext } from "react";
import ThemeAndFormContext from "./store/ThemeAndForm-context";
import "./App.css";
import logo from "./assets/CC_logo.svg";
import Section from "./cardSection/CardSection.jsx";
import Form from "./Form/Form.jsx";
import HeaderSection from "./HeaderSection/HeaderSection";

const publicToken =
  "pk.eyJ1IjoibHB1cmdzbCIsImEiOiJjbG42aXB2cWYwNGFjMmxwaXp0bXY4dGVrIn0.5e9pBlHJvQPcf5mD8t-Z2w";

const sessionUUID = checkUUID();

function checkUUID() {
  if (localStorage.getItem("uuid") == null) {
    console.log("no session UUID found, new session UUID created");
    localStorage.setItem("uuid", crypto.randomUUID());
    console.log(localStorage.getItem("uuid"));
  } else {
    console.log("session UUID " + localStorage.getItem("uuid"));
  }

  return localStorage.getItem("uuid");
}

function App() {
  const [color, setColor] = useState("light");
  const ctx = useContext(ThemeAndFormContext);

  useEffect(() => {
    // change bg color when context theme changes
    if (ctx.theme == "light") {
      setColor("light");
    } else {
      setColor("dark");
    }
  }, [ctx.theme]);

  return (
    <>
      <div className={color}>
        <HeaderSection logo={logo}></HeaderSection>
        <main className="main">
          <Section>
            <a className="text">
              Enter the following fields to calculate your commute cost!
            </a>
            <a className="error">Please revise the following fields.</a>
            <Form token={publicToken}></Form>
          </Section>
          <Section>
            <p>omg please card section wrapper?</p>
          </Section>
        </main>
      </div>
    </>
  );
}

export default App;
