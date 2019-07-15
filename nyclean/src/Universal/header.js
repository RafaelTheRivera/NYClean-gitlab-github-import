import React, {Component} from 'react';
import './../App.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {search:0};
  }
  updateSearchBar = e => {
    this.setState(this.search);
    //find variable to search in search bar
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
  }
  checkPageID(){
    
  }
  checkLoginStatus(){

  }
  render(){
    return(
      <div>
        <div id="bigHeader">
<<<<<<< HEAD
          <form>
            <div class = "headerItem" id = "search">
              <input
                type = "text"
                id="box"
                name = "search"
                placeholder = " Search..."
                onChange = {this.updateSearchBar}
                /*value = {this.state.search}*/></input>
              <button type = "submit" id="submit" class = "headerItem">
                <img alt="" src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying"/>
              </button>
            </div>
          </form>
          <div class = "headerItem" id = "logo">
            <a href="./">NYCLEAN</a>
          </div>
          <a href = "./login">
            <div class = "headerItem" id = "login">
              <span id="rogueText">My Profile</span>
              <div id="profile">
                <img alt="" id = "profilepic" src = /*should actually link to individual profiles*/"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
              </div>
            </div>
          </a>
=======
          <form> <div class = "headerItem" id = "search">
          <input type = "text" id="box"></input><button type = "submit" id="submit" class = "headerItem">
<<<<<<< HEAD
<<<<<<< HEAD
          <img src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying" alt = "img"/></button>
          </div> </form>
          <div class = "headerItem" id = "logo">NYCLEAN</div>
          <div class = "headerItem" id = "login"><div id="profile"><img src="{userProfile}" alt = "user"/></div>Log in</div>
=======
          <img alt="" src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying"/></button>
          </div> </form>
          <div class = "headerItem" id = "logo"><a href="./">NYCLEAN</a></div>
          <div class = "headerItem" id = "login">Log in<div id="profile">
          <img alt="" id = "profilepic" src = "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg"/>
          </div></div>
>>>>>>> 05ae0e96bd5d9eaf56aebc863ee0acfd175cccfd
=======
          <img alt="" src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying"/></button>
          </div> </form>
          <div class = "headerItem" id = "logo"><a href="./">NYCLEAN</a></div>
          <a href = "./login"><div /* this is actually useless*/class = "headerItem" id = "login"> /*"Log in" should actually just reflect the username*/Log in<div id="profile">
          <img alt="" id = "profilepic" src = /*should actually link to individual profiles*/"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
          </div></div></a>
>>>>>>> debc2f45e6f0b67b63149476b44164bd96e01a06
>>>>>>> cbf6ee6f2dd4ae29f88757b0111bc0011702cd31
        </div>
      </div>
    )
  }
}

export default Header;
