import React, {Component} from 'react';
import './App.css';
import firebase from './Firestore'
import { Redirect } from 'react-router-dom';
import back from './images/back.png';
import edit from './images/edit.png';
import greenyclogo from './images/greenyclogo.png';

const db = firebase.firestore();


class UserList extends Component {
  constructor(){
    super();
    this.state = {list:[],
                  redirect:false}
    }
  componentWillMount(){
    document.body.style.overflow = "hidden";
    let display = db.collection("users").get().then((querySnapshot) => {
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
