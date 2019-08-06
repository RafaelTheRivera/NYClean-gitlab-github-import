import React, {Component} from 'react';
import firebase from './Firestore.js';

const db = firebase.firestore();
db.settings ({
  timestampsInSnapshots: true
})

class Recalc extends Component {
  constructor(){
    super();
    this.state = {Totaltrash: 0, username: null, lbs: null};
    this.recalculateLeaderboard = this.recalculateLeaderboard.bind(this);
  }
  recalculateLeaderboard(){
    var userReferences = [];
    const userData = db.collection("users").get().then((snapshot) =>{
      console.log("got");
      snapshot.forEach(function(doc){
          userReferences.push(doc.id);
          userReferences.push(doc.data().fullname);
      });
      console.log(userReferences);
    });
    const pinData = db.collection("pins").get().then((querySnapshot) => {
      console.log("got");
        var dataArray = [];
        var poundData = [];
        querySnapshot.forEach(function(doc){
            dataArray.push(doc.data());
            console.log(doc.id, " => ", doc.data());
            console.log(dataArray);
        });
        for (var i = 0; i < dataArray.length; i++) {
          if (poundData.indexOf(dataArray[i].username) > -1){
            var location = poundData.indexOf(dataArray[i].username)+1;
            poundData.splice(location, 1, poundData[location] + dataArray[i].lbs);
          }else{
            poundData.push(dataArray[i].username);
            poundData.push(dataArray[i].lbs);
          }
        }
        console.log(poundData);
        for (var i = 0; i < userReferences.length; i = i+2){
          var id2 = userReferences[i];
          var doc2 = db.collection('users').doc(id2);
          var setWithMerge2 = doc2.set({
            Totaltrash: 0
          }, {merge: true});
        }
        for (var i = 0; i < poundData.length; i = i + 2) {
          console.log(poundData[i]);
          var id = userReferences[userReferences.indexOf(poundData[i])-1];
          console.log(id);
          var doc = db.collection('users').doc(id);
          var updateProfile = doc.update({
              Totaltrash: poundData[i+1]
              });
          }
          console.log("finished");
      });
  }
  cleanCache(){
    const updateData = db.collection("updates").get().then((updateSnapshot) => {
      console.log("got");
      updateSnapshot.forEach(function(doc){
        if(Date().substr(0, 15) !== doc.data().date.substr(0,15)){
          /*db.collection("updates").doc(doc.id).delete.then(()=>{
            console.log("sup");
          });*/
          console.log("deleted " + doc.id);
          db.collection("updates").doc(doc.id).delete();
        }
      });
    });
    const reportData = db.collection("reports").get().then((updateSnapshot) => {
      console.log("got");
      updateSnapshot.forEach(function(doc){
        if(Date().substr(0, 15) !== doc.data().date.substr(0,15)){
          /*db.collection("updates").doc(doc.id).delete.then(()=>{
            console.log("sup");
          });*/
          console.log("deleted " + doc.id);
          db.collection("reports").doc(doc.id).delete();
        }
      });
      console.log("finished");
    });
  }
  deleteRepeats(){
    var pinArray = [];
    var safeArray = [];
    const pinData = db.collection("pins").get().then((updateSnapshot) => {
      console.log("got");
      updateSnapshot.forEach(function(doc){
        pinArray.push(doc.id);
        pinArray.push(doc.data().username);
        pinArray.push(doc.data().lat);
        pinArray.push(doc.data().long);
      });
      console.log(pinArray);
      for (var i = 1; i < pinArray.length; i = i + 4) {
        console.log(pinArray[i]);
        var userValues = [];
        if(safeArray.indexOf(pinArray[i]) === -1){
          for (var j = 0; j < pinArray.length; j++){
            if (pinArray[j] === pinArray[i]){
              userValues.push(j);
            }
          }
          console.log(userValues);
          for (var k = 0; k < userValues.length; k++) {
            var baseLatLng = [pinArray[userValues[k]+1],pinArray[userValues[k]+2]];
            console.log("comparing" + pinArray[userValues[k]-1]);
            for(var l = k+1; l < userValues.length; l++){
              console.log("to" + pinArray[userValues[l]-1]);
              var testLatLng = [pinArray[userValues[l]+1],pinArray[userValues[l]+2]];
              if(Math.sqrt(((baseLatLng[0] - testLatLng[0])*(baseLatLng[0] - testLatLng[0]))+((baseLatLng[1] - testLatLng[1])*(baseLatLng[1] - testLatLng[1]))) < .0005){
                db.collection("pins").doc(pinArray[userValues[l]-1]).delete();
                console.log("deleted " + pinArray [userValues[l]] + "\'s post: " + pinArray[userValues[l]-1]);
              }
            }
          }
          safeArray.push(pinArray[i]);
          console.log(safeArray);
        }
      }

      console.log("finished");
    });
  }
  render(){
    return(
      <div>
        <button onClick = {this.recalculateLeaderboard} style = {{height: 200, width: 200}}>Recalculate Leaderboard</button>
        <button onClick = {this.cleanCache} style = {{height: 200, width: 200}}>Clean message cache</button>
        <button onClick = {this.deleteRepeats} style = {{height: 200, width: 200}}>Delete extra pins</button>
      </div>
    );
  }
}
export default Recalc;
