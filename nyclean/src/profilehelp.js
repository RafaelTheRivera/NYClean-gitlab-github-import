import React from "react";
import firebase from "./Firestore";
const db = firebase.firestore();
class Reviewer extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurant: "",
      review: "",
      rating: "***",
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
      console.log("got");
      querySnapshot.forEach((doc) => {
        this.setState({
          list: this.state.list.concat({
            restaurant: doc.data().restaurant,
             review : doc.data().review,
             rating : doc.data().rating,
             created : doc.data().created
          })
        })

      console.log(doc.id, " => ", doc.data());
      });
    });
  };

    updateInput = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    addUser = e => {
      e.preventDefault();
      db.settings({
        timestampsInSnapshots: true
      });
      const userRef = db.collection("users").add({
        restaurant: this.state.restaurant,
        review: this.state.review,
        rating: this.state.rating,
        created: firebase.firestore.Timestamp.fromDate(new Date())
      });
      this.setState({
        restaurant: "",
        review: "",
        rating:"",
        list:[],
        restReviews:{}
      });
      db.collection("users").get().then((querySnapshot) => {
        console.log("got");
        querySnapshot.forEach((doc) => {
          this.setState({
            list: this.state.list.concat({
              restaurant: doc.data().restaurant,
               review : doc.data().review,
               rating : doc.data().rating,
               created : doc.data().created
            })
          })
          console.log('first one');
          console.log(this.state.list);
        console.log(doc.id, " => ", doc.data());
        });
      });

  }

  render() {
    this.state.list = this.sort_by_key(this.state.list, "created");
    console.log('this one');
    console.log(this.state.list);
    const items = this.state.list.map((review) =>
      <li><b>Restaurant:</b> {review.restaurant}, <b>Review:</b> {review.review}, <b>Rating:</b> {review.rating}</li>
    );
    return (
      <div>
        <ul>
          {items}
        </ul>
      <form onSubmit = {this.addUser}>
      <input
      type = "place"
      name = "restaurant"
      placeholder = "Restaurant"
      onChange = {this.updateInput}
      value = {this.state.restaurant}
      />
      <input
      type = "text"
      name = "review"
      placeholder = "Review"
      onChange = {this.updateInput}
      value = {this.state.review}
      />
      <input
      type = "rating"
      name = "rating"
      placeholder = "Rating"
      onChange = {this.updateInput}
      value = {this.state.rating}
      />
      <button type = "submit">Submit</button>
      </form>
      </div>
    );
  }
}


export default Reviewer;
