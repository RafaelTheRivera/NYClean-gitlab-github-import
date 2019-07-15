import Home from "./Home/Home";
import Safety from "./Safety/Safety";
import Profile from './Profile';
import Edit from './Edit';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Routes = () => (
    <Router>
      <div>
        <Route exact path = {"/"} component = {() => <Home />}/>
        <Route exact path = {"/profPage"} component = {() => <Profile />}/>
        <Route exact path = {"/Edit"} component = {() => <Edit />}/>
        <Route exact path = {"/safety"} component = {() => <Safety />}/>
      </div>
    </Router>
<<<<<<< HEAD
=======
=======
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes = () => (
  <Router>
    <div>
      <Route exact path = {"/"} component = {() => <Home />}/>
      <Route exact path = {"/safety"} component = {() => <Safety />}/>
      <Route exact path = {"/profPage"} component = {() => <Profile />}/>
    </div>
  </Router>
>>>>>>> 05ae0e96bd5d9eaf56aebc863ee0acfd175cccfd
=======
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
>>>>>>> debc2f45e6f0b67b63149476b44164bd96e01a06
>>>>>>> cf2f46da87a3b4c52e8e258c2b1b535077279c2f
);
export default Routes;
