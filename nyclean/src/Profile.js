import React, {Component} from 'react';
import './App.css';

class Profile extends Component {
  constructor(){
    super();
    this.state = {User:"Morgan_Freeman", Totaltrash:20};
  }
  render(){
  return (
    <div class = "appText">
    <h3>Profile Picture</h3>
    <img src = "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg" alt = "Morgan"/>
    <h3>Pins:</h3>
    <ol>
      <li>20 E 18th Street</li>
      <li>58 W 72nd Street</li>
      <li>103 E 8th Street</li>
    </ol>
    <p>Username: {this.state.User}</p>
    <p>Total trash picked up(lbs): {this.state.Totaltrash}</p>
    </div>
  );
  }
}

export default Profile;
