import React, {Component} from 'react';
import './../App.css';
import Bubble from './bubble.js';


class ListItem extends Component{
  constructor(props){
    super(props);
  }
  clickHandler(){
    this.props.clickFunction(this.props.item);
  }
  render(){
   return(
     <div>
       <button className = "friendlistitem" onClick = {()=>{this.clickHandler()}}>  {this.props.item}</button>
     </div>
   );
 }
}
export default ListItem;
