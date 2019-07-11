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
        <br/>
        <p>This is what the very first page of my app looks like.</p>
      </div>
    );
  }
}

export default App;
