import Home from "./Home/Home";
import Safety from "./Safety/Safety";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes = () => (
  <Router>
    <div>
      <Route exact path = {"/"} component = {() => <Home />}/>
      <Route exact path = {"/safety"} component = {() => <Safety />}/>
    </div>
  </Router>
);

export default Routes;
