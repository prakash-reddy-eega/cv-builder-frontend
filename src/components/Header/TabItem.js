import classes from "./TabItem.module.css";
import { Link } from "react-router-dom";

const TabItem = (props) => {
  const toggleCartHandler = () => {
    props.changeActiveTab(props.tab.id);
  };
  const className =
    props.tab.id === props.activeTab
      ? `${classes.button} ${classes.activeButton}`
      : classes.button;
  return (
    <Link to={`/${props.tab.id}`}>
      <button className={className} onClick={toggleCartHandler}>
        <span>{props.tab.title}</span>
      </button>
    </Link>
  );
};

export default TabItem;
