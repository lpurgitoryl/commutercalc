import { useState, useEffect, useContext } from "react";
import ThemeAndFormContext from "./store/ThemeAndForm-context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import logo from "./assets/CC_logo.svg";
import Section from "./cardSection/CardSection.jsx";
import Form from "./Form/Form.jsx";
import HeaderSection from "./HeaderSection/HeaderSection";
import FooterSection from "./FooterSection/FooterSection";
import RouteMap from "./RouteMap/RouteMap";

const publicToken =
  "pk.eyJ1IjoibHB1cmdzbCIsImEiOiJjbG42aXB2cWYwNGFjMmxwaXp0bXY4dGVrIn0.5e9pBlHJvQPcf5mD8t-Z2w";

// const sessionUUID = checkUUID();

// function checkUUID() {
//   if (localStorage.getItem("uuid") == null) {
//     console.log("no session UUID found, new session UUID created");
//     localStorage.setItem("uuid", crypto.randomUUID());
//     console.log(localStorage.getItem("uuid"));
//   } else {
//     console.log("session UUID " + localStorage.getItem("uuid"));
//   }

//   return localStorage.getItem("uuid");
// }

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

  useEffect(() => {
    // toast error msg
    // if any flag is false TOAST
    if (ctx.invalidTrips || ctx.invalidLocA || ctx.invalidLocB) {
      toast.error("Invalid Inputs!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [ctx.invalidTrips, ctx.invalidLocA, ctx.invalidLocB]);

  return (
    <>
      <div className={color}>
        <HeaderSection logo={logo}></HeaderSection>
        <main className="main">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          ></ToastContainer>
          <Section>
            <a className="text">
              Enter the following fields to calculate your commute cost!
            </a>
            {ctx.invalidLocA || ctx.invalidLocB || ctx.invalidTrips ? (
              <a className="error">Please revise the following fields.</a>
            ) : null}
            <Form token={publicToken}></Form>
          </Section>
          <Section>
            <RouteMap/>
            {/* <div className="mapWrapper" id="map" /> */}
          </Section>
        </main>
        <FooterSection></FooterSection>
      </div>
    </>
  );
}

export default App;
