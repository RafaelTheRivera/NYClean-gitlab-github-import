import React, {Component} from 'react';
import firebase from './../Firestore';

class Map extends Component{
  constructor(){
    super();
    this.state = {};
  }
  componentDidMount() {

  }
  componentWillMount(){
      this.updateDimensions();
      const db = firebase.firestore();
      const pinData = db.collection("pins");
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
  render(){
    return(
      <div>
      </div>
    );
  }
}

export default Map
