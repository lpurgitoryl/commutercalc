
import { useState, useContext } from "react";
import classes from "./ToggleSwitch.module.css"; 
import ThemeAndFormContext from "../store/ThemeAndForm-context";
  
function ToggleSwitch () { 
    const ctx = useContext(ThemeAndFormContext);

    const [isChecked, setIsChecked] = useState(false);

    function clickHandler(e){
        setIsChecked(e.target.checked);
        ctx.setTheme(e.target.checked)
        
    }
    return ( 
        <div>
        <label className={classes.switch}>
            <input type="checkbox" id="checkbox" checked={isChecked} onChange={clickHandler}/>
            <span className={[classes.slider, classes.round].join(" ")}></span>
        </label>
        </div>
    ); 
  }
  
export default ToggleSwitch;