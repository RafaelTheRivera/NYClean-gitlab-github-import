import React, {Component} from 'react';
import './App.css';
import Header from './Universal/header'
import firebase from './Firestore'

class EditPass extends Component {
  constructor(){
    super();
    this.state = {passWord:"", newPass:"", currentUser:null};
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
        newPass:event.target.value
      });
  }
  handleChangePass = (event) => {
      this.setState({
        passWord:event.target.value
      });
  }
  changePass = () => {
    // e.preventDefault();
    const user = firebase.auth().currentUser;
    console.log(this.state.passWord);
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.passWord
    );
    user.reauthenticateWithCredential(credential).then(() => {
      user.updatePassword(this.state.newPass).then(() => {
        console.log("Pass updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }
  render(){
  return (
    <div class = "appText">
    <br></br><br></br>
    <form class = "editUserBar" onSubmit={e=>e.preventDefault()}>
    New Password:
    <input type = "text"
    onChange = {this.handleChange}
    value = {this.state.newPass}
    />
    Re-ender Current Password:
    <input type = "text"
    onChange = {this.handleChangePass}
    value = {this.state.passWord}
    />
    <button onClick={this.changePass}>Change</button>
    </form>
    </div>
  );
  }
}

export default EditPass;
