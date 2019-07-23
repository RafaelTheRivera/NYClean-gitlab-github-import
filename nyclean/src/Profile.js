import React, {Component} from 'react';
import Header from './Universal/header';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';

class Profile extends Component {
  constructor(){
    super();
    this.state = {userName:"username",
    Totaltrash:20,
    imageSrc: "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg",
    imageInput: '',
    userBio:'',
    signedIn:true};
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({userName: user.displayName,
                     userBio: user.bio});
    });
    document.body.style.overflow = "hidden";
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          signedIn: true,
          currentUser: user
        });

        const db = firebase.firestore();
        db.settings ({
          timestampsInSnapshots: true
        });

        const userRef = db.collection("users");

        userRef.doc(user.uid).get().then(getDoc => {
          if (!getDoc.exists){
            userRef.doc(user.uid).set({
              fullname: user.displayName,
              email: user.email,
            });
          }
        });
        userRef.doc(user.uid).get().then(getDoc => {
            this.setState({
              userBio: getDoc.data().bio
            })
        })
      } else{
        this.setState({
          signedIn: false
        })
      }
    });
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
  renderRedirect = () => {
      return <Redirect to='/Login' />
  }
  render(){
    if (!this.state.signedIn){
      return(
        <div>
        {this.renderRedirect()}
        </div>)
      }
      else {
  return (
    <div class = "appText">

    <a href = "/"> <img id = "back" src = {back} alt= "back"/>
    <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
    </a>


    <center><h1>My Profile</h1></center>
    <h2 id = "username">{this.state.userName} <a href = "/EditUser" class = "linkText1">Change Username</a></h2>
    <br /><br /><br />
    <h6 id = "profLinks"><a href = "/EditEmail" class ="linkText">Change Email</a><br></br>
    <a href = "/EditPass" class = "linkText">Change Password</a><br></br>
    <a href = "/EditBio" class = "linkText">Edit Bio</a>
    <p>{this.state.userBio}</p>
    </h6>
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
}

export default Profile;
