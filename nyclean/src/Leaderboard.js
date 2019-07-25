import React from "react";
import firebase from "./Firestore";
const db = firebase.firestore();

class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      Totaltrash: 0,
      list: [],
    };
  }
  sort_by_key(array, key)
  {
    return array.sort(function(a, b)
  {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
  }
  componentDidMount(){
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          list: this.state.list.concat({
            fullname: doc.data().fullname,
            Totaltrash : doc.data().Totaltrash
          })
        })

      console.log(doc.id, " => ", doc.data());
      });
    });
  };



  render() {
    this.state.list = this.sort_by_key(this.state.list, "Totaltrash");
    console.log('this one');
    console.log(this.state.list);
    const items = this.state.list.reverse().map((trash) =>
      <li> {trash.fullname}: <b>{trash.Totaltrash}</b> lbs</li>
    );
    return (
      <div>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}


export default Leaderboard;
