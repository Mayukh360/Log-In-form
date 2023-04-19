import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // This dummy function is for Only to get bettter VS code Automplete suggestions
  onLogin :(email, password)=>{}
});

export const AuthcontextProvider = (props) => {
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const loggedInfo=localStorage.getItem('isLoggedin')
        if(loggedInfo==='1'){
          setIsLoggedIn(true);
        }
      },[])
  
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedin')
    setIsLoggedIn(false);
    
  };

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedin", "1");
  };
 
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
