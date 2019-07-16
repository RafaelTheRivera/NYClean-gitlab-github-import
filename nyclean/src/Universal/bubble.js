import React, {Component} from 'react';
import './../App.css';

class Bubble extends Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <span>
          <div class = "connector" id = "con1">
          </div>
          <div class = "blocker" id = "blo1">
          </div>
          <div class = "bubble" id = "bub1">
          </div>
          <span>
            <div id = "icoTop1">
            </div>
            <div id = "icoMid1">
            </div>
            <div id = "icoBot1">
            </div>
          </span>
        </span>
        <span>
          <div class = "connector" id = "con2">
          </div>
          <div class = "blocker" id = "blo2">
          </div>
          <div class = "bubble" id = "bub2">
          </div>
          <span>
            <div id = "icoTop2">
            </div>
            <div id = "icoMid2">
            </div>
            <div id = "icoBot2">
            </div>
          </span>
        </span>
        <span>
          <div class = "connector" id = "con3">
          </div>
          <div class = "blocker" id = "blo3">
          </div>
          <div class = "bubble" id = "bub3">
          </div>
          <span>
            <div id = "icoTop3">
            </div>
            <div id = "icoMid3">
            </div>
            <div id = "icoBot3">
            </div>
          </span>
        </span>
        <span>
          <div class = "connector" id = "con4">
          </div>
          <div class = "blocker" id = "blo4">
          </div>
          <div class = "bubble" id = "bub4">
          </div>
          <span>
            <div id = "icoTop4">
            </div>
            <div id = "icoMid4">
            </div>
            <div id = "icoBot4">
            </div>
          </span>
        </span>
      </div>
    );
  }
}
export default Bubble;
