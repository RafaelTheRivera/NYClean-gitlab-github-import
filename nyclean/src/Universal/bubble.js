import React, {Component, Button} from 'react';
import './../App.css';
import L from 'leaflet';
import headergradient from './../images/headergradient.png';
import firebase from './../Firestore.js';
import greenyc from './../images/greenyc.png';
import pin from './../images/pinicon1.png';
import feed from './../images/feedicon1.png';
import leader from './../images/leadericon1.png';
import friends from './../images/friendsicon1.png';
import emptypinicon from './../images/emptypinicon.png';
import emptypin from './../images/pin.png';
import add from './../images/add.png';
import search from './../images/search.png';
import feedsubmit from './../images/feedsubmit.png';
import cover from './../images/cover.png';
import safetyicon from './../images/safetyicon.png';
import back from './../images/back.png';
import insertphoto from './../images/insertphoto.png';
import picarrowleft from './../images/picarrowleft.png';
import picarrowright from './../images/picarrowright.png';
import ourmission from './../images/ourmission.png';
import aboutus from './../images/aboutus.png';
import Tabs from 'react-bootstrap/Tabs';
import ListItem from './friendprofiles.js'
import { Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import HeatmapLayer from './../HeatmapLayer';
import { addressPoints } from './../realworld.10000.js';

const db = firebase.firestore();
db.settings ({
  timestampsInSnapshots: true
})

const userRef = db.collection("users");
const ref = db.collection("locations");
const realtime = db.collection('places');
const pinList = db.collection("pins");
/*
const getUsers = db.collection("users").get();
const getLocations = db.collection("locations").get();
const getSubways = db.collection("subways").get();
const getPins = db.collection("pins").get();
const getReports = db.collection("reports").get();
const getUpdates = db.collection("updates").get();*/

class Bubble extends Component{
  constructor(props){
    super(props);
    this.state = {pinIsOpen: "hidden",
                  feedIsOpen: "hidden",
                  leaderIsOpen: "hidden",
                  friendsIsOpen: "hidden",
                  tab1IsOpen: "hidden",
                  tab2IsOpen: "hidden",
                  FriendSearchIsOpen: "hidden",
                  FriendPageIsOpen: "hidden",
                  unmergedImages: "hidden",
                  mouseLeavePin: true,
                  dragEvent: false,
                  mouseDown: 0,
                  x: 0,
                  y: 0,
                  username: "",
                  profileWidth: "",
                  height:null,
                  width: null,
                  search: "",
                  lat: 40.748440,
                  long: -73.985664,
                  lbs: 0,
                  imgsrc:"https://i.imgur.com/Of7XNtM.png",
                  totalPins:0,
                  newMark: null,
                  dataMark: null,
                  coords: null,
                  uploadImageBefore: "",
                  uploadImageAfter: "",
                  fullname: "",
                  Totaltrash: null,
                  list: [],
                  listPins: [],
                  ActualTotalTrash: 0,
                  caption: "",
                  filelink: "",
                  userReferences: [],
                  pinupdate: false,
                  editingImage: 1,
                  image1visible: "hidden",
                  image2visible: "hidden",
                  activeFriend: "",
                  friendList: [],
                  activeBio: "",
                  activePfp: "",
                  activeTrash: "",
                  reportMessage: "",
                  userSearch:"",
                  redirect:false,
                  friendplaceHolder:"",
                  messages: [],
                  loadScreen: "opacity(100%)",
                  loadScreen2: "visible",
                  validSearch:true,
                  reports: [],
                  correctedArray: [],
                  correctedMessageTimestamps: [],
                  correctedReportArray: [],
                  correctedReportTimestamps: [],
                  greenIcon: L.icon({
                      iconUrl: emptypin,
                      iconSize:     [20, 35], // size of the icon
                      shadowSize:   [50, 64], // size of the shadow
                      iconAnchor:   [11, 34], // point of the icon which will correspond to marker's location
                      shadowAnchor: [4, 62],  // the same for the shadow
                      popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
                  }),
                  noPin: "hidden",
                  noPinOpa: "opacity(0%)"
                }
      this.mouseDown = this.mouseDown.bind(this);
      this.mouseUp = this.mouseUp.bind(this);
      this.mouseEnterPin = this.mouseEnterPin.bind(this);
      this.mouseExitPin = this.mouseExitPin.bind(this);
      this.openPin = this.openPin.bind(this);
      this.openFeed = this.openFeed.bind(this);
      this.openLeader = this.openLeader.bind(this);
      this.openFriends = this.openFriends.bind(this);
      this.opentab1 = this.opentab1.bind(this);
      this.opentab2 = this.opentab2.bind(this);
      this.openFriendSearch = this.openFriendSearch.bind(this);
      this.openFriendPage = this.openFriendPage.bind(this);
      this.updateDimensions = this.updateDimensions.bind(this);
      this.updateSearchBar = this.updateSearchBar.bind(this);
      this.updateUserSearch = this.updateUserSearch.bind(this)
      this.updateBody = this.updateBody.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.getSearch = this.getSearch.bind(this);
      this.updateCaption = this.updateCaption.bind(this);
      this.updateImage = this.updateImage.bind(this);
      this.handleArrowClick = this.handleArrowClick.bind(this);
    }
  componentDidMount(props){
    window.addEventListener("resize", this.updateDimensions);
    this.height = this.state.height - 40;
    this.corner1 = L.latLng(40.4079549, -74.3768574);
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
      zoom: 15,
      minZoom:11,
      maxZoom: 16,
      maxBounds: this.bounds,
      zoomSnap: 0.2,
      inertiaDeceleration: 7000,
      maxBoundsViscosity: 1.0,
      layers: [
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	         attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        }),
        L.polygon(this.overlayCoords, {color: "#28BBB4", fillOpacity: .2, stroke: false})
      ]
    });

    window.addEventListener("resize", this.updateDimensions);
    const setState = this.setState.bind(this);
    const map = this.map;
    const state = this.state
    const pinData = pinList.get().then(function(querySnapshot) {
        console.log("got");
        var dataArray = [];
        var totalLbs = 0;
        querySnapshot.forEach(function(doc) {
            dataArray.push(doc.data());
        });
        for (var i = 0; i < dataArray.length; i++) {
          totalLbs = totalLbs + dataArray[i].lbs;
          const dataMark =  L.marker([dataArray[i].lat,[dataArray[i].long]], {icon: state.greenIcon}).addTo(map).bindPopup("<p id = 'set'>Pin location set</p>").openPopup();
        }
        for (var i = 0; i < dataArray.length; i++) {
          const date = dataArray[i].date
          const dataMark =  L.marker([dataArray[i].lat,[dataArray[i].long]], {icon: state.greenIcon}).addTo(map).bindPopup("<div id = 'popup'><p id = 'posttitle'>Post by:  "+ dataArray[i].username +"<p id = 'date'> on "+ date.substr(0, date.indexOf("201" || "202")) +"</p></p><div id = 'controlbody'><p id = 'bodycaption'>"+ dataArray[i].body +"</p></div></div><div id='pictures'><img src = "+ dataArray[i].beforeImage +" id = 'imageBefore'/><img src = "+ dataArray[i].afterImage +" id = 'imageAfter'/></div>", {maxWidth : 600}).openPopup();
          map.closePopup();
        }
        setState({lbs: totalLbs});
    });

    var userReferences = [];
    var idStuff = [];
    userRef.get().then((querySnapshot) => {
      console.log("got");
      querySnapshot.forEach((doc) => {
        this.setState({
          list: this.state.list.concat({
            Totaltrash : doc.data().Totaltrash,
            fullname : doc.data().fullname
          })
        })
      });
      querySnapshot.forEach(function(doc){
        if(doc.data().fullname !== undefined){
          userReferences.push(doc.data().fullname);
          idStuff.push(doc.id);
          idStuff.push(doc.data().fullname);
        }
      });
          const list = userReferences.map(l =>(
             <ListItem item={l} clickFunction={this.openFriendPage}/>
           ));
        this.setState({userReferences: list,
                      idStuff: idStuff});
});


    var currentTime = Date.now();
    var currentDate = Date();
    var currentDay = currentDate.substr(0, 15);
    var currentHour = currentDate.substr(16,8);
    var messagesToday = [];
    var messageTimestamps = [];
    var reportsToday = [];
    var reportTimestamps = [];


    db.collection("reports").get().then((reportSnapshot) => {
      console.log("got");
      reportSnapshot.forEach((doc) =>{
        if(doc.data().date.substr(0,15) === currentDay){
          reportsToday.push(doc.data().username);
          reportsToday.push(doc.data().message);
          reportsToday.push(doc.data().date);
          reportsToday.push(doc.data().time);
          reportTimestamps.push(doc.data().date);
        }
      });
      var correctedReportArray = [];
      var correctedReportTimestamps = [];
      for (var i = 0; i < reportsToday.length; i = i + 4) {
        var counter = 0
        for (var j = 0; j < correctedReportArray.length; j = j + 4) {
          if (correctedReportArray[j+3] < reportsToday[i+3] || correctedReportArray === undefined){
            break;
          }
          counter = counter + 1
        }
        correctedReportArray.splice(counter * 4, 0, reportsToday[i], reportsToday[i+1], reportsToday[i+2], reportsToday[i+3]);
        correctedReportTimestamps.splice(counter, 0, reportsToday[i+2]);
      }
      const reports = correctedReportTimestamps.map(l => (
        <div className = "messageItem"><span className = "username">{correctedReportArray[correctedReportArray.indexOf(l)-2]}</span>  <span className = "timestamp">{l.substr(16,8)}</span> <br /> {correctedReportArray[correctedReportArray.indexOf(l)-1]}</div>
      ));
      this.setState({reports: reports,
                    correctedReportTimestamps: correctedReportTimestamps,
                    correctedReportArray: correctedReportArray});


    db.collection("updates").get().then((updateSnapshot) => {
      console.log("got");
      updateSnapshot.forEach((doc) =>{
        if(doc.data().date.substr(0,15) === currentDay){
          messagesToday.push(doc.data().username);
          messagesToday.push(doc.data().message);
          messagesToday.push(doc.data().date);
          messagesToday.push(doc.data().time);
          messageTimestamps.push(doc.data().date);
        }
      });
      var correctedArray = [];
      var correctedMessageTimestamps = [];
      var newest = 0;
      for (var i = 0; i < messagesToday.length; i = i + 4) {


            var updateCounter = 0
          for (var j = 0; j < correctedArray.length; j = j + 4) {
              if (correctedArray[j+3] < messagesToday[i+3] || correctedArray === undefined){
                break;
          }
          updateCounter = updateCounter + 1
        }
        correctedArray.splice(updateCounter * 4, 0, messagesToday[i], messagesToday[i+1], messagesToday[i+2], messagesToday[i+3]);
        correctedMessageTimestamps.splice(updateCounter, 0, messagesToday[i+2]);
      }
      const messages = correctedMessageTimestamps.map(l => (
        <div className = "messageItem"><span className = "username">{correctedArray[correctedArray.indexOf(l)-2]}</span>  <span className = "timestamp">{l.substr(16,8)}</span> <br /> {correctedArray[correctedArray.indexOf(l)-1]}</div>
      ));
      this.map.setView([40.7280822, -73.9937973], 16);
      this.setState({messages: messages,
                    correctedMessageTimestamps: correctedMessageTimestamps,
                    correctedArray: correctedArray,
                    loadScreen: "opacity(0%)",
                    loadScreen2: "hidden"});
      });
    });
  }
  sort_by_key(array, key)
  {
    return array.sort(function(a, b)
  {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
  }
  renderRedirect = () => {
      return <Redirect to='/profpagesearch' />
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
        //you can probably do getUser.doc(user.uid)
        userRef.doc(user.uid).get().then(getDoc => {
          console.log("got");
        if (getDoc.data() === undefined){
          userRef.doc(user.uid).update({
            imageSrc: "https://i.imgur.com/Of7XNtM.png"
          })
        }
        this.setState({
            imgsrc: getDoc.data().imageSrc
          });
      })
      this.setState({username: user.displayName,
                  profileWidth: user.displayName.length * 8.5 + 50 + "px"});
    }});
    this.updateDimensions();


  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateSearchBar(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  updateUserSearch(e){
    this.setState({
      userSearch: e.target.value
    });
  }
  updateBody(e){
    this.setState({
      body: e.target.value
    });
  }
  getPins = () => {
    pinList.get().then((querySnapshot) => {
      console.log("got");
      querySnapshot.forEach((doc) => {
          if (this.state.activeFriend === doc.data().username)
          {
            this.setState({
              listPins:this.state.listPins.concat({
                lat:doc.data().lat,
                long:doc.data().long})
            })
          }
      })
      })
}
  phraseEachUpper = (phrase) => {
    var i = 0;
      phrase = phrase.substring(i, i+1).toUpperCase() + phrase.substring(i+1, phrase.length);
    for(i; i < phrase.length; i++)
    {
      if (phrase.charAt(i) === " " && i !== phrase.length)
      {
        phrase = phrase.substring(0, i+1) + phrase.substring(i+1, i+2).toUpperCase() + phrase.substring(i+2, phrase.length);
      }
    }
    return phrase;
  }
  fly = (num1, num2, num3) =>
  {
    this.map.flyTo([num1, num2], num3)
  }
  findNumIndex(phrase){
    var arr = [];
    for (var i = 0; i<phrase.length-2; i++)
    {
      if (isNaN(phrase.substring(i, i+1)) && phrase.substring(i, i+1) != '.')
      {
        arr.push(parseFloat(phrase.substring(0, i)))
        arr.push(parseFloat(phrase.substring(i+2, phrase.length)))
        break;
      }
    }
    return arr;
  }
  getSearch = e => {
    //find search results based on updateSearchBar
    //note: must call the search results bar
    var status = 0;
    e.preventDefault();
    const search = this.state.search;
    //program function to find distances based on an inputted location and search coordinates
    let query0 = realtime.where('name', '==', search).get().then(snapshot => {
      console.log("got");
      if (snapshot.empty){
        status = 1;
      }
      snapshot.forEach(doc => {
      if (status === 0){
      let lat = doc.data().lat
      let long = doc.data().long
      this.setState({lat: lat, long: long},()=>{
        this.fly(this.state.lat, this.state.long, 16);
      });
    }})
  }).then(()=>{
    let query1 = realtime.where('name', '==', this.phraseEachUpper(search.toLowerCase())).get().then(snapshot => {
      console.log("got");
      if (snapshot.empty){
        status = 2;
      }
      snapshot.forEach(doc => {
      if (status === 1){
      let lat = doc.data().lat
      let long = doc.data().long
      this.setState({lat: lat, long: long},()=>{
        this.fly(this.state.lat, this.state.long, 16);
      });
    }})
  }).then(()=>{
  let query2 = pinList.where('username', '==', search).get().then(snapshot => {
    console.log("got");
    if (snapshot.empty){
      status = 3;
    }
    snapshot.forEach(doc => {
      if (status === 2){
        let lat = doc.data().lat
        let long = doc.data().long
        this.setState({lat: lat, long: long},()=>{
          this.fly(this.state.lat, this.state.long, 16);
        })
      }})
    }).then(()=>{
      if (status === 3 && !isNaN(this.findNumIndex(search)[0]) && !isNaN(this.findNumIndex(search)[1])){
        this.fly(this.findNumIndex(search)[0], this.findNumIndex(search)[1], 16)
      }
    })
})});
}



  updateDimensions() {
   var w = window;
   var d = document;
   var documentElement = d.documentElement;
   var body = d.getElementsByTagName('body')[0];
   var height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
   var width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
   this.setState({height: height, width: width});
 }
  mouseDown(e){
    this.setState({mouseDown: 1});
    this.setState({x: this.state.width - 50, y: 107});
    if (this.state.mouseLeavePin === false ){
      this.setState({dragEvent: true, unmergedImages: "visible"});
    }
  }
  mouseUp(e){
    this.setState({mouseDown: 0});
    if (this.state.mouseLeavePin === true && this.state.dragEvent === true){
      if(this.state.totalPins > 0){
        this.map.removeLayer(this.state.newMark);
      }
      this.setState({totalPins: this.state.totalPins + 1});
      var coords = this.map.mouseEventToLatLng(e);
      this.setState({coords: coords})
      this.setState({newMark: L.marker(coords, {icon: this.state.greenIcon}).addTo(this.map).bindPopup("<p id = 'set'>Pin location set</p>").openPopup()});
      if (this.state.pinIsOpen === "hidden"){
        this.openPin();
      }
      const map = this.map;
      const state = this.state;
      const setState = this.setState;
      this.state.newMark.on('popupclose', function(){
        if (state.pinupdate === false){
          map.removeLayer(state.newMark);
        }else{
          setState({pinupdate: true});
        }
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
                    friendsIsOpen: "hidden",
                    tab1IsOpen: "hidden",
                    tab2IsOpen: "hidden",
                    FriendSearchIsOpen: "hidden",
                    FriendPageIsOpen: "hidden",
                    image1visible: "visible"
                  });
    }else{
      this.setState({pinIsOpen: "hidden",
                    image1visible: "hidden",
                    image2visible: "hidden"});
    }
  }
  openFeed(){

    if (this.state.feedIsOpen === "hidden"){
      this.setState({tab1IsOpen: "visible",
                    pinIsOpen: "hidden",
                    feedIsOpen: "visible",
                    leaderIsOpen: "hidden",
                    friendsIsOpen: "hidden",
                    FriendSearchIsOpen: "hidden",
                    FriendPageIsOpen: "hidden",
                    image1visible: "hidden",
                    image2visible: "hidden"
                  });
    }else{
      this.setState({feedIsOpen: "hidden",
                    tab1IsOpen: "hidden",
                    tab2IsOpen: "hidden"});
    }
  }
  openLeader(){

    if (this.state.leaderIsOpen === "hidden"){
      this.setState({pinIsOpen: "hidden",
                    feedIsOpen: "hidden",
                    leaderIsOpen: "visible",
                    friendsIsOpen: "hidden",
                    tab1IsOpen: "hidden",
                    tab2IsOpen: "hidden",
                    FriendSearchIsOpen: "hidden",
                    FriendPageIsOpen: "hidden",
                    image1visible: "hidden",
                    image2visible: "hidden"
                  });
    }else{
      this.setState({leaderIsOpen: "hidden"});
    }
  }
  openFriends(){

    if (this.state.friendsIsOpen === "hidden"){
      this.setState({pinIsOpen: "hidden",
                    feedIsOpen: "hidden",
                    leaderIsOpen: "hidden",
                    friendsIsOpen: "visible",
                    tab1IsOpen: "hidden",
                    tab2IsOpen: "hidden",
                    FriendSearchIsOpen: "visible",
                    FriendProfileIsOpen: "hidden",
                    image1visible: "hidden",
                    image2visible: "hidden"
                  });
    }else{
      this.setState({friendsIsOpen: "hidden",
                    FriendSearchIsOpen: "hidden",
                    FriendPageIsOpen: "hidden"});
    }
  }

  opentab1(){

    if (this.state.tab1IsOpen === "hidden"){
      this.setState({tab1IsOpen: "visible",
                    tab2IsOpen: "hidden"});
    }
  }
  opentab2(){

    if (this.state.tab2IsOpen === "hidden"){
      this.setState({tab1IsOpen: "hidden",
                    tab2IsOpen: "visible"});
    }
  }

  openFriendSearch(){

    if (this.state.FriendSearchIsOpen === "hidden"){
      this.setState({FriendSearchIsOpen: "visible",
                    FriendPageIsOpen: "hidden",
                    activeFriend: ""});
    }
  }

  openFriendPage(name){
    var activeBio, activePfp, activeTrash;
    if (this.state.FriendPageIsOpen === "hidden"){
      this.setState({FriendSearchIsOpen: "hidden",
                    FriendPageIsOpen: "visible",
                    activeFriend: name,
                    listPins: []},()=>{
                      var id = this.state.idStuff[this.state.idStuff.indexOf(this.state.activeFriend)-1];
                      console.log(id);
                      db.collection("users").doc(id).get().then(function(doc) {
                          activeBio = doc.data().bio;
                          activePfp = doc.data().imageSrc;
                          activeTrash = doc.data().Totaltrash;
                          this.setState({activeBio: activeBio, activePfp: activePfp, activeTrash: activeTrash});
                          this.getPins();
                      }.bind(this))
                    }
                  )
    }
  }
  openFriendPage1 = e => {
    e.preventDefault();
    var count = 0;
    userRef.where('fullname', '==', this.state.userSearch).get().then(snapshot=>{
        if (snapshot.empty)
        {
          count = 1;
        }
    }).then(()=>{
      if (count === 1)
      {
        this.setState({
          friendplaceHolder:"USER NOT FOUND"
        })
      }
      if (count === 1)
        return;
      e.preventDefault();
      var activeBio, activePfp, activeTrash;
      if (this.state.FriendPageIsOpen === "hidden"){
        this.setState({FriendSearchIsOpen: "hidden",
                      FriendPageIsOpen: "visible",
                      activeFriend: this.state.userSearch,
                      listPins: []},()=>{
                        var id = this.state.idStuff[this.state.idStuff.indexOf(this.state.activeFriend)-1];
                        console.log(id);
                        db.collection("users").doc(id).get().then(function(doc) {
                            activeBio = doc.data().bio;
                            activePfp = doc.data().imageSrc;
                            activeTrash = doc.data().Totaltrash;
                            this.setState({activeBio: activeBio, activePfp: activePfp, activeTrash: activeTrash});
                            this.getPins();
                        }.bind(this))
                      }
                    )
      }
    })

  }
  updateCaption = e => {
    this.setState({caption: e.target.value});
  }
  submitCaption = e => {
    e.preventDefault();
    if(this.state.coords !== null){
      const pinData = db.collection('pins');
      pinData.doc().set({
        username: this.state.username,
        lat: this.state.coords.lat,
        long: this.state.coords.lng,
        date: Date(),
        likes: 0,
        afterImage: this.state.uploadImageAfter,
        beforeImage: this.state.uploadImageBefore,
        lbs: 3,
        body: this.state.caption
      })
      this.map.removeLayer(this.state.newMark);
      const postedMarker = L.marker([this.state.coords.lat,this.state.coords.lng], {icon: this.state.greenIcon}).addTo(this.map).bindPopup("<div id = 'popup'><p id = 'posttitle'>Post by:  "+ this.state.username +"<p id = 'date'> on "+ Date().substr(0, Date().indexOf("201" || "202")) +"</p></p><div id = 'controlbody'><p id = 'bodycaption'>"+ this.state.caption +"</p></div></div><div id='pictures'><img src = "+ this.state.uploadImageBefore +" id = 'imageBefore'/><img src = "+ this.state.uploadImageAfter +" id = 'imageAfter'/></div>", {maxWidth : 600}).openPopup();
      this.setState({caption: "", pinupdate: true, pinIsOpen: "hidden", image2visible: "hidden", image1visible: "hidden"});
    }else{
      this.setState({noPin: "visible", noPinOpa: "opacity(100%)"});
      setTimeout(function(){
        this.setState({noPin: "hidden", noPinOpa: "opacity(0%)"});
      }.bind(this), 4000);
    }
  }
  updateImage = e =>{
    if (this.state.image1visible === "visible"){
      this.setState({uploadImageBefore: e.target.value});
    }else if (this.state.image1visible === "hidden"){
      this.setState({uploadImageAfter: e.target.value});
    }
  }

  handleArrowClick(e){
      if(this.state.editingImage === 1){
        this.setState({editingImage: 2,
                      image1visible: "hidden",
                      image2visible: "visible"
                      });
      }else if (this.state.editingImage === 2){
        this.setState({editingImage: 1,
                      image1visible: "visible",
                      image2visible: "hidden"});
      }
  }

  updateUpdate = e =>{
    this.setState({
      updateMessage: e.target.value
    })
  }
  submitUpdate = e =>{
    e.preventDefault();
    const updates = db.collection("updates");
    updates.doc().set({
      username: this.state.username,
      date: Date(),
      message: this.state.updateMessage,
      time: Date.now()
    });
    var addMessage = this.state.correctedArray;
    addMessage.splice(0,0,this.state.username, this.state.updateMessage, Date(), Date.now());
    var newTimestamp = this.state.correctedMessageTimestamps;
    newTimestamp.splice(0,0,Date());
    this.setState({correctedArray: addMessage, correctedMessageTimestamps: newTimestamp},() =>{
      this.setState({messages: this.state.correctedMessageTimestamps.map(l => (
        <div className = "messageItem"><span className = "username">{this.state.correctedArray[this.state.correctedArray.indexOf(l)-2]}</span>  <span className = "timestamp">{l.substr(16,8)}</span> <br /> {this.state.correctedArray[this.state.correctedArray.indexOf(l)-1]}</div>
      ))});
    });
    var messageScroll = document.getElementById('tab1');
    messageScroll.scrollTo(0, 0);
    this.setState({
      updateMessage: ""
    });
  }
  updateReport = e =>{
    this.setState({
      reportMessage: e.target.value
    })
  }
  submitReport = e =>{
    e.preventDefault();
    const reports = db.collection("reports");
    reports.doc().set({
      username: this.state.username,
      date: Date(),
      message: this.state.reportMessage,
      time: Date.now()
    });
    var addReport = this.state.correctedReportArray;
    addReport.splice(0,0,this.state.username, this.state.reportMessage, Date(), Date.now());
    var newReportTimestamp = this.state.correctedReportTimestamps;
    newReportTimestamp.splice(0,0,Date());
    this.setState({correctedReportArray: addReport, correctedReportTimestamps: newReportTimestamp, writing: false},() =>{
      this.setState({reports: this.state.correctedReportTimestamps.map(l => (
        <div className = "messageItem"><span className = "username">{this.state.correctedReportArray[this.state.correctedReportArray.indexOf(l)-2]}</span>  <span className = "timestamp">{l.substr(16,8)}</span> <br /> {this.state.correctedReportArray[this.state.correctedReportArray.indexOf(l)-1]}</div>
      ))});
    });
    var reportScroll = document.getElementById('tab2');
    reportScroll.scrollTo(0, 0);
    this.setState({
      reportMessage: ""
    });
  }
  renderNewProfPage = e => {
    console.log('yup')
    e.preventDefault();
      let query = db.collection("users").where('fullname', '==', this.state.userSearch).get().then((querySnapshot) => {
        console.log("got");
        querySnapshot.forEach((doc) => {
          this.setState({
            redirect:true
          })
        })
      }).then(()=>{
        this.setState({
          friendplaceHolder:"USER NOT FOUND.",
          validSearch:false
        })
      })
  }
  renderRedirect = (name) => {
      let redirect1 = '/ProfSearch/:' + name;
      return <Redirect to={redirect1}/>
  }
  renderRedirect1 = () => {
    return <Redirect to='/userlist'/>
  }
  render(){
    this.state.list = this.sort_by_key(this.state.list, "Totaltrash");
    this.state.ActualTotalTrash = (this.state.list.reduce( function(cnt,o){ return cnt + o.Totaltrash; }, 0));
    this.state.list.reverse();
    const items = this.state.list.slice(0, 5).map((trash) =>
      <li> {trash.fullname}: <b>{trash.Totaltrash}</b> lbs</li>
    );
    var pins = this.state.listPins.map((x) =>
      <li><p class = "normalTextPins">lat: {x.lat} <br/>lng: {x.long}</p></li>)
    if (pins.length === 0)
  {
    pins = <li><p class = "normalTextPins">no pins set</p></li>;
  }
    if (this.state.redirect === false && this.state.validSearch === false)
    {
      return(
        <div>{this.renderRedirect1()}</div>
      )
  }
  else if (this.state.redirect === false)
  {
    return(
      <div>
      <div id = "loading" style = {{height: this.state.height, filter: this.state.loadScreen, visibility: this.state.loadScreen2}}><img src = "https://gifimage.net/wp-content/uploads/2018/04/loader-gif-images-free-download-12.gif" id = "loadingGif" alt = "" /><span id="loadingText"><small> Loading...</small></span></div>
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
                  placeholder = " Search location/pin by user/lat, long"
                  onChange = {this.updateSearchBar}
                  value = {this.state.search}></input>
                <button type = "submit" id="submit" className= "headerItem">
                </button>
              </div>
            </form>
          <a href = "./profpage">
            <div className= "headerItem" id = "login" style = {{width: this.state.profileWidth}}>
              <span id="rogueText">{this.state.username}</span>
              <img alt="" id = "profilepic" src = {this.state.imgsrc}/>
            </div>

          </a>

        <img id = "emptypin" src = {emptypin} draggable = "false" alt = {"solopin"} style = {{visibility: this.state.unmergedImages, top: this.state.y, left: this.state.x}} onMouseOver = {this.mouseEnterPin} onMouseLeave = {this.mouseExitPin}/>
        <img id = "emptypinicon" src = {emptypinicon} draggable = "false" onMouseLeave = {this.mouseExitPin} onMouseOver = {this.mouseEnterPin} alt = {"empty pin"} style = {{visibility: this.state.unmergedImages}}/>
        <img id = "pin" src = {pin} alt = {"pin"} draggable = "false" onMouseLeave = {this.mouseExitPin} onMouseOver = {this.mouseEnterPin}/>
          <span style = {{visibility: this.state.pinIsOpen}}>
            <div className = "bubbleheader" id = "bubheader1"><center><p className = "small">DRAG AND DROP PIN</p></center></div>
            <div className = "connector" id = "con1">
            </div>
            <div className = "blocker" id = "blo1">
            </div>
            <div className = "bubble" id = "bub1">
              <div className = "small">Post by: {this.state.username}
              <center><div id="insertimage">

                <img src = {insertphoto} id = "insertphoto"/>
                <div id = "noPin" style = {{visibility: this.state.noPin, filter: this.state.noPinOpa}}>Please define a pin location before posting!</div>
                <img src = {picarrowleft} id = "picarrowleft" onClick = {this.handleArrowClick} style = {{visibility: this.state.image2visible}}/>
                <img src = {picarrowright} id = "picarrowright" onClick = {this.handleArrowClick} style = {{visibility: this.state.image1visible}}/>
                <img src = {this.state.uploadImageBefore} alt = {""} className = "uploadImage" id = "uploadImageBefore" style = {{visibility: this.state.image1visible}}/>
                <img src = {this.state.uploadImageAfter} alt = {""} className = "uploadImage" id = "uploadImageAfter" style = {{visibility: this.state.image2visible}}/>
                <form onSubmit = {this.submitCaption}>
                  <input type = "text" style = {{visibility: this.state.image1visible}} onChange = {this.updateImage} id = "fileInput" value = {this.state.uploadImageBefore} placeholder = "Add image URL"/>
                  <input type = "text" style = {{visibility: this.state.image2visible}} onChange = {this.updateImage} id = "fileInput" value = {this.state.uploadImageAfter} placeholder = "Add image URL"/>
                  <textarea placeholder = "Insert caption here..." onChange = {this.updateCaption} value = {this.state.caption} id="caption"></textarea>
                  <button type = "submit" id = "post"><center><p className = "small">POST</p></center></button>
                </form>
              </div></center>

            </div>

          </div>
          <img className = "cover" id = "cover1" src = {cover} alt = "cover" onClick = {this.openPin} draggable = "false" />
          </span>

        <img id = "feed" src = {feed} alt = {"feed"} onClick = {this.openFeed} draggable = "false"/>
          <span style = {{visibility: this.state.feedIsOpen}}>



            <div className = "connector" id = "con2">
            </div>
            <div className = "blocker" id = "blo2">
            </div>
            <div className = "bubble" id = "bub2">
            </div>
            <img className = "cover" id = "cover2" src = {cover} onClick = {this.openFeed} alt = "cover"/>


            <div id = "tableft" onClick = {this.opentab1}><center><p className = "small">UPDATES</p></center></div>
              <span style = {{visibility: this.state.tab1IsOpen}}>
                <div id = "line1"></div>
                <div className = "tab" id = "tab1">{this.state.messages}</div>
                <div className = "texttype">
                  <form onSubmit = {this.submitUpdate}>
                    <input className = "feedform" type = "text" placeholder = "Add an update..." onChange = {this.updateUpdate} value = {this.state.updateMessage}/>
                    <button type = "submit" className = "feedbutton"></button>
                  </form>
                </div>
              </span>


            <div id = "tabright" onClick = {this.opentab2}><center><p className = "small">REPORTS</p></center></div>
              <span style = {{visibility: this.state.tab2IsOpen}}>
                <div id = "line2"></div>
                <div className = "tab" id = "tab2">{this.state.reports}</div>
                <div className = "texttype">
                  <form onSubmit = {this.submitReport}>
                    <input className = "feedform" type = "text" placeholder = "Report a location..." onChange = {this.updateReport} value = {this.state.reportMessage}/>
                    <button type = "submit" className = "feedbutton"></button>
                  </form>
                </div>
              </span>


          </span>

        <img id = "leader" src = {leader} alt = {"leaderboard"} onClick = {this.openLeader} draggable = "false"/>
          <span style = {{visibility: this.state.leaderIsOpen}}>

            <div className = "bubbleheader" id = "bubheader3"><center><p className = "small">LEADERBOARD</p></center></div>

            <div className = "connector" id = "con3">
            </div>
            <div className = "blocker" id = "blo3">
            </div>
            <div className = "bubble" id = "bub3">

            <center><p id = "totalcount"><br/>TOTAL COUNT</p> <p id = "livecount"><b>{this.state.lbs}</b> lbs</p>
            Weekly Leaderboard</center>
            <br />
            <p className = "small" id = "leftleader">
            <ol>
              {items}
            </ol>
            </p>

            </div>
            <img className = "cover" id = "cover3" src = {cover} onClick = {this.openLeader} alt = "cover"/>
          </span>


        <img id = "friends" src = {friends} alt = {"friends"} onClick = {this.openFriends}  style = {{marginTop: this.state.height - 119}} draggable = "false"/>
          <span style = {{visibility: this.state.friendsIsOpen}}>
            <div className = "connector" id = "con4" style = {{top: this.state.height - 119}}>
            </div>
            <div className = "blocker" id = "blo4" style = {{top: this.state.height - 116.5}}>
            </div>
            <div className = "bubble" id = "bub4" style = {{top: this.state.height - 379}}>
            </div>
            <img className = "cover" id = "cover4" style = {{top: this.state.height - 117}} src = {cover} onClick = {this.openFriends} alt = "cover"/>


                  <span style = {{visibility: this.state.FriendSearchIsOpen}}>

                  <div className = "bubbleheader" id = "bubheader4" ><center><p className = "small">FIND FRIENDS</p></center></div>

                  <div className = "page" id = "friendsearch">
                  <form onSubmit = {this.openFriendPage1}>
                    <input id = "friendform" type = "text" placeholder = "Search by username..." onChange = {this.updateUserSearch} value = {this.state.userSearch}/>
                    <button type = "submit" className = "feedbutton"></button>
                  </form>

                  <div className = "searchpage" id = "friendsearch">
                  <p id = "nouser">{this.state.friendplaceHolder}</p>
                    <div id = "friendinfo">{this.state.userReferences}</div>

                  </div>
                  </div></span>
                  <span style = {{visibility: this.state.FriendPageIsOpen}}>
                  <div className = "bubbleheader" id = "bubheader4"><center><p className = "small">PROFILE</p></center></div>

                  <img id = "profileback" src = {back} onClick = {this.openFriendSearch}/>

                  <div className = "page" id = "friend">
                    <img id = "friendprofile" src = {this.state.activePfp}/>
                    <p id = "frienduser">{this.state.activeFriend}</p>
                    <p id = "friendinfo"><div class = "page" id = "friendBio">{this.state.activeBio}</div>
                    <a href = {"/ProfSearch/:" +this.state.activeFriend}><button id = "signoutbutactuallyprofile">Profile</button></a><br /><br />

                    <ol className = "left">
                    Pins
                      {pins}
                    </ol>
                      Trash count: {this.state.activeTrash} lbs
                    </p>
                  </div>
                  </span>
          </span>
        <a href = "./About"><img id = "aboutusicon" src = {aboutus} alt = {"aboutus"} draggable = "false" style = {{top: this.state.height - 175, marginTop: 0}}/></a>
        <a href = "./Mission"><img id = "ourmissionicon" src = {ourmission} alt = {"ourmission"} draggable = "false" style = {{top: this.state.height - 100, marginTop: 0}}/></a>
        <a href = "./safety"><img id = "safetyicon" src = {safetyicon} alt = {"safety"} draggable = "false" style = {{top: this.state.height - 195, marginTop: 0}}/></a>

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
 crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
  integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
  crossOrigin=""></script>
        <div id="map" style = {{height: this.state.height - 40}}>
        </div>
      </div>
    );
  }
  else {
    return(
      <div>{this.renderRedirect(this.state.userSearch)}</div>
    )
  }
  }
}
export default Bubble;
