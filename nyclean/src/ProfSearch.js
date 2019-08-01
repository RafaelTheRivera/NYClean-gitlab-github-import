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
    Totaltrash: Math.floor(Math.random()*21),
    imageSrc: null,
    userBio:'Default Text',
    name:this.props.match.params.name};
  }
  componentDidMount(){
    console.log(this.state.name)
    document.body.style.overflow = "hidden";
        const db = firebase.firestore();
        db.settings ({
          timestampsInSnapshots: true
        });
        const userRef = db.collection("users");
        let findUser = userRef.where('fullname', '==', this.state.name.substring(1)).get().then((snapshot) => {
          snapshot.forEach(doc => {
            if (!doc.data().bio === undefined)
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
    }
  render(){
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
        <li>20 E 18th Street</li>
        <li>58 W 72nd Street</li>
        <li>103 E 8th Street</li>
      </ol>


    </div>
    </div>
  );
  }
}

export default ProfSearch;
