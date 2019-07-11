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
  render(){
    return(
      <div>
        <div id="bigHeader">
          <form> <div class = "headerItem" id = "search">
          <input type = "text" id="box"></input><button type = "submit" id="submit" class = "headerItem">
          <img src="https://images.vexels.com/media/users/3/143356/isolated/preview/64e14fe0195557e3f18ea3becba3169b-search-magnifying-glass-by-vexels.png" id="magnifying" alt = "img"/></button>
          </div> </form>
          <div class = "headerItem" id = "logo">NYCLEAN</div>
          <div class = "headerItem" id = "login"><div id="profile"><img src="{userProfile}" alt = "user"/></div>Log in</div>
        </div>
      </div>
    )
  }
}

export default Header;
