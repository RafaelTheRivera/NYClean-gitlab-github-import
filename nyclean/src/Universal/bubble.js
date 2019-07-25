import React, {Component} from 'react';
import './../App.css';
import L from 'leaflet';
import headergradient from './../images/headergradient.png';
import firebase from './../Firestore';
import greenyc from './../images/greenyc.png';
import pin from './../images/pinicon1.png';
import feed from './../images/feedicon1.png';
import leader from './../images/leadericon1.png';
import friends from './../images/friendsicon1.png';
import emptypinicon from './../images/emptypinicon.png';
import emptypin from './../images/pin.png';
import add from './../images/add.png';
import cover from './../images/cover.png';
import safetyicon from './../images/safetyicon.png';
import Tabs from 'react-bootstrap/Tabs';

const db = firebase.firestore();
db.settings ({
  timestampsInSnapshots: true
})

const userRef = db.collection("users");

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
                  y: 0,
                  username: "",
                  profileWidth: "",
                  height:null,
                  search: "",
                  lat: 40.748440,
                  long: -73.985664,
                  imgsrc:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                  totalPins:0,
                  newMark: null,
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
      this.componentDidMount = this.componentDidMount.bind(this);
      this.getSearch = this.getSearch.bind(this);
    }
  componentDidMount(){
    window.addEventListener("resize", this.updateDimensions);
    this.height = this.state.height - 40;
    this.corner1 = L.latLng(40.4079549, -74.5768574);
    this.corner2 = L.latLng(41.0210528, -73.5697356);
    this.bounds = L.latLngBounds(this.corner1, this.corner2);
    this.overlayCoords = [
                    [[41.3618319, -75.2051234],[41.469047, -72.2873209],[39.7803319, -72.3759987],[39.4415253, -77.2803378]], // outer ring
                    [[40.9174387, -73.9182608],[40.9036805, -73.8616911],[40.9101667, -73.8529897],
                    [40.9047576, -73.8403284], [40.8964564, -73.8370143], [40.8769762, -73.7574783], [40.7915645, -73.7683374], [40.7534296, -73.7008563],
                    [40.7387889, -73.6995021], [40.7270097, -73.7079006], [40.7206274, -73.727728], [40.6524473, -73.7232974], [40.5938638, -73.7365575],
                    [40.5387046, -73.9406415], [40.4925961, -74.2546212], [40.513526, -74.258347], [40.5210896, -74.2461042], [40.5533506, -74.2497042],
                    [40.5581952, -74.216163], [40.6308063, -74.2023198], [40.6464677, -74.1808265], [40.6423436, -74.1423563], [40.6517223,-74.0660873]] // hole
                  ];
    this.map = L.map('map', {
      center: [40.7280822, -73.9937973],
      zoom: 16,
      minZoom:11,
      maxZoom: 20,
      maxBounds: this.bounds,
      zoomSnap: 0.2,
      layers: [
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	         attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        }),
        L.polygon(this.overlayCoords, {color: "#28BBB4", fillOpacity: .2, stroke: false})
      ]
    });
    window.addEventListener("resize", this.updateDimensions);
  }
   handleMouseMove(e){
     if(this.state.dragEvent === true){
       this.setState({x: e.clientX-7, y: e.clientY - 27});
     }
   }
  componentWillMount(){
    document.body.onmousedown = this.mouseDown;
    document.body.onmouseup = this.mouseUp;
    document.body.onmousemove = this.handleMouseMove.bind(this);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userRef.doc(user.uid).get().then(getDoc => {
        if (getDoc.data() === undefined ){
          userRef.doc(user.uid).update({
            imageSrc: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          })

        }
        userRef.doc(user.uid).get().then(getDoc => {
        this.setState({
            imgsrc: getDoc.data().imageSrc
          });
        })
          console.log("srcset")
          console.log(this.state.imgsrc)
      })
      this.setState({username: user.displayName,
                  profileWidth: user.displayName.length * 8.5 + 50 + "px"});
    }});
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateSearchBar = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  getSearch = e => {
    //find search results based on updateSearchBar
    //note: must call the search results bar
    e.preventDefault();
    const search = this.state.search;
    const ref = firebase.database().ref('/locations/CSYIxNTBYIDwLadcLtrz');
    //program function to find distances based on an inputted location and search coordinates
    let query = null;
    ref.once("value", function(snapshot){
      console.log(snapshot.val())
      query = snapshot.val()
      console.log(query)
    })
    let lat = query
    let long = query
    this.setState({lat: lat, long: long});
    this.map.flyTo([40.798440, -73.995664], 16);
  }
  updateDimensions() {
   var w = window;
   var d = document;
   var documentElement = d.documentElement;
   var body = d.getElementsByTagName('body')[0];
   var height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
   this.setState({height: height});
 }
  mouseDown(e){
    this.setState({mouseDown: 1});
    this.setState({x: e.screenX - 7, y: e.screenY - 96});
    if (this.state.mouseLeavePin === false ){
      this.setState({dragEvent: true, unmergedImages: "visible"});
    }
  }
  mouseUp(e){
    this.setState({mouseDown: 0});
    if (this.state.mouseLeavePin === true && this.state.dragEvent === true){
      console.log(this.state.newMark)
      if(this.state.totalPins > 0){
        this.map.removeLayer(this.state.newMark);
      }
      this.setState({totalPins: this.state.totalPins + 1});
      console.log(this.state.totalPins);
      var coords = this.map.mouseEventToLatLng(e);
      console.log(coords);
      this.setState({newMark: L.marker(coords).addTo(this.map).bindPopup("<div id = 'editPopup'><p id = 'newPostHead'>New Post</p><div id = 'tab1'> Text</div> Pictures</div><div id = 'pinbody'><p id = 'poster'>Posted by: " + this.state.username + "</p><textarea id = 'bodyText' placeholder = 'Write something!'></textarea></div></div>").openPopup()});
      const map = this.map;
      const state = this.state;
      this.state.newMark.on('popupclose', function(){
        map.removeLayer(state.newMark);
      });
      this.map.flyTo(coords);
      this.setState({dragEvent: false, unmergedImages: "hidden"});
    }else if (this.state.dragEvent === false){
      this.setState({dragEvent: false, unmergedImages: "hidden"});
    }else if (this.state.mouseLeavePin === false){
      this.openPin();
      this.setState({dragEvent: false, unmergedImages: "hidden"});
    }
  }
  mouseEnterPin(){
    this.setState({mouseLeavePin: false});
  }
  mouseExitPin(){
    this.setState({mouseLeavePin: true});
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
        <img id = "bigHeader" src = {headergradient} alt = {"topgradient"}/>
          <div className= "headerItem" id = "logo">
            <a href = "/"> <img id = "greenyc" src = {greenyc} alt= "logo"/> </a>
          </div>
            <form onSubmit = {this.getSearch}>
              <div className= "headerItem" id = "search">
                <input
                  type = "text"
                  id="box"
                  name = "search"
                  placeholder = " Search..."
                  onChange = {this.updateSearchBar}
                  value = {this.state.search}></input>
                <button type = "submit" id="submit" className= "headerItem">
                  <img alt="" src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying"/>
                </button>
              </div>
            </form>
          <a href = "./profpage">
            <div className= "headerItem" id = "login" style = {{width: this.state.profileWidth}}>
              <span id="rogueText">{this.state.username}</span>
              <img alt="" id = "profilepic" src = {this.state.imgsrc}/>
            </div>

          </a>

        <img id = "emptypin" src = {emptypin} draggable = "false" alt = {"solopin"} style = {{visibility: this.state.unmergedImages, top: this.state.y, left: this.state.x}}/>
        <img id = "emptypinicon" src = {emptypinicon} draggable = "false" onMouseLeave = {this.mouseExitPin} onMouseOver = {this.mouseEnterPin} alt = {"empty pin"} style = {{visibility: this.state.unmergedImages}}/>
        <img id = "pin" src = {pin} alt = {"pin"} draggable = "false" onMouseLeave = {this.mouseExitPin} onMouseOver = {this.mouseEnterPin}/>
          <span style = {{visibility: this.state.pinIsOpen}}>
            <div className = "connector" id = "con1">
            </div>
            <div className = "blocker" id = "blo1">
            </div>
            <div className = "bubble" id = "bub1">
              <p className = "small">Post by: paige
              <center><div id="insertimage">

              <img src = {this.state.imageSrc} alt = {"profile"}/>
                    <form onSubmit = {this.submitInput}>
                    <input
                    type = "images"
                    name = "profilePic"
                    placeholder = "Image URL"
                    onChange = {this.updateInput}
                    value = {this.state.imageSrc}
                    />
                    <button type = "submit">Submit</button>
                    </form>
              </div></center>
              Insert caption here</p>
              <img id = "add" src = {add} alt = "add poster"/>
            </div>
            <img className = "cover" id = "cover1" src = {cover} alt = "cover"/>
          </span>
        <img id = "feed" src = {feed} alt = {"feed"} onClick = {this.openFeed}/>
          <span style = {{visibility: this.state.feedIsOpen}}>

            <div className = "connector" id = "con2">
            </div>
            <div className = "blocker" id = "blo2">
            </div>
            <div className = "bubble" id = "bub2">
            </div>
            <img className = "cover" id = "cover2" src = {cover} alt = "cover"/>

          </span>

        <img id = "leader" src = {leader} alt = {"leaderboard"} onClick = {this.openLeader}/>
          <span style = {{visibility: this.state.leaderIsOpen}}>
            <div className = "connector" id = "con3">
            </div>
            <div className = "blocker" id = "blo3">
            </div>
            <div className = "bubble" id = "bub3">
            <center><p id = "totalcount">TOTAL COUNT</p> <p id = "livecount"><b>12,345</b> lbs</p> <br />
            Weekly Leaderboard</center>
            <br />
            <p className = "small"><ol>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
              <li>user 123 lbs</li>
            </ol></p>
            </div>
            <img className = "cover" id = "cover3" src = {cover} alt = "cover"/>
          </span>
        <img id = "friends" src = {friends} alt = {"friends"} onClick = {this.openFriends}  style = {{marginTop: this.state.height - 119}}/>
          <span style = {{visibility: this.state.friendsIsOpen}}>
            <div className = "connector" id = "con4" style = {{top: this.state.height - 119}}>
            </div>
            <div className = "blocker" id = "blo4" style = {{top: this.state.height - 116.5}}>
            </div>
            <div className = "bubble" id = "bub4" style = {{top: this.state.height - 379}}>
            </div>
            <img className = "cover" id = "cover4" src = {cover} alt = "cover"/>

          </span>
        <a href = "./safety"><img id = "safetyicon" src = {safetyicon} alt = {"safety"}  style = {{marginTop: this.state.height - 179}}/></a>

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
 crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
  integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
  crossOrigin=""></script>
        <div id="map" style = {{height: this.state.height - 40}}></div>
      </div>
    );
  }
}
export default Bubble;
