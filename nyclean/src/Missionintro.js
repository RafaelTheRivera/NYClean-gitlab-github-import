import React, {Component} from 'react';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';
import pin from './images/pin.png';
import sdg11 from './images/sdg11.png';
import sdg13 from './images/sdg13.png';

class Missionintro extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <center><h1 id = "safetyheader">OUR MISSION</h1></center>

        <a href = "https://sustainabledevelopment.un.org/sdg11">
        <img src = {sdg11} className = "sdg" id = "goal11"/><br /></a>
        <a href = "https://sustainabledevelopment.un.org/sdg13">
        <img src = {sdg13} className = "sdg" id = "goal13"/></a>


        <p id = "missiontext">
        <img id = "pindeco" src = {pin} alt= "pin"/>Tackling UN Sustainable Development Goals 11 and 13<br /><br />
        <img id = "pindeco" src = {pin} alt= "pin"/>Reducing the waste on NYC Streets<br /><br />
        <img id = "pindeco" src = {pin} alt= "pin"/>Raising awareness of sustainability issues in NYC <br /><br />
        <img id = "pindeco" src = {pin} alt= "pin"/>Encouraging people to take action
        </p>
        <p id = "clickmore"><small>Click on the icons to learn more!</small></p>
    </div>
    );
  }
}

export default Missionintro;
