import React, {Component} from 'react';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';
import pin from './images/pin.png';
import sdg11 from './images/sdg11.png';
import sdg13 from './images/sdg13.png';
import earthdeco from './images/earthdeco.png';
import logodisplay from './images/logodisplay.png';
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
      <div>
      <a href = "/login"><br/><center><button id = "signout" className = "large">REGISTER/SIGN IN</button></center></a><br/><br/><br/><br/><br/><br/><br/>
      <Aboutintro />
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Missionintro />
      </div>
    );
  }
}
export default Introduction;
