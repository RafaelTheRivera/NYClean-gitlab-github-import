import React, {Component} from 'react';
import './../App.css';
import pin from './../images/pinicon1.png';
import feed from './../images/feedicon1.png';
import leader from './../images/leadericon1.png';
import friends from './../images/friendsicon1.png';
import emptypinicon from './../images/emptypinicon.png';
import emptypin from './../images/pin.png';
import add from './../images/add.png';

class Bubble extends Component{
  constructor(props){
    super(props);
    this.state = {pinIsOpen: "hidden",
                  feedIsOpen: "hidden",
                  leaderIsOpen: "hidden",
                  friendsIsOpen: "hidden",
                  unmergedImages: "hidden",
                  mouseLeavePin: true,
                  dragEvent: false,
                  mouseDown: 0,
                  x: 0,
                  y: 0
                }
      this.mouseDown = this.mouseDown.bind(this);
      this.mouseUp = this.mouseUp.bind(this);
      this.mouseEnterPin = this.mouseEnterPin.bind(this);
      this.mouseExitPin = this.mouseExitPin.bind(this);
      this.openPin = this.openPin.bind(this);
      this.openFeed = this.openFeed.bind(this);
      this.openLeader = this.openLeader.bind(this);
      this.openFriends = this.openFriends.bind(this);
      this.updateDimensions = this.updateDimensions.bind(this);
    }

  componentDidMount(){
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillMount(){
    document.body.onmousedown = this.mouseDown;
    document.body.onmouseup = this.mouseUp;
    document.body.onmousemove = this.handleMouseMove.bind(this);
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
   var w = window;
   var d = document;
   var documentElement = d.documentElement;
   var body = d.getElementsByTagName('body')[0];
   var height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
   this.setState({height: height});
 }
  handleMouseMove(e){
    if(this.state.dragEvent === true){
      this.setState({x: e.screenX - 7, y: e.screenY - 95});
    }
  }
  mouseDown(e){
    this.setState({mouseDown: 1});
    this.setState({x: e.screenX - 7, y: e.screenY - 96});
    console.log(this.state.mouseDown);
    if (this.state.mouseLeavePin === false ){
      this.setState({dragEvent: true, unmergedImages: "visible"});
      console.log("dragEvent = " + this.state.dragEvent);
    }
    console.log("down");
  }
  mouseUp(){
    this.setState({mouseDown: 0});
    console.log(this.state.mouseDown);
    if (this.state.mouseLeavePin === true && this.state.dragEvent === true){
      console.log("pinned");
      this.setState({dragEvent: false, unmergedImages: "hidden"});
      console.log("dragEvent = " + this.state.dragEvent);
    }else if (this.state.dragEvent === false){
      this.setState({dragEvent: false, unmergedImages: "hidden"});
      console.log("dragEvent = " + this.state.dragEvent);
    }else if (this.state.mouseLeavePin === false){
      this.openPin();
      this.setState({dragEvent: false, unmergedImages: "hidden"});
      console.log("dragEvent = " + this.state.dragEvent);
    }
    console.log("up");
  }
  mouseEnterPin(){
    this.setState({mouseLeavePin: false});
    console.log("in pin");
  }
  mouseExitPin(){
    this.setState({mouseLeavePin: true});
    console.log("out of pin");
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
        <img id = "emptypin" src = {emptypin} draggable = "false" alt = {"solo pin"} style = {{visibility: this.state.unmergedImages, top: this.state.y, left: this.state.x}}/>
        <img id = "emptypinicon" src = {emptypinicon} draggable = "false" onMouseLeave = {this.mouseExitPin} onMouseOver = {this.mouseEnterPin} alt = {"empty pin"} style = {{visibility: this.state.unmergedImages}}/>
        <img id = "pin" src = {pin} alt = {"pin"} draggable = "false" onMouseLeave = {this.mouseExitPin} onMouseOver = {this.mouseEnterPin}/>
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
            <center><p id = "totalcount">TOTAL COUNT</p> <p id = "livecount">12,345 lbs</p> <br />
            Weekly Leaderboard</center>
            <ol>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
            </ol>

            </div>
          </span>
        <img id = "friends" src = {friends} alt = {"friends"} onClick = {this.openFriends}  style = {{marginTop: this.state.height - 119}}/>
          <span style = {{visibility: this.state.friendsIsOpen}}>
            <div className = "connector" id = "con4" style = {{top: this.state.height - 119}}>
            </div>
            <div className = "blocker" id = "blo4" style = {{top: this.state.height - 116.5}}>
            </div>
            <div className = "bubble" id = "bub4" style = {{top: this.state.height - 379}}>
            </div>
          </span>
      </div>
    );
  }
}
export default Bubble;
