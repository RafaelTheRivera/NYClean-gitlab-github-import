import React, {Component} from 'react';
import './Home.css';

class Home extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <header></header>
        <body>
        <div id="rectangle"></div>
        <div id="circle"></div>
        </body>
        <footer>
        <a href="./second">Safety Information</a>
        </footer>
      </div>
    );
  }
}

export default Home;
