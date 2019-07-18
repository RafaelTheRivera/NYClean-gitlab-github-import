import React, {Component} from 'react';
import './App.css';
import Header from './Universal/header'
import firebase from './Firestore'

class EditUser extends Component {
  constructor(){
    super();
    this.state = {userName:"", currentUser:""};
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (this.state.signedIn) {
        console.log('yes')
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
      } else {
        console.log('no')
    }
    });
  }
  handleChange = (event) => {
      this.setState({
        userName:event.target.value
      });
      this.changeEmail("rtdrtd", this.state.userName)
  }
  reauthenticate = (currentPassword) => {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
  }
  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        console.log("Email updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }
  render(){
  return (
    <div class = "appText">
    <Header /><br></br><br></br>
    <form class = "editUserBar">New Username: <input type = "text" onChange = {this.handleChange} value = {this.state.userName}></input>
    <button type = "submit">Change</button>
    </form>
    </div>
  );
  }
}

export default EditUser;
