import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
=======
import back from './images/back.png';
>>>>>>> 28f1325f0801ffbf8c4d1f90f1014a35578756d6

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
    <div>
    <a href = "/profpage"> <img id = "back" src = {back} alt= "back"/></a>
    <div class = "appText">
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
    </div>
  );
} else {
  return(
  <div class = "appText">
  <br></br><br></br>
  <form class = "editUserBar" onSubmit={e=>e.preventDefault()}>
  New Username:
  <input type = "text"
  onChange = {this.handleChange}
  value = {this.state.displayName}
  />
  <button onClick={this.changeUser}>Change</button>
  </form>
  </div>
);
}
}
}

export default EditUser;
