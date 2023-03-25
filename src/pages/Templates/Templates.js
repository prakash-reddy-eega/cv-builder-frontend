import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { layoutStyleActions } from "../../store/LayoutStyle";
import classes from "./Templates.module.css";
import Button from "../Home/Button";
import SideBar from "../../UI/SideBar";
import { Link } from "react-router-dom";
import { DEFAULT, LONDON, SYDNEY } from "../../utils/constants";

export const Templates = () => {
  const dispath = useDispatch();
  const isOpen = useSelector((state) => state.layoutStyle.isOpen);
  const layoutStyle = useSelector((state) => state.layoutStyle.layoutStyle);
  const closeSidebar = () => {
    dispath(layoutStyleActions.close());
  };

  const openSidebar = () => {
    dispath(layoutStyleActions.open());
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
        {layoutStyle === DEFAULT && (
          <img
            src="https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg"
            className={classes.templateContainer}
            alt='cv template'
          />
        )}
        {layoutStyle === SYDNEY && (
          <img
            src="https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/441/persistent-resource/sydney-resume-templates.jpg"
            className={classes.templateContainer}
            alt='cv template'
          />
        )}
        {layoutStyle === LONDON && (
          <img
            src="https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg"
            className={classes.templateContainer}
            alt='cv template'
          />
        )}
      </div>
    </div>
  );
};
