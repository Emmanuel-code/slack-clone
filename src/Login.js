import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth, provider } from "./firebase";
import "./Login.css";
import { useHistory } from "react-router-dom";



function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const signIn = (e) => {
    e.preventDefault()
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
        history.push("/home");
      })
      .catch((error) => alert(error));
    
  };
  return (
    <div className="login">
      
      <div className="login__container">
        <img src="../Slack-Logo-PNG4.png" alt="logo" />
        <h1>Sign in to the best SLACK CLONE</h1>
        <p>slack.clone</p>
        <Button className="button" onClick={signIn}>
          Sign with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
