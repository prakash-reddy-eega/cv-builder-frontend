import useInput from "../../hooks/user-input";
import Card from "../../UI/Card";
import classes from "./SignUp.module.css";
import Button from "../../UI/Button";
import { register } from "../../services/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { TOKEN } from "../../utils/constants";
import BackdropLoader from "../../UI/BackdropLoader";
import { useState } from "react";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isMobileNumber = (value) => typeof(Number(value)) === "number" && value.length >= 10
const isPassword = (value) => value.length >= 6

export const SignUp = (props) => {
  const [showBackdrop, setShowBackdrop] = useState(false)
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: mobileNum,
    isValid: mobileNumIsValid,
    hasError: mobileNumHasError,
    valueChangeHandler: mobileNumChangeHandler,
    inputBlurHandler: mobileNumBlurHandler,
    reset: resetmobileNum,
  } = useInput(isMobileNumber);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);
  const isConfirmPassword = (value) => value === passwordValue
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetconfirmPassword,
  } = useInput(isConfirmPassword);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated)

  if (isAuthenticated) {
    // redirect to the specified URL
    return <Navigate to="/" replace={true} />;
  }

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid && mobileNumIsValid && passwordIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async(event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const data = {
        name: firstNameValue,
        username: lastNameValue,
        email: emailValue,
        contactNumber: mobileNum,
        password: passwordValue,
        confirmPassword: confirmPasswordValue
    }
    try {
        setShowBackdrop(true)
        const response = await register(data)
        setShowBackdrop(false)
    if (response.data.status === 1) {
        toast.success(response.data.message);
        resetFirstName();
        resetLastName();
        resetEmail();
        resetmobileNum();
        resetPassword();
        resetconfirmPassword()
        const token = JSON.stringify(response.data.data)
        localStorage.setItem(TOKEN, token)
        dispatch(authActions.login())
        navigate('/', {replace: true });
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
        setShowBackdrop(false)
        console.log(error)
        toast.error(error.response.data.message)
    }
    
  };

  const firstNameClasses = firstNameHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;
  const lastNameClasses = lastNameHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;
  const emailClasses = emailHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;
  const mobilleNumClasses = mobileNumHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;
    const passwordClasses = passwordHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;
    const confirmPasswordClasses = confirmPasswordHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;



  return (
    <>
    <BackdropLoader show={showBackdrop}/>
    <Card>
    <ToastContainer theme="colored"/>
      <form onSubmit={submitHandler} className={classes.formControl}>
        <div className={classes.controlGroup}>
          <div className={firstNameClasses}>
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              id="name"
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
            />
            {firstNameHasError && (
              <p className={classes.errorText}>Please enter a user name.</p>
            )}
          </div>
          <div className={lastNameClasses}>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
            />
            {lastNameHasError && (
              <p className={classes.errorText}>Please enter a last name.</p>
            )}
          </div>
          <div className={emailClasses}>
            <label htmlFor="email">E-MAIL</label>
            <input
              type="text"
              id="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className={classes.errorText}>
                Please enter a valid email address.
              </p>
            )}
          </div>
          <div className={mobilleNumClasses}>
            <label htmlFor="email">MOBILE NUMBER</label>
            <input
              type='text'
              id="number"
              value={mobileNum}
              onChange={mobileNumChangeHandler}
              onBlur={mobileNumBlurHandler}
            />
            {mobileNumHasError && (
              <p className={classes.errorText}>
                Please enter a valid mobile number.
              </p>
            )}
          </div>
          <div className={passwordClasses}>
            <label htmlFor="password">PASSWORD</label>
            <input
              type='password'
              id="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={classes.errorText}>
                Please enter a valid password.
              </p>
            )}
          </div>
          <div className={confirmPasswordClasses}>
            <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
            <input
              type='password'
              id="confirmPassword"
              value={confirmPasswordValue}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
            />
            {confirmPasswordHasError && (
              <p className={classes.errorText}>
                passwords didn't match
              </p>
            )}
          </div>
        </div>  
        <div className={classes.formActions}>
          <p className={classes.text}>Registered User? <Link to='/login'>Login</Link> </p> 
          <Button type={"submit"} disabled={!formIsValid}>
            SignUp
          </Button>
        </div>
      </form>
    </Card>
    </>
  );
};
