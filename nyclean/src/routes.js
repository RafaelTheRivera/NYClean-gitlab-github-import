import Safety from "./Safety/Safety";
import Profile from './Profile';
import App from './App';
import Edit from './Edit';
import Login from './Login';
import firebase from './Firestore';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Routes = () => (
    <Router>
      <div>
        <Route exact path = {"/"} component = {() => <App />}/>
        <Route exact path = {"/profPage"} component = {() => <Profile />}/>
        <Route exact path = {"/edit"} component = {() => <Edit />}/>
        <Route exact path = {"/safety"} component = {() => <Safety />}/>
        <Route exact path = {"/Login"} component = {() => <Login />}/>
      </div>
    </Router>

);
export default Routes;
