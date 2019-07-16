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
        <div class = "circle" id="circle-1"></div>
        <div class = "circle" id="circle-2"></div>
        <div class = "circle" id="circle-3"></div>
        <div class = "circle" id="circle-4"></div>
        <footer>
        <a href="./safety">Safety Information</a>
        </footer>
      </div>
    );
  }
}

export default App;
