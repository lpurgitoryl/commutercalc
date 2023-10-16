import Info from "../Info/Info";
// import gasIcon from "../assets/gas.svg";
// import moneyIcon from "../assets/money.svg";
// import timeIcon from "../assets/time.svg";
// import repeatIcon from "../assets/repeat.svg";
// import co2Icon from "../assets/co2.svg";
import round from "lodash/round";
import isEmpty from "lodash/isEmpty";

function Data(props) {
  function gasUsedInfo() {
    return round(props.dist / props.mpg, 2);
  }

  function price() {
    return round(gasUsedInfo() * props.gasPrice, 2);
  }

  function totalC02() {
    return round((props.dist * props.co2) / 1000, 2);
  }

  // if flag is true it means calc RTT else single trip
  function time(flag) {
    if (!flag) {
      return (
        (isEmpty(props.hour) ? "" : props.hour + "h ") +
        (isEmpty(props.min) ? "" : props.min + "min")
      );
    }
    // add an hour and get remainder for minutes when doubling duration for RTT
    let tempmin = parseInt(props.min) * 2;
    let temphour = parseInt(props.hour) * 2;
    if (tempmin >= 60) {
      temphour += 1;
      tempmin = tempmin % 60;
    }
    return (isNaN(temphour) ? "" : temphour + "h ") + (tempmin + "min");
  }
  return (
    <>
      <Info icon="/assets/gas.svg" info={gasUsedInfo() + " gal"} title={"gas used"} />
      <Info icon="/assets/money.svg" info={"$    " + price()} title={"cost"} />
      <Info icon="/assets/time.svg" info={time(props.RTT)} title={"duration"} />
      <Info icon="/assets/co2.svg" info={totalC02() + " kg"} title={"CO2"} />
      {/* <Info icon={repeatIcon} info={gasUsedInfo(props.mpg, props.dist)} /> */}
    </>
  );
}

export default Data;
