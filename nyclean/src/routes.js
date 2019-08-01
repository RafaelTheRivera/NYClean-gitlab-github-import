import Safety from "./Safety/Safety";
import Profile from './Profile';
import App from './App';
import EditEmail from './EditEmail';
import EditUser from './EditUser';
import EditPass from './EditPass';
import EditBio from './EditBio';
import Login from './Login';
import About from './Aboutus';
import Mission from './Mission';
import LoginPassEdit from './LoginPassEdit';
import LoginEmailEdit from './LoginEmailEdit';
import ProfSearch from './ProfSearch';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import Recalc from "./recalculateLeaderboard"

const Routes = () => (
    <Router>
      <div>
        <Route exact path = {"/"} component = {() => <App />}/>
        <Route exact path = {"/Mission"} component = {() => <Mission />}/>
        <Route exact path = {"/About"} component = {() => <About />}/>
        <Route exact path = {"/profPage"} component = {() => <Profile />}/>
        <Route exact path = {"/editEmail"} component = {() => <EditEmail />}/>
        <Route exact path = {"/editPass"} component = {() => <EditPass />}/>
        <Route exact path = {"/editUser"} component = {() => <EditUser />}/>
        <Route exact path = {"/editbio"} component = {() => <EditBio />}/>
        <Route exact path = {"/safety"} component = {() => <Safety />}/>
        <Route exact path = {"/Login"} component = {() => <Login />}/>
        <Route exact path = {"/LoginEmailEdit"} component = {() => <LoginEmailEdit />}/>
        <Route exact path = {"/LoginPassEdit"} component = {() => <LoginPassEdit />}/>
        <Route exact path = {"/leaderboard"} component = {() => <Leaderboard />}/>
        <Route exact path = {"/superSecretAdminRecalculate"} component = {() => <Recalc />}/>
        <Route path = "/ProfSearch/:name" component = {ProfSearch}/>

      </div>
    </Router>

);
export default Routes;
