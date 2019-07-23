import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import edit from './images/edit.png';

import greenyclogo from './images/greenyclogo.png';
const db = firebase.firestore();


class Profile extends Component {
  constructor(){
    super();
    this.state = {userName:"",
    Totaltrash:20,
    imageSrc: null,
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
          if(getDoc.data().imageSrc == null) {
            userRef.doc(user.uid).update({
              imageSrc: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            })
          }

          this.setState({
            imageSrc: getDoc.data().imageSrc
          })
        console.log(this.state.imageSrc);
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


    <center><h1 id = "safetyheader">MY PROFILE</h1></center>
    <h2 id = "username">{this.state.userName} <a href = "/EditUser" class = "linkText1"><img className = "edit" src = {edit} alt = "edit"/></a></h2>
    <br /><br />
    <h6 id = "profLinks">
    <p><br />{this.state.userBio}
    <a href = "/EditBio" class = "linkText"><img className = "edit" src = {edit} alt = "edit"/></a></p>
    <br/>
    <a href = "/EditEmail" class ="linkText">Change Email</a><br/>
    <a href = "/EditPass" class = "linkText">Change Password</a><br/>
    </h6>
    <div id="profilecircle">
    <img src = {this.state.imageSrc} id = "profileimg"/>
          <p>Change Profile Picture:</p><form onSubmit = {this.submitInput}>
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
