import React from "react";
import classes from "./index.module.css";
import CgProfile from "react-icons/cg";
import { BasicDetails } from "../BasicDetails.js/BasicDetails";

function Default(props) {
  const { cvData } = props;
  const basicDetails = cvData.basicDetails? cvData.basicDetails[0]? cvData.basicDetails[0]: undefined: undefined
  return (
    <div className={classes.div}>
        {basicDetails && <BasicDetails basicDetails = {basicDetails}/>}
        <div>
            <div>

            </div>
            <div>

            </div>
        </div>
    </div>
  );
}

export default Default;
