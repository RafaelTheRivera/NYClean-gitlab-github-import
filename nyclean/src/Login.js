import React, {Component} from 'react';
import firebase from './Firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup' ,   //or can be redirect instead
  signInSuccessfulUrl: '/' ,    //once ur signed in u will b redirected back to link of choice
  callbacks: {
    signInSuccessWithAuthResult: () => false      //avoiding redirects after sign in
  },

  signInOptions: [        //options to sign in thru other platforms
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
};


class Login extends Component {

  constructor(){
    super();
    this.state = {signedIn: false, currentUser: null};
  }

  componentWillMount(){
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
      return(
        <div>
          <p>Hello {this.state.currentUser.displayName}.</p>
          <a href = "/"><p class = "linkText">Homepage</p></a>
        </div>
      );
    }else {
      return(
        <div>
          <h1>Please sign in</h1>
          <StyledFirebaseAuth uiConfig = {uiConfig} firebaseAuth = {firebase.auth()}/>
        </div>
      );
    }
  }
}

export default Login;
