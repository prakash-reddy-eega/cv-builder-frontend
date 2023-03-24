import classes from "./TabItem.module.css";
import { Link, useLocation } from "react-router-dom";

const TabItem = (props) => {
  const location = useLocation()
  const isActive = location.pathname.includes(props.tab.id)
  const className = isActive
      ? `${classes.button} ${classes.activeButton}`
      : classes.button;
  return (
    <Link to={`/${props.tab.id}`}>
      <button className={className}>
        <span>{props.tab.title}</span>
      </button>
    </Link>
  );
};

export default TabItem;
