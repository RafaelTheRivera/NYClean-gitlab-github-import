import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import edit from './images/edit.png';
import greenyclogo from './images/greenyclogo.png';

const db = firebase.firestore();

class Profile extends Component {
  constructor(){
    super();
    this.state = {userName:"",
    Totaltrash: Math.floor(Math.random()*21),
    imageSrc: null,
    imageInput: '',
    pinList: [],
    userBio:'Default Text',
    signedIn:true};
  }
  signOut = () => firebase.auth().signOut().then( () => {
    this.setState({
      signedIn: false,
      currentUser: null
    });
  });
  updateInput = e => {
      this.setState({
        imageInput: e.target.value
      });
    }
  submitInput = e => {
    e.preventDefault();
    this.setState({
      imageSrc: this.state.imageInput,
  })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userRef = db.collection("users");
        userRef.doc(user.uid).update({
          imageSrc: this.state.imageSrc
        })
      }
      });
    }
    getPins = () => {
      db.collection("pins").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (this.state.userName === doc.data().username)
            {
              this.setState({
                pinList:this.state.pinList.concat({
                  lat:doc.data().lat,
                  long:doc.data().long})
              })
            }
        })
      })
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({userName: user.displayName,
                     userBio: user.bio});
    });
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
          if(getDoc.data().imageSrc === null || getDoc.data().imageSrc === "" || getDoc.data().imageSrc === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png") {
          userRef.doc(user.uid).update({
              imageSrc: "https://i.imgur.com/Of7XNtM.png",
              Totaltrash: 0
          })
        }
          if(getDoc.data().Totaltrash === undefined) {
            userRef.doc(user.uid).update({
              Totaltrash: this.state.Totaltrash
            })
          }
          if(getDoc.data().bio === null) {
            userRef.doc(user.uid).update({
              bio: this.state.userBio
            })
          }
        this.setState({
          imageSrc: getDoc.data().imageSrc,
          Totaltrash: getDoc.data().Totaltrash
        });
        console.log(this.state.imageSrc);
          if (!getDoc.exists){
            userRef.doc(user.uid).set({
              fullname: user.displayName,
              email: user.email,
            });
        }});
        userRef.doc(user.uid).get().then(getDoc => {
            this.setState({
              userBio: getDoc.data().bio
            })
        })
      } else{
        this.setState({
          signedIn: false
        })
      }
    });
    this.getPins();
  }

  renderRedirect = () => {
      return <Redirect to='/Login' />
  }
  render(){
    var pins = this.state.pinList.map((x) =>
      <li><p class = "normalTextPins">lat: {x.lat} <br/>lng: {x.long}</p></li>)
    if (pins.length === 0)
  {
    pins = <li><p class = "normalTextPins">no pins set</p></li>;
  }
    if (!this.state.signedIn){
      return(
        <div>
        {this.renderRedirect()}
        </div>)
      }
      else {
  return (
    <div>
    <a href = "/"> <img id = "back" src = {back} alt= "back"/>
    <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
    </a>
    <center><h1 id = "safetyheader">MY PROFILE</h1></center>
    <h2 id = "username">{this.state.userName} <a href = "/EditUser" class = "linkText1"><img className = "edit" src = {edit} alt = "edit"/></a></h2>
    <br /><br />
    <h6 id = "profLinks">
    <br /><div id = "bio">{this.state.userBio}
    <a href = "/EditBio" class = "linkText"><img className = "edit" src = {edit} alt = "edit"/></a></div>
    <br/>
    <a href = "/EditEmail" class ="linkText">Change Email</a><br/>
    <a href = "/EditPass" class = "linkText">Change Password</a><br/>
    </h6>
    <div id="profilecircle">
    <img alt = "" src = {this.state.imageSrc} id = "profileimg"/>
          <p className = "left">Change Profile Picture:</p><form onSubmit = {this.submitInput}>
          <input
          type = "text"
          placeholder = "Image URL"
          onChange = {this.updateInput}
          value = {this.state.imageSrc}
          />
          <button type = "submit">Submit</button>
          </form>
    </div>

    <div id="profilepin">

      <br/><h3>Trash Count: {this.state.Totaltrash} lbs</h3><br/><br />
      <h3>Pins:</h3>
      <ol>
      {pins}
      </ol>



    </div>
    <footer>
      <button id = "signout" className = "small" onClick = {this.signOut}>SIGN OUT</button>

    </footer>
    </div>
  );
  }
}
}

export default Profile;
