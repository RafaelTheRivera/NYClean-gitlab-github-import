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
    if(!this.state.signedIn)
      return <Redirect to='/intro' />
    console.log("redirect")
  }
  shouldComponentUpdate = () =>{
    return false
  }
  render(){
    console.log("Render call on Bubble");
    if (this.state.signedIn){
      return(

        <div id="mainpage" style = {{overflow: "hidden"}}>

          <Bubble/>
          <footer>
            <center><a href = "/introsignout"><button id = "signout" className = "small">SIGN OUT</button></a></center>

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
