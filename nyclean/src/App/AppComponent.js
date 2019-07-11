import React, {Component} from 'react';
import './App.css';

class AppComponent extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <p>This is a component that is nested inside another.</p>
      </div>
    );
  }
}

export default AppComponent;
