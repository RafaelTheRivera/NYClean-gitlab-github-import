import React, {Component} from 'react';
import './../App.css';
import pin from './../images/pinicon.png';
import feed from './../images/feedicon.png';
import leader from './../images/leadericon.png';
import friends from './../images/friendsicon.png';

class Bubble extends Component{
  constructor(){
    super();
    this.state = {pinIsOpen: "hidden",
                  feedIsOpen: "hidden",
                  leaderIsOpen: "hidden",
                  friendsIsOpen: "hidden",
                }
    }
  pseudoOnClick(){
    console.log("functional")
    if (this.state.pinIsOpen === "hidden"){
      this.setState({pinIsOpen: "visible"});
    }else{
      this.setState({pinIsOpen: "hidden"});
    }
  }
  render(){
    return(
      <div>
        <img id = "pin" src = {pin} alt = {"pin"} onClick = {console.log("kms")}/>
          <span style = {{visibility: this.state.pinIsOpen}}>
            <div className = "connector" id = "con1">
            </div>
            <div className = "blocker" id = "blo1">
            </div>
            <div className = "bubble" id = "bub1">
            </div>
          </span>
        <img id = "feed" src = {feed} alt = {"feed"}
            />
          <span style = {{visibility: this.state.feedIsOpen}}>
            <div className = "connector" id = "con2">
            </div>
            <div className = "blocker" id = "blo2">
            </div>
            <div className = "bubble" id = "bub2">
            </div>
          </span>
        <img id = "leader" src = {leader} alt = {"leaderboard"}
            />
          <span style = {{visibility: this.state.leaderIsOpen}}>
            <div className = "connector" id = "con3">
            </div>
            <div className = "blocker" id = "blo3">
            </div>
            <div className = "bubble" id = "bub3">
            </div>
          </span>
        <img id = "friends" src = {friends} alt = {"friends"}
            />
          <span style = {{visibility: this.state.friendsIsOpen}}>
            <div className = "connector" id = "con4">
            </div>
            <div className = "blocker" id = "blo4">
            </div>
            <div className = "bubble" id = "bub4">
            </div>
          </span>
      </div>
    );
  }
}
export default Bubble;
