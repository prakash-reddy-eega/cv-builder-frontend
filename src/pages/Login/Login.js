import useInput from "../../hooks/user-input";
import Card from "../../UI/Card";
import classes from "./Login.module.css";
import Button from "../../UI/Button";
import { login } from "../../services/auth";
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
import { addCommonHeader } from "../../services/cv";

const isNotEmpty = (value) => value.trim() !== "";
const isPassword = (value) => value.length >= 6

export const Login = (props) => {
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
  const [showBackdrop, setShowBackdrop] = useState(false)

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated)

  if (isAuthenticated) {
    // redirect to the specified URL
    return <Navigate to="/" replace={true} />;
  }

  let formIsValid = false;
  if (lastNameIsValid &&  passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async(event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const data = {
        username: lastNameValue,
        password: passwordValue,
    }
    try {
        setShowBackdrop(true)
        const response = await login(data)
        setShowBackdrop(false)
    if (response.data.status === 1) {
        toast.success(response.data.message);
        resetLastName();
        resetPassword();
        const token = JSON.stringify(response.data.data)
        localStorage.setItem(TOKEN, token)
        addCommonHeader()
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

  const lastNameClasses = lastNameHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;
//   const emailClasses = emailHasError
//     ? `${classes.formControl} ${classes.invalid}`
//     : classes.formControl;
    const passwordClasses = passwordHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  return (
    <>
    <BackdropLoader show={showBackdrop} />
    <Card>
    <ToastContainer theme="colored"/>
      <form onSubmit={submitHandler} className={classes.formControl}>
        <div className={classes.controlGroup}>
          <div className={lastNameClasses}>
            <label htmlFor="username">USERNAME / EMAIL</label>
            <input
              type="text"
              id="username"
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              placeholder='username or email'
            />
            {lastNameHasError && (
              <p className={classes.errorText}>Please enter a last name.</p>
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
              placeholder='password'
            />
            {passwordHasError && (
              <p className={classes.errorText}>
                Please enter a valid password.
              </p>
            )}
          </div>
        </div>  
        <div className={classes.formActions}>
          <p className={classes.text}>New User? <Link to='/signup'>SignUp</Link> </p> 
          <Button type={"submit"} disabled={!formIsValid}>
            SignIn
          </Button>
        </div>
      </form>
    </Card>
    </>
  );
};
