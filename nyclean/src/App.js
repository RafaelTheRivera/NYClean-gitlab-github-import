import React, {Component} from 'react';
import Header from './Universal/header.js';
import './App.css';
import footergradient from './images/footergradient.png';
import Map from './Universal/map.js'
import Bubble from './Universal/bubble.js';
import { Redirect } from 'react-router-dom';
import firebase from './Firestore';

class App extends Component {
  constructor(){
    super();
    this.state = {signedIn:true};
  }
  signOut = () => firebase.auth().signOut().then( () => {
    this.setState({
      signedIn: false,
      currentUser: null
    });
  });

  componentWillMount(){
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
    document.body.style.overflow = "hidden";
>>>>>>> e0d9b67d5882adfff29a42245f9c525b9fa3e2a6
>>>>>>> c0d69099b2b033901bf3d7f828c40f77f36a990a
>>>>>>> 0b4b3a7ac94e62ae1142c5f5833ff7bf81148626
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
  renderRedirect = () => {
      return <Redirect to='/Login' />
  }
  render(){
    if (this.state.signedIn){
      return(

        <div style = {{overflow: "hidden"}}>

          <Header />

          <Bubble />

          <div id="rectangle"></div>
          <Map />
          <footer>
<<<<<<< HEAD
            <img id = "footergradient" src = {footergradient} alt = {"footergradient"}/>
            <button onClick = {this.signOut}>Sign Out</button>
            <a class = "linkText" id = "safety" href="./safety">Safety Information</a>
=======
            <div id = "safetytab"></div>
            <button onClick = {this.signOut}>Sign Out</button>
            <a id = "safety" href="./safety">Safety Information</a>
>>>>>>> 0b4b3a7ac94e62ae1142c5f5833ff7bf81148626
          </footer>


        </div>
      );
    }
    else if (!this.state.signedIn){
      return(
        <div>
        {this.renderRedirect()}
        </div>
      );
    }
  }
}

export default App;
