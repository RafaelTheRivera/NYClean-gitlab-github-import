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
);
export default Routes;
