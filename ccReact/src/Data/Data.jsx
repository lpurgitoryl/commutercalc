import Info from "../Info/Info";
import gasIcon from "../assets/gas.svg";
import moneyIcon from "../assets/money.svg";
import timeIcon from "../assets/time.svg";
import repeatIcon from "../assets/repeat.svg";
import co2Icon from "../assets/co2.svg";
import round from "lodash/round";

function gasUsedInfo(vehicleMPG, distanceTraveled) {
  let mpg = parseInt(vehicleMPG);
  let mi = parseInt(distanceTraveled);
  return round(mi / mpg, 2);
}

function Data(props) {
  return (
    <>
      <Info icon={gasIcon} info={gasUsedInfo(props.mpg, props.dist) + " gal"} />
      <Info icon={moneyIcon} info={gasUsedInfo(props.mpg, props.dist)} />
      <Info icon={timeIcon} info={gasUsedInfo(props.mpg, props.dist)} />
      <Info icon={co2Icon} info={gasUsedInfo(props.mpg, props.dist)} />
      {/* <Info icon={repeatIcon} info={gasUsedInfo(props.mpg, props.dist)} /> */}
    </>
  );
}

export default Data;
