import React, {Component} from 'react';
import Header from './Universal/header';
import './App.css';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';

class Profile extends Component {
  constructor(){
    super();
    this.state = {User:"username",
    Totaltrash:20,
    imageSrc: "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg",
    imageInput: ''};
  }
  updateInput = e => {
      this.setState({
        imageInput: e.target.value
      });
    }
  submitInput = e => {
    e.preventDefault();
    this.setState({
      imageSrc: this.state.imageInput
    })
  }
  render(){
  return (
    <div class = "appText">

    <a href = "/"> <img id = "back" src = {back} alt= "back"/>
    <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
    </a>


    <center><h1>My Profile</h1></center>

    <div id="profilecircle">
    <img src = {this.state.imageSrc}/>
          <form onSubmit = {this.submitInput}>
          <input
          type = "images"
          name = "profilePic"
          placeholder = "Image URL"
          onChange = {this.updateInput}
          value = {this.state.imageSrc}
          />
          <button type = "submit">Submit</button>
          </form>
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
