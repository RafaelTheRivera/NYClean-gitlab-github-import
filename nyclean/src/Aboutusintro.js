import React, {Component} from 'react';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';
import pin from './images/pin.png';
import earthdeco from './images/earthdeco.png';
import logodisplay from './images/logodisplay.png';

class Aboutintro extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <center><h1 id = "safetyheader"><b>ABOUT US</b></h1></center>
        <img src = {earthdeco} id = "earthdeco"/>
        <p id = "hello">Hello!</p>
        <p id = "aboutuscontent">We are 4 highschool students working as a <br />
        group to reduce waste in NYC. GREENYC <br />
        is our project for the Cooper Union Summer <br />
        STEM Program, and we have been building<br />
        this website for 6 weeks, along with our <br />
        other classmates in the Computer Science<br />
        for Social Good class.</p>
        <p id = "aboutusppl">
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Ethan Gu</h3>
        <p id = "pplinfo">I'm a rising junior attending Scarsdale High School.
        I enjoy playing chess and programming. </p>
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Ian Xiong</h3>
        <p id = "pplinfo">underwateroverwatchweeb</p>
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Paige Min</h3>
        <p id = "pplinfo">Hi! I'm a rising senior attending Bergen County Academies.
        I love art and technology, and I want to use my passions to help influence
        people and the world in a positive way. </p>
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Rafael Rivera</h3>
        <p id = "pplinfo">I'm a rising senior from Regis High School. Programming has been a hobby of mine for a while, so I wanted to do something cool with it for once.</p>
        </p>
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

export default Aboutintro;
