import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import edit from './images/edit.png';
import greenyclogo from './images/greenyclogo.png';

const db = firebase.firestore();

class ProfSearch extends Component {
  constructor(props){
    super(props);
    this.state = {userName:"",
    Totaltrash:0,
    imageSrc: null,
    pinList:[],
    userBio:'Default Text',
    name:this.props.match.params.name};
  }
  getPins = () => {
    db.collection("pins").get().then((querySnapshot) => {
      console.log("got");
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
    console.log(this.state.name)
    document.body.style.overflow = "hidden";
        const db = firebase.firestore();
        db.settings ({
          timestampsInSnapshots: true
        });
        const userRef = db.collection("users");
        let findUser = userRef.where('fullname', '==', this.state.name.substring(1)).get().then((snapshot) => {
          console.log("got");
          snapshot.forEach(doc => {
            console.log(this.state.name)
            if (!(doc.data().bio === undefined))
            {
              this.setState({
                userBio:doc.data().bio
              })
            }
            this.setState({
              Totaltrash:doc.data().Totaltrash,
              userName:doc.data().fullname,
              imageSrc:doc.data().imageSrc
            })
          })
        })
        this.getPins();
    }
  render(){
    var noPins = ""
    var pins = this.state.pinList.map((x) =>
      <li><p class = "normalTextPins" id = "leftleader">lat: {x.lat} <br/>lng: {x.long}</p></li>)
    if (pins.length === 0)
  {
    noPins = "No Pins Set"
  }
  return (
    <div class = "appText">
    <a href = "/"> <img id = "back" src = {back} alt= "back"/>
    <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
    </a>
    <center><h1 id = "safetyheader">{this.state.userName}'s Profile</h1></center>
    <h2 id = "username">{this.state.userName}</h2>
    <br /><br />
    <h6 id = "profLinks">
    <p><br />{this.state.userBio}</p>
    <br/>
    </h6>
    <div id="profilecircle">
    <img alt = "" src = {this.state.imageSrc} id = "profileimg"/>
    </div>

    <div id="profilepin">

      <h3>Trash Count: {this.state.Totaltrash} lbs</h3>
      <h3>Pins:</h3>
      <ol>
      {pins}
      </ol>
      <p class ="normalText" id = "leftleader">{noPins}</p>
      </div>
    </div>
  );
  }
}

export default ProfSearch;
