import React, {Component} from 'react';

class Safety extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <header>
        <a href=".">BACK</a>
        </header>
        <center><h1>Safety Information</h1></center>
        <p>It can be dangerous to handle waste without taking important safety precautions. To avoid
        injuries and harmful chemicals, please follow the safety tips below.
        Happy cleaning! :-)</p>
        <ol>
          <li>tip 1</li>
          <li>tip 2</li>
          <li>tip 3</li>
          <li>tip 4</li>
          <li>tip 5</li>
        </ol>
        </div>
    );
  }
}

export default Safety;
