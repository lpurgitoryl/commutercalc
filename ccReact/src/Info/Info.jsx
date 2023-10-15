import classes from "./Info.module.css"

function Info(props) {
  return (
        <div className={classes.wrapper}>
            <img className={classes.icon}src={props.icon}></img>
            <h1 className={classes.text}> {props.info}</h1>
        </div>
  );
}

export default Info;
