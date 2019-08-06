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
      ActualTotalTrash: 0
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
      console.log("got");
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
    this.state.ActualTotalTrash = (this.state.list.reduce( function(cnt,o){ return cnt + o.Totaltrash; }, 0));
    console.log('this one');
    console.log(this.state.list);
    this.state.list.reverse();
    const items = this.state.list.slice(0, 5).map((trash) =>
      <li> {trash.fullname}: <b>{trash.Totaltrash}</b> lbs</li>
    );
    return (
      <div>
      <p><b>TOTAL TRASH COUNT: </b>{this.state.ActualTotalTrash} lbs</p>
        <ol>
          {items}
        </ol>
      </div>
    );
  }
}


export default Leaderboard;
