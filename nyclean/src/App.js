import React, {Component} from 'react';
import Header from './Universal/header.js';
import './App.css';
import Bubble from './Universal/bubble.js';

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
        <Bubble />
        <footer>
        <a href="./safety">Safety Information</a>
        </footer>
      </div>
    );
  }
}

export default App;
