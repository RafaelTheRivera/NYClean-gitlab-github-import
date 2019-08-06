import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import edit from './images/edit.png';
import greenyclogo from './images/greenyclogo.png';

const db = firebase.firestore();
const districts = require('./district')
var data = districts.districts[0].users[0].data
console.log(data)

class UserList extends Component {
  constructor(){
    super();
    this.state = {list:[],
                  redirect:false}
    }
    findBlankIndex(phrase){
      var arr = [];
      var count = 0;
      for (var a = 0; a<phrase.length-2; a++)
      {
        if (phrase.charAt(a) === ' ')
          count++;
        if (phrase.charAt(a) === ' ' && count === 2)
        {
          arr.push(parseFloat(phrase.substring(7, a)))
          arr.push(parseFloat(phrase.substring(a+1, phrase.length-1)))
          break;
        }
      }
      return arr;
    }
    addDocs(){
    for (var i = 0; i<100; i++)
    {
    var placesName = data[i][10]
    var placesLatLong = data[i][8]
    let addDoc = db.collection('places').add({
      name: placesName,
      lat: this.findBlankIndex(placesLatLong)[1],
      long: this.findBlankIndex(placesLatLong)[0]
    }).then(()=>{console.log("added")})
    }
    }
  componentWillMount(){
    document.body.style.overflow = "hidden";
    let display = db.collection("users").get().then((querySnapshot) => {
      console.log("got");
      querySnapshot.forEach((doc) => {
        this.setState({
          list:this.state.list.concat([doc.data().fullname])
        })
      })
    })
  }
  render(){
    const items = this.state.list.map((x) =>
      <li> {x} </li>
    )
    return (
      <div class = "appText">
      {this.addDocs()}
      <a href = "/"> <img id = "back" src = {back} alt= "back"/>
      <img id = "greenyclogo" src = {greenyclogo} alt= "logo"/>
      </a>
      <br/><br/>
      <div>
      <h3 class = "red">Error:Invalid User</h3>
      <br/>
      <h3>Here's a list of users that can be searched. (case-sensitive)</h3>
      <br/>
      <a href = './'><button id = "signout">Back to Homepage</button></a>
      <br/><br/>
      <ol class = "normalText">
      {items}
      </ol>
      </div>
      </div>
  )
}
}

export default UserList;
