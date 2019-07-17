import React, {Component} from 'react';
import './../App.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {search:""};
  }
  updateSearchBar = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  checkPageID = e => {
    //if not at home page, cover search bar
    //note: if someone wants to, you can skip this step by copying this header object and recreating it without a search bar, then specifically calling it on other pages.

  }
  checkLoginStatus = e => {
    //redirect to log in page if not logged in.
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
  checkPageID = e => {

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
        <div id="bigHeader">
          <form>
            <div id = "sneaky" style = {{visibility: this.isAtHome()}}>
            </div>
            <div class = "headerItem" id = "search">
              <input
                type = "text"
                id="box"
                name = "search"
                placeholder = " Search..."
                onChange = {this.updateSearchBar}
                value = {this.state.search}></input>
              <button type = "submit" id="submit" class = "headerItem">
                <img alt="" src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying"/>
              </button>
            </div>
          </form>
          <div class = "headerItem" id = "logo">
            <a href="./">NYCLEAN</a>
          </div>
          <a href = "./profpage">
            <div class = "headerItem" id = "login">
              <span id="rogueText">My Profile</span>
              <div id="profile">
                <img alt="" id = "profilepic" src = /*should actually link to individual profiles*/"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
              </div>
            </div>
          </a>
        </div>
      </div>
    )
  }
}

export default Header;
