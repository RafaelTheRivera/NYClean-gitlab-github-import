import React, {Component} from 'react';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';
import pin from './images/pin.png';
import earthdeco from './images/earthdeco.png';

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
        <p id = "aboutuscontent">We are 4 highschool students working as a <br />
        group to reduce waste in NYC. GREENYC <br />
        is our project for the Cooper Union Summer <br />
        STEM Program, and we have been building<br />
        this website for 6 weeks, along with our <br />
        other classmates in the Computer Science<br />
        for Social Good class.</p>
        <p id = "aboutusppl">
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Ethan Gu</h3>
        <p id = "pplinfo">Hello my good friends! It's me, Ethan, your favorite real-life anime boy! </p>
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Ian Xiong</h3>
        <p id = "pplinfo">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud </p>
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Paige Min</h3>
        <p id = "pplinfo">Hi! I'm a rising senior attending Bergen County Academies.
        I love art and technology, and I want to use my passions to help influence
        people and the world in a positive way. </p>
        <h3 className = "ournames"><img id = "pindeco" src = {pin} alt= "pin"/>Rafael Riveras</h3>
        <p id = "pplinfo">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud </p>
        </p>


      </div>

    );
  }
}

export default About;
