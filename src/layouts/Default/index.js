import React from "react";
import classes from "./index.module.css";
import { BasicDetails } from "../BasicDetails.js/BasicDetails";
import { EmploymentDetails } from "../EmploymentDetails/EmploymentDetails";
import { Projects } from "../Projects/Projects";
import { Skills } from "../Skills/Skills";
import { Education } from "../Education/Education";
import { SocialProfile } from "../SocialProfile/SocialProfile";


function Default(props) {
  const { cvData } = props;
  const basicDetails = cvData.basicDetails? cvData.basicDetails[0]? cvData.basicDetails[0]: undefined: undefined
  const employmentDetails = cvData.employmentDetails? cvData.employmentDetails: undefined
  const projects = cvData.projects? cvData.projects: undefined
  const skills = cvData.skills? cvData.skills: undefined
  const education = cvData.education? cvData.education: undefined
  const socialProfile = cvData.socialprofiles? cvData.socialprofiles: undefined

  return (
    <div className={classes.div}>
        {basicDetails && <BasicDetails basicDetails = {basicDetails} layoutStyle={props.layoutStyle}/>}
        {employmentDetails && <EmploymentDetails employmentDetails={employmentDetails} />}
        {projects && <Projects projects = {projects}/>}
        {skills && <Skills skills={skills[0]}/>}
        {education && <Education education={education}/>}
        {socialProfile && <SocialProfile socialProfile={socialProfile}/>}
    </div>
  );
}

export default Default;
