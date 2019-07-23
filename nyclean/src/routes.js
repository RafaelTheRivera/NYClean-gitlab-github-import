import Safety from "./Safety/Safety";
import Profile from './Profile';
import App from './App';
import EditEmail from './EditEmail';
import EditUser from './EditUser';
import EditPass from './EditPass';
import Login from './Login';
import LoginPassEdit from './LoginPassEdit';
import LoginEmailEdit from './LoginEmailEdit';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Routes = () => (
    <Router>
      <div>
        <Route exact path = {"/"} component = {() => <App />}/>
        <Route exact path = {"/profPage"} component = {() => <Profile />}/>
        <Route exact path = {"/editEmail"} component = {() => <EditEmail />}/>
        <Route exact path = {"/editPass"} component = {() => <EditPass />}/>
        <Route exact path = {"/editUser"} component = {() => <EditUser />}/>
        <Route exact path = {"/safety"} component = {() => <Safety />}/>
        <Route exact path = {"/Login"} component = {() => <Login />}/>
        <Route exact path = {"/LoginEmailEdit"} component = {() => <LoginEmailEdit />}/>
        <Route exact path = {"/LoginPassEdit"} component = {() => <LoginPassEdit />}/>
      </div>
    </Router>

);
export default Routes;
