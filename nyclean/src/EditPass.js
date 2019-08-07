import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import edit from './images/edit.png';
import greenyclogo from './images/greenyclogo.png';

class EditPass extends Component {
  constructor(){
    super();
    this.state = {changed: false, passWord:"", newPass:"", currentUser:null};
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
          console.log("got");
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
        this.setState({
          changed:true
        })
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }
  renderRedirect = () => {
      return <Redirect to='/profpage' />
  }
  render(){
  if (this.state.changed === true){
  return (
    <div class = "appText">
    <a href = "/profpage"> <img id = "back" src = {back} alt= "back"/>
    <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
    </a>
    <br></br><br></br>
    <form class = "editUserBar" onSubmit={e=>e.preventDefault()}>
    New Password:
    <input type = "password"
    onChange = {this.handleChange}
    value = {this.state.newPass}
    />
    <br></br>Re-enter Current Password:
    <input type = "password"
    onChange = {this.handleChangePass}
    value = {this.state.passWord}
    />
    <button onClick={this.changePass}>Change</button>
    </form>
    {this.renderRedirect()}
    </div>
  );
  }
  else {
    return(
    <div class = "appText">
    <a href = "/profpage"> <img id = "back" src = {back} alt= "back"/>
    <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
    </a>
    <br></br><br></br>
    <form class = "editUserBar" onSubmit={e=>e.preventDefault()}>
    New Password:
    <input type = "password"
    onChange = {this.handleChange}
    value = {this.state.newPass}
    /><br/><br />
    Re-enter Current Password:
    <input type = "password"
    onChange = {this.handleChangePass}
    value = {this.state.passWord}
    /><br/><br />
    <button onClick={this.changePass}>Change</button>
    </form>
    </div>
  );
  }
}}

export default EditPass;
