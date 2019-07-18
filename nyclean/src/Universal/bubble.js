import React, {Component} from 'react';
import './../App.css';
import pin from './../images/pinicon1.png';
import feed from './../images/feedicon1.png';
import leader from './../images/leadericon1.png';
import friends from './../images/friendsicon1.png';
import emptypinicon from './../images/emptypinicon.png';
import add from './../images/add.png';

class Bubble extends Component{
  constructor(props){
    super(props);
    this.state = {pinIsOpen: "hidden",
                  feedIsOpen: "hidden",
                  leaderIsOpen: "hidden",
                  friendsIsOpen: "hidden",
                  unmergedImages: "hidden",
                  mouseOutPin: false,
                  mouseDown: false
                }
      this.checkPinStatus = this.checkPinStatus.bind(this);
      this.mouseIsUp = this.mouseIsUp.bind(this);
      this.mouseIsDown = this.mouseIsDown.bind(this);
      this.mouseEnterPin = this.mouseEnterPin.bind(this);
      this.mouseExitPin = this.mouseExitPin.bind(this);
      this.openPin = this.openPin.bind(this);
      this.openFeed = this.openFeed.bind(this);
      this.openLeader = this.openLeader.bind(this);
      this.openFriends = this.openFriends.bind(this);
    }
  checkPinStatus(){
    if(this.state.mouseDown === true && this.state.mouseOutPin === true && this.state.pinIsOpen === "hidden"){

      console.log("pin set");
      this.setState({mouseDown: false, mouseOutPin: false})
    }
  }
  mouseIsUp(){
    this.setState({mouseDown: false});
    console.log("up");
    this.checkPinStatus();
  }
  mouseIsDown(){
    this.setState({mouseDown: true});
    console.log("down");
    this.checkPinStatus();
  }
  mouseEnterPin(){
    this.setState({mouseOutPin: true});
    console.log("in" + this.state.mouseOutPin);
    this.checkPinStatus();
  }
  mouseExitPin(){
    this.setState({mouseOutPin: false});
    console.log("out" + this.state.mouseOutPin);
    this.checkPinStatus();
  }
  openPin(){

    if (this.state.pinIsOpen === "hidden"){
      this.setState({pinIsOpen: "visible",
                    feedIsOpen: "hidden",
                    leaderIsOpen: "hidden",
                    friendsIsOpen: "hidden"});
    }else{
      this.setState({pinIsOpen: "hidden"});
    }
  }
  openFeed(){

    if (this.state.feedIsOpen === "hidden"){
      this.setState({pinIsOpen: "hidden",
                    feedIsOpen: "visible",
                    leaderIsOpen: "hidden",
                    friendsIsOpen: "hidden"});
    }else{
      this.setState({feedIsOpen: "hidden"});
    }
  }
  openLeader(){

    if (this.state.leaderIsOpen === "hidden"){
      this.setState({pinIsOpen: "hidden",
                    feedIsOpen: "hidden",
                    leaderIsOpen: "visible",
                    friendsIsOpen: "hidden"});
    }else{
      this.setState({leaderIsOpen: "hidden"});
    }
  }
  openFriends(){

    if (this.state.friendsIsOpen === "hidden"){
      this.setState({pinIsOpen: "hidden",
                    feedIsOpen: "hidden",
                    leaderIsOpen: "hidden",
                    friendsIsOpen: "visible"});
    }else{
      this.setState({friendsIsOpen: "hidden"});
    }
  }
  render(){
    return(
      <div>
        <img id = "emptypinicon" src = {emptypinicon} alt = {"empty pin"} style = {{visibility: this.state.unmergedImages}}/>
        <img id = "pin" src = {pin} alt = {"pin"} draggable = "true"
        onMouseEnter = {this.mouseEnterPin} onMouseLeave = {this.mouseExitPin} onMouseDown = {this.mouseIsDown} onMouseUp = {this.mouseIsUp} onClick = {this.openPin}/>
          <span style = {{visibility: this.state.pinIsOpen}}>
            <div className = "connector" id = "con1">
            </div>
            <div className = "blocker" id = "blo1">
            </div>
            <div className = "bubble" id = "bub1">
              Post by: paige
              <img id = "add" src = {add} alt = "addposter"/>
              <center><div id="insertimage"></div></center>
              Insert caption here

            </div>
          </span>
        <img id = "feed" src = {feed} alt = {"feed"} onClick = {this.openFeed}/>
          <span style = {{visibility: this.state.feedIsOpen}}>
            <div className = "connector" id = "con2">
            </div>
            <div className = "blocker" id = "blo2">
            </div>
            <div className = "bubble" id = "bub2">
            </div>
          </span>
        <img id = "leader" src = {leader} alt = {"leaderboard"} onClick = {this.openLeader}/>
          <span style = {{visibility: this.state.leaderIsOpen}}>
            <div className = "connector" id = "con3">
            </div>
            <div className = "blocker" id = "blo3">
            </div>
            <div className = "bubble" id = "bub3">
            Total count: 12,345 lbs <br />
            <center>Weekly Leaderboard</center>
            <ol>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
            </ol>

            </div>
          </span>
        <img id = "friends" src = {friends} alt = {"friends"} onClick = {this.openFriends}/>
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
