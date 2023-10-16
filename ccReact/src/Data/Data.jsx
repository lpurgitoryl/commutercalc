import Info from "../Info/Info";
import gasIcon from "../assets/gas.svg";
import moneyIcon from "../assets/money.svg";
import timeIcon from "../assets/time.svg";
import repeatIcon from "../assets/repeat.svg";
import co2Icon from "../assets/co2.svg";
import round from "lodash/round";


function Data(props) {
  function gasUsedInfo() {

    return round( props.dist / props.mpg, 2);
  }

  function price(){

    return round(gasUsedInfo() * props.gasPrice,2);
  }
  
  return (
    <>
      <Info icon={gasIcon} info={gasUsedInfo() + " gal"} />
      <Info icon={moneyIcon} info={ "$" + price() } />
      <Info icon={timeIcon} info={gasUsedInfo(props.mpg, props.dist)} />
      <Info icon={co2Icon} info={gasUsedInfo(props.mpg, props.dist)} /> 
      <Info icon={repeatIcon} info={gasUsedInfo(props.mpg, props.dist)} />
    </>
  );
}

export default Data;
