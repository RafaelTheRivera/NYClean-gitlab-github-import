import React, {Component} from 'react';
import './App.css';
import footergradient from './images/footergradient.png';
import safetyicon from './images/safetyicon.png';
import Bubble from './Universal/bubble.js';
import { Redirect } from 'react-router-dom';
import firebase from './Firestore';

class App extends Component {
  constructor(){
    super();
    this.state = {signedIn:true,
                  redirect:false};
  }
  signOut = () => {
    console.log("signed out")
    this.setState({
      redirect:true,
      signedIn: false,
      currentUser: null
    },()=>{
    firebase.auth().signOut()
  })
  }

  componentWillMount(){
    document.body.style.overflow = "hidden";
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          signedIn: true,
          currentUser: user
        });
        const db = firebase.firestore()

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
      } else{
        this.setState({
          signedIn: false
        })
      }
    });
  }
  renderRedirect = () => {
    console.log("redirect")
      return <Redirect to='/intro' />
  }
  renderRedirect1 = () => {
    console.log("redirect")
      return <Redirect to='/intro' />
  }
  render(){
    console.log("Render call on Bubble");
    if (this.state.redirect){
      return(
        <div>
          {this.renderRedirect1()}
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
    else{
      return(
        <div id="mainpage" style = {{overflow: "hidden"}}>
        {console.log(this.state.redirect)}
          <Bubble/>
          <footer>
            <center><button id = "signout" className = "small" onClick = {this.signOut}>SIGN OUT</button></center>

          </footer>

        </div>
      );
    }
  }
}

export default App;
