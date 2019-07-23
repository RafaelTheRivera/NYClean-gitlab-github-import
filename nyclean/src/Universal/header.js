import React, {Component} from 'react';
import './../App.css';
import headergradient from './../images/headergradient.png';
import greenyc from './../images/greenyc.png';
import firebase from './../Firestore';


class Header extends Component {
  constructor(){
    super();
    this.state = {search: "",
                  username: "",
                  profileWidth: "",
                  imgsrc:""};
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
      this.setState({username: user.displayName,
                    profileWidth: user.displayName.length * 8.5 + 50 + "px"});
    }
    else {
      this.setState({profileWidth: user.displayName.length * 8.5 + 50 + "px"});
    }
    const db = firebase.firestore();
    db.settings ({
      timestampsInSnapshots: true
    });

    const userRef = db.collection("users");

    userRef.doc(user.uid).get().then(getDoc => {
        this.setState({
          imgsrc: getDoc.data().imageSrc
        })
    })
    });
  }
  updateSearchBar = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  getProfilePicture = e => {
    //find user's profile photo
  }
  getSearch = e => {
    //find search results based on updateSearchBar
    //note: must call the search results bar
    e.preventDefault();
    //const db = firebase.firestore();
    /*let reviewBase = db.collection(open this database later);
    //program function to find distances based on an inputted location and search coordinates
    let query = reviewBase.where(/*query within);
    console.log(query);
    //program function to display results based on search criteria
    */
  }
  checkLoginStatus = e => {

  }
  isAtHome() {
    console.log("running");
    const url = window.location.href;
    const length = url.length;
    var output;
    if (length > 23 && url.indexOf("search") < 0){
      output = "visible";
      return(output);
    }else{
      output = "hidden";
      return(output);
    }
  }
  render(){
    return(
      <div>
        <img id = "bigHeader" src = {headergradient} alt = {"topgradient"}/>
          <form>
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
          <div className= "headerItem" id = "logo">
            <a href = "/"> <img id = "greenyc" src = {greenyc} alt= "logo"/> </a>
          </div>
            <div className= "headerItem" id = "login2" style = {{width: this.state.profileWidth}}>
              <a href = "./profpage"><span id="rogueText">{this.state.username}</span></a>
              <img alt="" id = "profilepic" src ={this.state.imgsrc}/>
              </div>
          <a href = "./profpage">
            <div className= "headerItem" id = "login2" style = {{width: this.state.profileWidth}}>
              <span id="rogueText">{this.state.username}</span>
            </div>

          </a>
      </div>
    )
  }
}

export default Header;
