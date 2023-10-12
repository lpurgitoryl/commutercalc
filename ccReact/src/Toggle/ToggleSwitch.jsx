
import { useState } from "react";
import classes from "./ToggleSwitch.module.css"; 
  
function ToggleSwitch () { 
    const [isChecked, setIsChecked] = useState(false);

    function clickHandler(e){
        setIsChecked(e.target.checked);
    }
    return ( 
        <div>
        <label className={classes.switch}>
            <input type="checkbox" id="checkbox" checked={isChecked} onClick={clickHandler}/>
            <span className={[classes.slider, classes.round].join(" ")}></span>
        </label>
        </div>
    ); 
  }
  
export default ToggleSwitch;