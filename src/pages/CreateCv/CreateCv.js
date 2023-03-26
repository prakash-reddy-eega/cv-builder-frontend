import { Preview } from "../../components/Preview/preview";
import { useState, useEffect } from "react";
import classes from "./CreateCv.module.css";
import { InputCard } from "../../UI/InputCard";
import { DUMMY_PROFILE } from "../../utils/constants";
import { Link } from 'react-scroll';
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { localCvDataActions } from "../../store/localCvData";
import { saveCv } from "../../services/cv";
import BackdropLoader from "../../UI/BackdropLoader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const generateId = (count = 0) => {
  const timeStamp = +new Date();
  const id = timeStamp + count.toString();
  return id;
};

const basicDetailsToBeAdd = {
  name: "",
  wantedJobTitle: "",
  profile: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pin: "",
  introduction: "",
  cardOpenToggle: false,
};
const employmentDeatilsToBeAdd = {
  jobTitle: "",
  employer: "",
  city: "",
  startDate: "",
  endDate: "",
  cardOpenToggle: false,
};

const projectsToBeAdd = {
  projectName: '',
  projectDescriptions: '',
  cardOpenToggle: false,
}

const skillsToBeAdd = {
  skillsList: '',
  cardOpenToggle: false,
}

const educationDetailsToBeAdd = {
  cardOpenToggle: false,
  college: '',
  degree: '',
  city: '',
  startDate: '',
  endDate: '',
  description: ''
}

const socialProfilesToBeAdd = {
  cardOpenToggle: false,
  label: '',
  link: ''
}

export const CreateCv = () => {
  const preData = {
    basicDetails: [{ ...basicDetailsToBeAdd, id: generateId() }],
    employmentDetails: [{ ...employmentDeatilsToBeAdd, id: generateId() }],
    projects: [{...projectsToBeAdd, id: generateId()}],
    skills: [{...skillsToBeAdd, id: generateId()}],
    education: [{...educationDetailsToBeAdd, id: generateId()}],
    socialprofiles: [{...socialProfilesToBeAdd, id: generateId()}]
  }
  const [cvData, setCvData] = useState(preData);
  const { basicDetails, employmentDetails,projects, skills, education, socialprofiles } = cvData;
  const [isLoading, setIsLoading] = useState(false)
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const localCvData = useSelector( state => state.localCv.localCvData)
  const layoutStyle = useSelector( state => state.layoutStyle.layoutStyle)
  useEffect(()=> {
    if(cvData !== localCvData){
      dispatch(localCvDataActions.onLocalCvDataChange(cvData))
    }
  }, [cvData])
  useEffect( () => {
    if(localCvData !== null){
      setCvData(localCvData)
    }
  }, [])

  //closing prompt







  const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/login' replace={true}/>
    }




//removing
  const removeImage = () => {
    const profileImageRemoved = [{...basicDetails[0], profile: ''}]
    setCvData({...cvData, basicDetails: profileImageRemoved})
  }
//getting image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        const profileImageAdded = [{...basicDetails[0], profile: event.target.result}]
        setCvData({...cvData, basicDetails: profileImageAdded})
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
//on change on employment details
  const onChangeEmployerHandler = (event) => {
    const name = event.target.name
    const [key, index] = name.split(',')
    const updated = employmentDetails.map( (eachObj, i) => {
      if(i === Number(index)){
        return {
          ...eachObj, [key]: event.target.value
        }
      }
      return eachObj
    })
    setCvData({...cvData, employmentDetails: updated})
  }
//on change on social profiles list
const onChangeSocialProfileHandler = (event) => {
  const name = event.target.name
  const [key, index] = name.split(',')
  const updated = socialprofiles.map( (eachObj, i) => {
    if(i === Number(index)){
      return {
        ...eachObj, [key]: event.target.value
      }
    }
    return eachObj
  })
  setCvData({...cvData, socialprofiles: updated})
}  
//on change on education details
  const onChangeEducationHandler = (event) => {
  const name = event.target.name
  const [key, index] = name.split(',')
  const updated = education.map( (eachObj, i) => {
    if(i === Number(index)){
      return {
        ...eachObj, [key]: event.target.value
      }
    }
    return eachObj
  })
  setCvData({...cvData, education: updated})
}  
// on change on project details  
const onChangeProjectHandler  = (event) => {
  const name = event.target.name
  const [key, index] = name.split(',')
  const updated = projects.map( (eachObj, i) => {
    if(i === Number(index)){
      return {
        ...eachObj, [key]: event.target.value
      }
    }
    return eachObj
  })
  setCvData({...cvData, projects: updated})
}
//on change on basic details
  const onChangeHandler = (event) => {
    const changedDetails = [{...basicDetails[0], [event.target.name]: event.target.value}]
    setCvData({...cvData, basicDetails: changedDetails})
  }
//on change skills 
const onChangeSkillsHandler = (event) => {
  const changedDetails = [{...skills[0], [event.target.name]: event.target.value}]
  setCvData({...cvData, skills: changedDetails})
}
  //card open for skills card 
  const onToggeleSkillsCard = (id) => {
    const updatedToggleOpenCard = skills.map((eachitem) => {
      if (eachitem.id === id) {
        const updatedObj = {
          ...eachitem,
          cardOpenToggle: !eachitem.cardOpenToggle,
        };
        return updatedObj;
      }
      return eachitem;
    });
    setCvData({ ...cvData, skills: updatedToggleOpenCard });
  };
  //card open for basic details
  const onToggeleBasicDetailsCard = (id) => {
    const updatedToggleOpenCard = basicDetails.map((eachitem) => {
      if (eachitem.id === id) {
        const updatedObj = {
          ...eachitem,
          cardOpenToggle: !eachitem.cardOpenToggle,
        };
        return updatedObj;
      }
      return eachitem;
    });
    setCvData({ ...cvData, basicDetails: updatedToggleOpenCard });
  };
  //card open for employment details
  const onToggeleEmploymentDetailsCard = (id) => {
    const updatedToggleOpenCard = employmentDetails.map((eachitem) => {
      if (eachitem.id === id) {
        const updatedObj = {
          ...eachitem,
          cardOpenToggle: !eachitem.cardOpenToggle,
        };
        return updatedObj;
      }
      return eachitem;
    });
    setCvData({ ...cvData, employmentDetails: updatedToggleOpenCard });
  };
    //card open for socila profile list
    const onToggeleSocialprofileCard = (id) => {
      const updatedToggleOpenCard = socialprofiles.map((eachitem) => {
        if (eachitem.id === id) {
          const updatedObj = {
            ...eachitem,
            cardOpenToggle: !eachitem.cardOpenToggle,
          };
          return updatedObj;
        }
        return eachitem;
      });
      setCvData({ ...cvData, socialprofiles: updatedToggleOpenCard });
    };
    //card open for education details
    const onToggeleEducationCard = (id) => {
      const updatedToggleOpenCard = education.map((eachitem) => {
        if (eachitem.id === id) {
          const updatedObj = {
            ...eachitem,
            cardOpenToggle: !eachitem.cardOpenToggle,
          };
          return updatedObj;
        }
        return eachitem;
      });
      setCvData({ ...cvData, education: updatedToggleOpenCard });
    };
  //card opening for project details 
  const onToggeleProjectDetailsCard = (id) => {
    const updatedToggleOpenCard = projects.map((eachitem) => {
      if (eachitem.id === id) {
        const updatedObj = {
          ...eachitem,
          cardOpenToggle: !eachitem.cardOpenToggle,
        };
        return updatedObj;
      }
      return eachitem;
    });
    setCvData({ ...cvData, projects: updatedToggleOpenCard });
  };
  //adding extra exployment details
  const addAnotherEmployment = () => {
  const count = employmentDetails.length;
  const newId = generateId(count);
  const newEmployment = { ...employmentDeatilsToBeAdd, id: newId };
  const newEmploymentDetails = [...employmentDetails, newEmployment];
  setCvData({ ...cvData, employmentDetails: newEmploymentDetails });
  };
   //adding extra social profile details
   const addAnotherSocialprofile = () => {
    const count = socialprofiles.length;
    const newId = generateId(count);
    const newSocialProfile = { ...socialProfilesToBeAdd, id: newId };
    const newSocialprofileDetails = [...socialprofiles, newSocialProfile];
    setCvData({ ...cvData, socialprofiles: newSocialprofileDetails });
    };
  //adding extra education details
    const addAnotherEducation = () => {
    const count = education.length;
    const newId = generateId(count);
    const newEducation = { ...educationDetailsToBeAdd, id: newId };
    const newEducationDetails = [...education, newEducation];
    setCvData({ ...cvData, education: newEducationDetails });
    };
  //adding extra projects to list 
  const addAnotherProject = () => {
    const count = projects.length;
    const newId = generateId(count);
    const newProject = { ...projectsToBeAdd, id: newId };
    const newProjectDetails = [...projects, newProject];
    setCvData({ ...cvData, projects: newProjectDetails });
  };
  //delete social profile records
  const onClickDelateSocialprofileRecord = (id) => {
    const updatedSocialprofileRecords = socialprofiles.filter(
      (eachitem) => eachitem.id !== id
    );
    setCvData({ ...cvData, socialprofiles: updatedSocialprofileRecords });
  };
   //delete employment records
   const onClickDelateEmploymentRecord = (id) => {
    const updatedEmploymentRecords = employmentDetails.filter(
      (eachitem) => eachitem.id !== id
    );
    setCvData({ ...cvData, employmentDetails: updatedEmploymentRecords });
  };
    //delete eduation records
    const onClickDelateEducationRecord = (id) => {
      const updatedEducationRecords = education.filter(
        (eachitem) => eachitem.id !== id
      );
      setCvData({ ...cvData, education: updatedEducationRecords });
    };
  //delete project details 
  const onClickDelateProjectRecord = (id) => {
    const updatedProjectRecords = projects.filter(
      (eachitem) => eachitem.id !== id
    );
    setCvData({ ...cvData, projects: updatedProjectRecords });
  };

//save cv details
const onClickSaveCv = async() => {
  const data = {template: layoutStyle, cvDetails: cvData}
  try {
    setIsLoading(true)
    const response = await saveCv(data)
    setIsLoading(false)
    if (response.data.status === 1) {
    toast.success(response.data.message);
    setCvData(preData)
    setTimeout(() => {
      navigate('/myCvs', {replace: true });
    }, 2000)
    
  } else if (response.data.status === 0) {
    let message = "";
    if (typeof response.data.data === "string") {
      message = response.data.message;
    } else {
      message = response.data.data.errors[0].msg;
    }
    toast.error(message);
  }
} catch (error) {
    console.log(error)
    setIsLoading(false)
    toast.error(error.response.data.message)
}

}

  //employment details
  const renderEmploymentDetailsInputs = (eachObj, index) => {
    return (
      <li key={eachObj.id}>
        <InputCard
          label={`Employment Details-${index + 1}`}
          toggle={onToggeleEmploymentDetailsCard}
          isOpen={eachObj.cardOpenToggle}
          details={eachObj}
          recordsCount={employmentDetails.length}
          deleteRecord={onClickDelateEmploymentRecord}
        >
          {eachObj.cardOpenToggle && (
            <div className={classes.inputsContainer}>
              <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>Job Title</label>
                    <input type='text' name={`jobTitle,${index}`} onChange={onChangeEmployerHandler} value={employmentDetails[index].jobTitle}/>
                  </div>  
                  <div>
                  <div>
                    <label>Employer</label>
                    <input type='text' name={`employer,${index}`} onChange={onChangeEmployerHandler} value={employmentDetails[index].employer}/>
                  </div>
                  </div>
              </div>
              <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>Start Date</label>
                    <input type='date' name={`startDate,${index}`} onChange={onChangeEmployerHandler} value={employmentDetails[index].startDate}/>
                  </div>  
                  <div>
                  <div>
                    <label>End Date</label>
                    <input type='date' name={`endDate,${index}`} onChange={onChangeEmployerHandler} value={employmentDetails[index].endDate}/>
                  </div>
                  </div>
              </div>
              <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>City</label>
                    <input type='text' name={`city,${index}`} onChange={onChangeEmployerHandler} value={employmentDetails[index].city}/>
                  </div>  
                </div>
            </div>
          )}
        </InputCard>
      </li>
    );
  };

  //projects inputs
  const renderProjectsInputs = (eachObj, index) => {
    return (
      <li key={eachObj.id}>
        <InputCard
          label={`Project Details-${index + 1}`}
          toggle={onToggeleProjectDetailsCard}
          isOpen={eachObj.cardOpenToggle}
          details={eachObj}
          recordsCount={projects.length}
          deleteRecord={onClickDelateProjectRecord}
        >
          {eachObj.cardOpenToggle && (
            <div className={classes.inputsContainer}>
              <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>Project Name</label>
                    <input type='text' name={`projectName,${index}`} onChange={onChangeProjectHandler} value={projects[index].projectName}/>
                  </div>  
                </div>
                <div className={classes.textArea}>
                    <label>Project Description</label>
                    <textarea rows="4" cols="50" name={`projectDescriptions,${index}`} placeholder="Describe About Your Project" onChange={onChangeProjectHandler} value={projects[index].projectName}/>
                  </div> 
            </div>
          )}
        </InputCard>
      </li>
    );
  };
  //skills inputs
    const renderSkillsInputs = () => {
      return (<InputCard
        label="Skills"
        toggle={onToggeleSkillsCard}
        isOpen={skills[0].cardOpenToggle}
        details={skills[0]}
        recordsCount={skills.length}
      >
        {skills[0].cardOpenToggle && (
         <div> 
            <div className={classes.textArea}>
              <label>Add Your Skills</label>
              <textarea rows="4" cols="50" name='skillsList' placeholder="add comma seperated skills" onChange={onChangeSkillsHandler} value={skills[0].skillsList}/>
            </div>  
          </div>
        )}
      </InputCard>)
        
    };
//education inputs
const renderEducationDetailsInputs = (eachObj, index) => {
  return (
    <li key={eachObj.id}>
      <InputCard
        label={`Education Details-${index + 1}`}
        toggle={onToggeleEducationCard}
        isOpen={eachObj.cardOpenToggle}
        details={eachObj}
        recordsCount={education.length}
        deleteRecord={onClickDelateEducationRecord}
      >
        {eachObj.cardOpenToggle && (
          <div className={classes.inputsContainer}>
            <div className={classes.inputsFeildsCard}>
                <div>
                  <label>College Name</label>
                  <input type='text' name={`college,${index}`} onChange={onChangeEducationHandler} value={education[index].college}/>
                </div>  
                <div>
                <div>
                  <label>Degree</label>
                  <input type='text' name={`degree,${index}`} onChange={onChangeEducationHandler} value={education[index].degree}/>
                </div>
                </div>
            </div>
            <div className={classes.inputsFeildsCard}>
                <div>
                  <label>Start Date</label>
                  <input type='date' name={`startDate,${index}`} onChange={onChangeEducationHandler} value={education[index].startDate}/>
                </div>  
                <div>
                <div>
                  <label>End Date</label>
                  <input type='date' name={`endDate,${index}`} onChange={onChangeEducationHandler} value={education[index].endDate}/>
                </div>
                </div>
            </div>
            <div className={classes.inputsFeildsCard}>
                <div>
                  <label>City</label>
                  <input type='text' name={`city,${index}`} onChange={onChangeEducationHandler} value={education[index].city}/>
                </div>  
              </div>
              <div> 
            <div className={classes.textArea}>
              <label>Decribe Your Education</label>
              <textarea rows="4" cols="50" name={`description,${index}`} placeholder="Describe..." onChange={onChangeEducationHandler} value={education[index].description}/>
            </div>  
          </div>
          </div>
        )}
      </InputCard>
    </li>
  );
};
//renderSocialProfileDetailsInputs
const renderSocialProfileDetailsInputs = (eachObj, index) => {
  return (
    <li key={eachObj.id}>
      <InputCard
        label={`Social Profile-${index + 1}`}
        toggle={onToggeleSocialprofileCard}
        isOpen={eachObj.cardOpenToggle}
        details={eachObj}
        recordsCount={socialprofiles.length}
        deleteRecord={onClickDelateSocialprofileRecord}
      >
        {eachObj.cardOpenToggle && (
          <div className={classes.inputsContainer}>
            <div className={classes.inputsFeildsCard}>
                <div>
                  <label>Social Profile Name</label>
                  <input type='text' name={`label,${index}`} onChange={onChangeSocialProfileHandler} value={socialprofiles[index].label}/>
                </div>  
                <div>
                <div>
                  <label>Link</label>
                  <input type='text' name={`link,${index}`} onChange={onChangeSocialProfileHandler} value={socialprofiles[index].link}/>
                </div>
                </div>
            </div>
          </div>
        )}
      </InputCard>
    </li>
  );
};

  return (
    <>
    <ToastContainer/>
    <BackdropLoader show={isLoading}/>
    <Link
    activeClass="active"
    to="section1"
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
  >
    <button className={classes.previewButton} type='button'>Preview</button>
  </Link>
      <div className={classes.div}>
        <div className={classes.inputsContainer}>
          {/* basic details */}
          <div>
            <h3>Basic Details <span className={classes.mandatory}>*mandatory</span></h3> 
            <InputCard
              label="Basic Details"
              toggle={onToggeleBasicDetailsCard}
              isOpen={basicDetails[0].cardOpenToggle}
              details={basicDetails[0]}
              recordsCount={basicDetails.length}
            >
              {basicDetails[0].cardOpenToggle && (
               <div> 
                <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>Wanted Job Title</label>
                    <input type='text' name='wantedJobTitle' onChange={onChangeHandler} value={basicDetails[0].wantedJobTitle} />
                  </div>  
                  <div>
                    {basicDetails[0].profile && ( <div className={classes.imageContainer}> <img  src={basicDetails[0].profile } alt="profile pic" width="110" height="100"/>  <span className={classes.imageRemove} onClick={removeImage}>remove</span> </div> )}
                    {!basicDetails[0].profile  && (<div> <img src={DUMMY_PROFILE} alt="profile pic" width="100" height="100"/> </div>)}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </div>
                </div>
                <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>Name</label>
                    <input type='text' name='name'  onChange={onChangeHandler} value={basicDetails[0].name}/>
                  </div>  
                  <div>
                  <div>
                    <label>Phone</label>
                    <input type='text' name='phone' onChange={onChangeHandler} value={basicDetails[0].phone}/>
                  </div>
                  </div>
                </div>
                <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>Email</label>
                    <input type='email' name='email' onChange={onChangeHandler} value={basicDetails[0].email}/>
                  </div>  
                  <div>
                  <div>
                    <label>Address</label>
                    <input type='text' name='address' onChange={onChangeHandler} value={basicDetails[0].address}/>
                  </div>
                  </div>
                </div>
                <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>City</label>
                    <input type='text' name='city' onChange={onChangeHandler} value={basicDetails[0].city}/>
                  </div>  
                  <div>
                  <div>
                    <label>State</label>
                    <input type='text' name='state' onChange={onChangeHandler} value={basicDetails[0].state}/>
                  </div>
                  </div>
                </div>
                <div className={classes.inputsFeildsCard}>
                  <div>
                    <label>PinCode</label>
                    <input type='text' name='pin' onChange={onChangeHandler} value={basicDetails[0].pin}/>
                  </div>  
                </div>
                  <div className={classes.textArea}>
                    <label>Professional Summaary</label>
                    <textarea rows="4" cols="50" name='introduction' placeholder="give your introduction" onChange={onChangeHandler} value={basicDetails[0].introduction}/>
                  </div>  
                </div>
              )}
            </InputCard>
          </div>
          {/* Employment Details */}
          <div>
            <h3>Employement Details</h3>
            <ul>
              {employmentDetails.map((eachObj, index) => {
                return renderEmploymentDetailsInputs(eachObj, index);
              })}
            </ul>
            <p className={classes.addMore} onClick={addAnotherEmployment}>
              {" "}
              + Add one more Employment Details
            </p>
          </div>
          {/* projects */}
          <div>
            <h3>Projects</h3>
            <ul>
              {projects.map((eachObj, index) => {
                return renderProjectsInputs(eachObj, index);
              })}
            </ul>
            <p className={classes.addMore} onClick={addAnotherProject}>
              {" "}
              + Add one more Project Details
            </p>
          </div>
          {/* skills */}
          <div>
            <h3>Skills</h3>
            {renderSkillsInputs()}
          </div>
           {/* Education Details */}
           <div>
            <h3>Education Details</h3>
            <ul>
              {education.map((eachObj, index) => {
                return renderEducationDetailsInputs(eachObj, index);
              })}
            </ul>
            <p className={classes.addMore} onClick={addAnotherEducation}>
              {" "}
              + Add one more Education Details
            </p>
          </div>
          {/* Social Profiles */}
          <div>
            <h3>Social Profiles</h3>
            <ul>
              {socialprofiles.map((eachObj, index) => {
                return renderSocialProfileDetailsInputs(eachObj, index);
              })}
            </ul>
            <p className={classes.addMore} onClick={addAnotherSocialprofile}>
              {" "}
              + Add one more Social Profile
            </p>
          </div>
        </div>
        {/* preview */}
        <div className={classes.previewContainer} id='section1'>
            <h3>Cv Preview</h3>
            <Preview cvData={cvData} layoutStyle={layoutStyle}/>
        </div>
      </div>
      <button className={basicDetails[0].name? classes.saveButton: classes.disabledButton} type="button" onClick = {onClickSaveCv} disabled={basicDetails[0].name? false: true}>Save Your Cv</button>
    </>
  );
};
