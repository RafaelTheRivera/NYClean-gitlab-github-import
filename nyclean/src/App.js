import React, {Component} from 'react';
import AppComponent from './AppComponent';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <p>This is what the very first page of my app looks like.</p>
        <AppComponent />
      </div>

    );
  }
}

export default App;
