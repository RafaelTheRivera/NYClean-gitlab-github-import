import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import edit from './images/edit.png';
import greenyclogo from './images/greenyclogo.png';

class EditUser extends Component {
  constructor(){
    super();
    this.state = {displayName:"", currentUser:null};
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
        displayName:event.target.value
      });
  }
  changeUser = () => {
    // e.preventDefault();
    const user = firebase.auth().currentUser;
      user.updateProfile({
      displayName: this.state.displayName}).then(() => {
        console.log("Name updated!");
        this.setState({
          changed:true
        })
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
    New Username:
    <input type = "text"
    onChange = {this.handleChange}
    value = {this.state.displayName}
    />
    <button onClick={this.changeUser}>Change</button>
    </form>
    {this.renderRedirect()}
    </div>
  );
} else {
  return(
  <div class = "appText">
  <a href = "/profpage"> <img id = "back" src = {back} alt= "back"/>
  <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
  </a>
  <br></br><br></br>
  <form class = "editUserBar" onSubmit={e=>e.preventDefault()}>
  New Username:<br/><br />
  <input type = "text"
  onChange = {this.handleChange}
  value = {this.state.displayName}
  /><br/><br />
  <button onClick={this.changeUser}>Change</button>
  </form>
  </div>
);
}
}
}

export default EditUser;
