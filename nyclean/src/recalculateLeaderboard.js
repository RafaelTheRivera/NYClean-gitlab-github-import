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
      snapshot.forEach(function(doc){
          userReferences.push(doc.id);
          userReferences.push(doc.data().fullname);
      });
      console.log(userReferences);
    });
    const pinData = db.collection("pins").get().then((querySnapshot) => {
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
          var setWithMerge = doc.set({
              Totaltrash: poundData[i+1]
              }, { merge: true });
          }
      });
  }
  render(){
    return(
      <div>
        <button onClick = {this.recalculateLeaderboard} style = {{height: 500, width: 500}}></button>
      </div>
    );
  }
}
export default Recalc;
