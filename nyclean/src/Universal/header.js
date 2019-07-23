import React, {Component} from 'react';
import './../App.css';


class Header extends Component {
  constructor(){
    super();
<<<<<<< HEAD
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
=======
    this.state = {};
  }
  componentWillMount(){
>>>>>>> d3eee1555454a8ca41f667382e4e986c57f92b4c
  }
  getProfilePicture = e => {
    //find user's profile photo
  }
  render(){
    return(
      <div>
<<<<<<< HEAD
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
=======

>>>>>>> d3eee1555454a8ca41f667382e4e986c57f92b4c
      </div>
    )
  }
}

export default Header;
