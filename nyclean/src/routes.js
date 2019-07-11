import Home from "./Home/Home";
import Safety from "./Safety/Safety";
import Profile from './Profile';
<<<<<<< HEAD
import Home from './Home';
import Edit from './Edit';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Routes = () => (
    <Router>
      <div>
        <Route exact path = {"/"} component = {() => <Home />}/>
        <Route exact path = {"/profPage"} component = {() => <Profile />}/>
        <Route exact path = {"/Edit"} component = {() => <Edit />}/>
      </div>
    </Router>
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
);

export default Routes;
