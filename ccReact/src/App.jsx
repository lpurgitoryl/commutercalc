import { useState, useEffect, useContext } from "react";
import ThemeAndFormContext from "./store/ThemeAndForm-context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import logo from "./assets/CC_logo.svg";
import Section from "./cardSection/CardSection";
import Form from "./Form/Form";
import HeaderSection from "./HeaderSection/HeaderSection";
import FooterSection from "./FooterSection/FooterSection";
import RouteMap from "./RouteMap/RouteMap";
import Stats from "./Stats/Stats";
import isEmpty from "lodash/isEmpty";

const publicToken = import.meta.env.VITE_API_TOKEN;

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
      return;
    }

    if (!isEmpty(ctx.vehicle)) {
      toast.success("Commute Data Below!", {
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
  }, [ctx.invalidTrips, ctx.invalidLocA, ctx.invalidLocB, ctx.vehicle]);

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
            <h1 className="text">
              Enter the following fields to calculate your commute cost!
            </h1>
            {ctx.invalidLocA || ctx.invalidLocB || ctx.invalidTrips ? (
              <a className="error">Please revise the following fields.</a>
            ) : null}
            <Form token={publicToken} />
          </Section>
          <Section>
            <Stats />
          </Section>
          <Section>
            <RouteMap />
          </Section>
        </main>
        <FooterSection></FooterSection>
      </div>
    </>
  );
}

export default App;
