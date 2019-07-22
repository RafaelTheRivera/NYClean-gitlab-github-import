import React, {Component} from 'react';
import Header from './Universal/header.js'
import './App.css';

class Home extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
  return (
    <div>
    <Header />
    <p>Home!</p>
    </div>
  );
  }
}

export default Home;
