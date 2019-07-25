import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import greenyclogo from './images/greenyclogo.png';

const db = firebase.firestore();
db.settings ({
  timestampsInSnapshots: true
});

class EditBio extends Component {
  constructor(){
    super();
    this.state = {userBio:"", currentUser:null};
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
        userBio:event.target.value
      });
  }
  changeBio = () => {
    // e.preventDefault();
    const user = firebase.auth().currentUser;
    const userRef = db.collection("users");
    userRef.doc(user.uid).update({
      bio: this.state.userBio
    }).then(() => {
        this.setState({
          changed:true
        });
  });
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
    <br></br>
    <p id = "Indent1">Bio:</p>
    <br></br>
    <form class = "editUserBar" onSubmit={e=>e.preventDefault()} id = "Indent1">
    <textarea type = "text"
    onChange = {this.handleChange}
    value = {this.state.userBio}
    rows = "5"
    cols = "50"
    />
    <button onClick={this.changeBio}>Change</button>
    </form>
    {this.renderRedirect()}
    </div>
    </div>
  );
} else {
  return(
  <div class = "appText">
  <br></br>
  <p id = "Indent1">Bio:</p>
  <br></br>
  <form class = "editUserBar" onSubmit={e=>e.preventDefault()} id = "Indent1">
  <textarea type = "text"
  rows = "5"
  cols = "50"
  onChange = {this.handleChange}
  value = {this.state.userBio}
  /><br />
  <button onClick={this.changeBio}>Change</button>
  </form>
  </div>
);
}
}
}

export default EditBio;
