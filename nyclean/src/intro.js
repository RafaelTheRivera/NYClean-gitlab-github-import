import React, {Component} from 'react';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';
import pin from './images/pin.png';
import sdg11 from './images/sdg11.png';
import sdg13 from './images/sdg13.png';
import earthdeco from './images/earthdeco.png';
import logodisplay from './images/logodisplay.png';
import greenyc from './images/greenyc.png';
import introbg from './images/introbg.png';
import Aboutintro from './Aboutusintro';
import Missionintro from './Missionintro';
import { Redirect } from 'react-router-dom';

class Introduction extends Component {
  constructor(){
    super();
    this.state = {};
  }
  renderRedirect = () => {
    return <Redirect to='/Login'/>
  }
  render(){
    return(

      <div id = "intropage">
      <img id = "introbg" src = {introbg}/>
      <img id = "intrologo" src = {greenyc}/>
      <p id = "scrolldown"> <small>SCROLL FOR MORE INFORMATION</small></p>
      <img id = "down" src = {back}/>

      <a href = "/login"><br/><center><button id = "introbutton" >REGISTER/SIGN IN</button></center></a><br/><br/>
      <div id = "aboutintro"><Aboutintro /></div>

      <div id = "missionintro"><Missionintro /></div>


      </div>
    );
  }
}
export default Introduction;
