import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { layoutStyleActions } from "../../store/LayoutStyle";
import classes from "./Templates.module.css";
import Button from "../Home/Button";
import SideBar from "../../UI/SideBar/SideBar";
import { Link, Navigate } from "react-router-dom";
import { Preview } from "../../components/Preview/preview";
import { DUMMY_CV } from "../../utils/constants";

export const Templates = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.layoutStyle.isOpen);
  const layoutStyle = useSelector((state) => state.layoutStyle.layoutStyle);
  const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/login' replace={true}/>
    }
  const closeSidebar = () => {
    dispatch(layoutStyleActions.close());
  };

  const openSidebar = () => {
    dispatch(layoutStyleActions.open());
  };

  return (
    <div className={classes.container}>
      {isOpen && (
        <div className={classes.sidebarBackground} onClick={closeSidebar}></div>
      )}
      <SideBar />
      <div className={classes.buttonContainer}>
        <Button
          type="button"
          onClick={openSidebar}
          className={classes.template}
        >
          Get Templates
        </Button>
        <Link to="/myCVs">
          <Button
            type="button"
            onClick={openSidebar}
            className={classes.create}
          >
            Proceed to Build Your CV
          </Button>
        </Link>
      </div>
      <h3>Selected {layoutStyle} Template</h3>
      <div className={classes.card}>
        <Preview cvData={DUMMY_CV} layoutStyle={layoutStyle}/>
      </div>
    </div>
  );
};
