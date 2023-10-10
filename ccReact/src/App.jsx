// import { useState } from "react";
import "./App.css";
import logo from "./assets/CC_logo.svg";
import Section from "./cardSection/CardSection.jsx";
import Form from "./Form/Form.jsx";

function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  console.log(formData)

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
          <Form></Form>
        </Section>

        <Section>
        <button type="submit" form="userInput" className="submitBtn" onSubmit={handleSubmit}>
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
