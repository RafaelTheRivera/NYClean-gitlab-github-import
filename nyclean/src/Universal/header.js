import React, {Component} from 'react';
import './../App.css';
import firebase from 'firebase';
import headergradient from './../images/headergradient.png';
import greenyc from './../images/greenyc.png';

class Header extends Component {
  constructor(){
    super();
    this.state = {search: "",
                  username: "",
                  profileWidth: "",
                  imgsrc:null};
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
    
    const userRef = db.collection("users");

    userRef.doc(user.uid).get().then(getDoc => {
        this.setState({
          imgsrc: getDoc.data().imageSrc
        })
        console.log("srcset")
        console.log(this.state.imgsrc)
    })
    });
  }
  updateSearchBar = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.state = {};
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
              {console.log(this.state.imgsrc)}
              <img alt="" id = "profilepic" src = {this.state.imgsrc}/>
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
