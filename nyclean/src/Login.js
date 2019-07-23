import React, {Component} from 'react';
import firebase from './Firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import './App.css';

const uiConfig = {
  signInFlow: 'popup' ,   //or can be redirect instead
  //signInSuccessfulUrl: '/' ,    //once ur signed in u will b redirected back to link of choice
  callbacks: {
    signInSuccessWithAuthResult: () => false      //avoiding redirects after sign in
  },

  signInOptions: [        //options to sign in thru other platforms
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};


class Login extends Component {

  constructor(){
    super();
    this.state = {signedIn:false, currentUser: null};
  }
  renderRedirect = () => {
      return <Redirect to='/' />
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

  signOut = () => firebase.auth().signOut().then( () => {
    this.setState({
      signedIn: false,
      currentUser: null
    });
  });

  render(){
    if(this.state.signedIn) {
      console.log('true')
      return(
        <div>
        {this.renderRedirect()}
        </div>
      );
    }else {
      console.log('false')
      return(
        <div>
          <br /><br /><br /><h1><center class = "normalText">Please Log In/Sign Up</center></h1>
          <StyledFirebaseAuth uiConfig = {uiConfig} firebaseAuth = {firebase.auth()}/>
        </div>
      );
    }
  }
}

export default Login;
