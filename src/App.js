import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Login from "./Login";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
// import {useAuthState} from 'react-firebase-hooks/auth'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { auth } from "./firebase";
import Home from "./Home";
import Chat from "./Chat";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import InstagramIcon from "@material-ui/icons/Instagram";
import GetInTorch from "./GetInTorch";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } 
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/contactme" component={GetInTorch} />

        {!user ? (
          <Login />
        ) : (
          <div className="app">
            <>
              <Header />

              <div className="app__body">
                {/*sidebar*/}
                <Sidebar />

                <Route exact path="/channel/:roomId">
                  {/*feed*/}
                  <Chat />
                </Route>
                <Route exact path="/">
                  {/*feed*/}
                  <Home />
                </Route>
                {/*widget*/}
              </div>
              <div className="icons">
                <GitHubIcon />
                <FacebookIcon />
              </div>
            </>
          </div>
        )}
      </Switch>
    </Router>
  );
}

export default App;
