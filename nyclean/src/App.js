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
  signOut = () => firebase.auth().signOut().then( () => {
    this.setState({
      redirect:true,
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
  renderRedirect1 = () => {
    if(this.state.redirect)
      return <Redirect to='/introsignout' />
  }
  render(){
    if (this.state.redirect){
      return(
        <div>
        {this.renderRedirect1()}
        </div>
      )
    }
    else if (!this.state.signedIn)
    {
      return(
        <div>
        {this.renderRedirect()}
        </div>
      )
    }
    if (this.state.signedIn){
      return(

        <div style = {{overflow: "hidden"}}>

          <Bubble />


          <footer>
            <button id = "signout" className = "small" onClick = {this.signOut}>SIGN OUT</button>
          </footer>

        </div>
      );
    }
  }
}

export default App;
