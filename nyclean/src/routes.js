import Safety from "./Safety/Safety";
import Profile from './Profile';
import App from './App';
import React from "react";
import User from './User';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes = () => (
  <Router>
    <div>
      <Route exact path = {"/user"} component = {() => <User />}/>
      <Route exact path = {"/safety"} component = {() => <Safety />}/>
      <Route exact path = {"/profPage"} component = {() => <Profile />}/>
      <Route exact path = {"/"} component = {() => <App />}/>
    </div>
  </Router>
);

export default Routes;
