import React, {Component} from 'react';
import './../App.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {search:0};
  }
  updateSearchBar(){
    this.setState(this.search);
    //find variable to search in search bar
  }
  checkPageID(){
    //if not at home page, cover search bar
    //note: if someone wants to, you can skip this step by copying this header object and recreating it without a search bar, then specifically calling it on other pages.
  }
  checkLoginStatus(){
    //redirect to log in page if not logged in.
  }
  getProfilePicture(){
    //find user's profile photo
  }
  getSearch(){
    //find search results based on updateSearchBar
    //note: must call the search results bar
  }
  render(){
    return(
      <div>
        <div id="bigHeader">
          <form> <div class = "headerItem" id = "search">
          <input type = "text" id="box"></input><button type = "submit" id="submit" class = "headerItem">
          <img alt="" src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying"/></button>
          </div> </form>
          <div class = "headerItem" id = "logo"><a href="./">NYCLEAN</a></div>
          <a href = "./login"><div /* this is actually useless*/class = "headerItem" id = "login"> /*"Log in" should actually just reflect the username*/Log in<div id="profile">
          <img alt="" id = "profilepic" src = /*should actually link to individual profiles*/"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
          </div></div></a>
        </div>
      </div>
    )
  }
}

export default Header;
