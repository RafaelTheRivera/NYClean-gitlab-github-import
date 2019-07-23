import React, {Component} from 'react';
import Header from './Universal/header';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';
const db = firebase.firestore();

class Profile extends Component {
  constructor(){
    super();
    this.state = {userName:"username",
    Totaltrash:20,
    imageSrc: "",
    imageInput: '',
    userBio:'',
    signedIn:true};
  }
  updateInput = e => {
      this.setState({
        imageInput: e.target.value
      });
    }
  submitInput = e => {
    e.preventDefault();
    this.setState({
      imageSrc: this.state.imageInput,
  })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userRef = db.collection("users");
        userRef.doc(user.uid).update({
          imageSrc: this.state.imageSrc
        })
      }
      });
    }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({userName: user.displayName});
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
          this.setState({
            imageSrc: getDoc.data().imageSrc
          })
          if (!getDoc.exists){
            userRef.doc(user.uid).set({
              fullname: user.displayName,
              email: user.email
            });
          }
        });
      } else{
        this.setState({
          signedIn: false
        })
      }
    });
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

    <div id="profilecircle">
    <img src = {this.state.imageSrc} id = "profileimg"/>
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
    <h2 id = "username">{this.state.userName}</h2>
    <h6><a href = "/EditEmail" class ="linkText">Change Email</a><br></br>
    <a href = "/EditPass" class = "linkText">Change Password</a><br></br>
    <a href = "/EditUser" class = "linkText">Change Username</a></h6>

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
}

export default Profile;
