import React, {Component} from 'react';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';
import pin from './images/pin.png';
import earthdeco from './images/earthdeco.png';
import logodisplay from './images/logodisplay.png';

class About extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <a href = "/"> <img id = "back" src = {back} alt= "back"/>
        <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
        </a>
        <center><h1 id = "safetyheader"><b>ABOUT US</b></h1></center>
        <img src = {earthdeco} id = "earthdeco"/>
        <p id = "hello">Hello!</p>
        <p id = "aboutuscontent">We are 4 students working as a <br />
        group to reduce waste in NYC. GREENYC <br />
        is our project.</p>
        <p id = "aboutusppl">
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Ethan Gu</h3>
        
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Ian Xiong</h3>
        
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Paige Min</h3>
        
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Rafael Rivera</h3>
        
        <img id = "logodisplay" src = {logodisplay} />
        <p id = "logodescribe">This is our GREENYC logo and 2 different variations of our GREENYC icon.
        The stylized "N" means that NYC can become green! We hope our website can be a step towards that goal.
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />


        </p>


      </div>

    );
  }
}

export default About;
