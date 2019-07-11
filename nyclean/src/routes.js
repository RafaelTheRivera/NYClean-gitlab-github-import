import App from './App/App';
import Second from './SecondPage/Second.js';
import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const Routes = () => (
  <Router>
    <div>
      <Route exact path={"/"} component={() => <App />}/>
      <Route exact path={"/second"} component={() => <Second />}/>
    </div>
  </Router>
);

export default Routes;
