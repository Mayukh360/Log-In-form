import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.includes("@") };
  }
  if(action.type==="INPUT_BLUR"){
    return { value: state.value, isvalid: state.value.includes("@") };  //State will give last values snapshot
  }
  return { value: "", isvalid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.trim().length >6 };
  }
  if(action.type==="INPUT_BLUR"){
    return { value: state.value, isvalid: state.value.trim().length >6 };  //State will give last values snapshot
  }
  return { value: "", isvalid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredcollegeName, setEnteredcollegeName] = useState("");
  const [collegeIsValid, SetCollegeIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isvalid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isvalid: null,
  });
  //Object Destructuring
  const{isvalid : emailISValid}=emailState; // Pulling Out email validity from email states
  const{isvalid : passwordIsValid}=passwordState;
  
  useEffect(() => {
    const identifier= setTimeout(() => {
      console.log("Form is Checked");
     setFormIsValid(
        // emailState.isvalid &&  passwordState.isvalid &&
        emailISValid && passwordIsValid && enteredcollegeName.trim().length > 4
      );
    }, 500);

    return () => {
      console.log("Cleanup");
      clearTimeout(identifier);
    };
  }, 
  //Using these Dependencies Validity will be checked also after  passwordgets validated,to stop this we have have to use validities only instead of whole states, that's why we need object destructuring
  // [emailState, passwordState, enteredcollegeName]); 
  [emailISValid, passwordIsValid, enteredcollegeName]); //This will check only validity not states, once validity is checked and confirmed that validity is ok, doesn't matter how much keystrokes you write, it won't change , so validity once activated it won't checked further keystrokes

 
  

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') &&
      passwordState.isvalid  &&
        enteredcollegeName.trim().length > 4
    );
  };

  const passwordChangeHandler = (event) => {
     dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    
    setFormIsValid(
      passwordState.isvalid &&
        passwordState.isvalid &&
        enteredcollegeName.trim().length > 4
    );
  };
  const collegeChangeHandler = (event) => {
    setEnteredcollegeName(event.target.value);
    
   
    setFormIsValid(
      event.target.value.includes("@") &&
      passwordState.isvalid  &&
        enteredcollegeName.trim().length > 4
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type : 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : 'INPUT_BLUR'})
  };
  const validateCollegeHandler = () => {
    SetCollegeIsValid(enteredcollegeName.trim().length > 4);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredcollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredcollegeName}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
