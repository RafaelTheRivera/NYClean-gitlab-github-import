import React, {Component} from 'react';
import Header from './Universal/header.js';
import './App.css';
import pin from './images/pinicon.png';
import feed from './images/feedicon.png';
import leader from './images/leadericon.png';
import friends from './images/friendsicon.png';
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
        <img id = "pin" src = {pin} alt = {"pin"}/>
        <img id = "feed" src = {feed} alt = {"feed"}/>
        <img id = "leader" src = {leader} alt = {"leaderboard"}/>
        <img id = "friends" src = {friends} alt = {"friends"}/>
        <footer>
        <a href="./safety">Safety Information</a>
        </footer>
      </div>
    );
  }
}

export default App;
