import React, {Component} from 'react';
import Header from './Universal/header.js';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <Header />
        <div id="rectangle"></div>
        <div id="circle"></div>
        <footer>
        <a href="./safety">Safety Information</a>
        </footer>
      </div>
    );
  }
}

export default App;
