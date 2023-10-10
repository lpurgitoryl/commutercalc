// import { useState } from "react";
import "./App.css";
import logo from "./assets/CC_logo.svg";
import Section from "./cardSection/CardSection.jsx";
import Form from "./Form/Form.jsx";

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
  return (
    <>
      <header id="header">
        <nav className="headerNav">
          <img className="icon" src={logo} />
          <a className="title">CommuterCalc</a>
        </nav>
      </header>

      <main className="main">
        <Section>
          <a className="text">
            Enter the following fields to calculate your commute cost!
          </a>
          <a className="error">Please revise the following fields.</a>
          <Form token={publicToken}></Form>
        </Section>

        <Section>
        <button type="submit" form="userInput" className="submitBtn">
                    Calculate!
        </button>
        </Section>

        <Section>
          <p>omg please card section wrapper?</p>
        </Section>
      </main>
    </>
  );
}

export default App;
