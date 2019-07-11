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
    <center><h1>Account Details</h1></center>
    <h3>Profile Picture</h3>
    <img src = "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg" alt = "Morgan"/>
    <p><a href = "https://www.google.com/search?q=morgan+freeman&rlz=1C1CHBD_enUS854US854&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjqg-7lva3jAhXlc98KHVSODB0Q_AUIESgC&biw=1366&bih=625&safe=active&ssui=on">Edit Profile Picture</a></p>
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
