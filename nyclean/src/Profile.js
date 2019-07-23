import React, {Component} from 'react';
import Header from './Universal/header';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';

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
    <Header/>

    <header>
    <a href=".">BACK</a>
    </header>

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
