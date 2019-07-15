import React, {Component} from 'react';
import './App.css';
import Header from './Universal/header'

class Edit extends Component {
  constructor(){
    super();
    this.state = {userName:""};
  }
  handleChange = (event) => {
      this.setState({
        userName:event.target.value
      });
  }
  render(){
  return (
    <div class = "appText">
    <Header />
    <form class = "editUserBar" onSubmit={e=>{e.preventDefault();}}>New Username: <input type = "text" value = {this.state.userName} onChange = {this.handleChange}></input></form>
    </div>
  );
  }
}

export default Edit;
