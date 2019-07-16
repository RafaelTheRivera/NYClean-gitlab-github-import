import React, {Component} from 'react';
import Header from './../Universal/header.js'


class Safety extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <Header />
        <header>
        <a href=".">BACK</a>
        Safety Information
        </header>
        <p> bunch of safety info</p>
        </div>
    );
  }
}

export default Safety;
