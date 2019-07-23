import React, {Component} from 'react';
import './App.css';
import footergradient from './images/footergradient.png';
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
  renderRedirect = () => {
      return <Redirect to='/Login' />
  }
  render(){
    if (this.state.signedIn){
      return(

        <div style = {{overflow: "hidden"}}>

          <Bubble />

          <div id="rectangle"></div>

          <footer>
            <button id = "signout" className = "small" onClick = {this.signOut}>SIGN OUT</button>
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
