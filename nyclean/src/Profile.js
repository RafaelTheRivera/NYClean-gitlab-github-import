import React, {Component} from 'react';
import Header from './Universal/header';
import './App.css';

class Profile extends Component {
  constructor(){
    super();
    this.state = {User:"username", Totaltrash:20};
  }
  render(){
  return (
    <div class = "appText">
    <Header/>

    <header>
    <a href=".">BACK</a>
    </header>

    <center><h1>My Profile</h1></center>

    <div id="profilecircle">
    <img id = "profileimg" src = "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg" alt = "Morgan"/>
    </div>

    <h2 id = "username">{this.state.User}</h2><h6><a href = "/EditUser">Change User</a><br></br><a href = "/EditPass">Change Password</a></h6>

    <p id = "bio">This is my bio. I'm really cool and I like to pick up trash.
                  I have a dog named Dog and I like chocolate ice cream.</p>

    <div id="profilepin">
      <h3>Pins:</h3>
      <ol>
        <li>20 E 18th Street</li>
        <li>58 W 72nd Street</li>
        <li>103 E 8th Street</li>
      </ol>

    <p>Trash count: {this.state.Totaltrash} lbs</p>
    </div>

    </div>
  );
  }
}

export default Profile;
