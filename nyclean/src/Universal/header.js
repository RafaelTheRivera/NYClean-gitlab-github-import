import React, {Component} from 'react';
import './../App.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {search:0};
  }
  updateSearchBar(){
    this.setState(this.search);
  }
  checkPageID(){
    
  }
  checkLoginStatus(){

  }
  render(){
    return(
      <div>
        <div id="bigHeader">
          <form> <div class = "headerItem" id = "search">
          <input type = "text" id="box"></input><button type = "submit" id="submit" class = "headerItem">
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
        </div>
      </div>
    )
  }
}

export default Header;
