import React, {Component} from 'react';
import Header from './../Universal/header.js'


class Safety extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div>
        <Header />

        <center><h1>Safety Information</h1></center>

        <div id = "safetycontent">
          <p>It can be dangerous to handle waste without taking important safety precautions. To avoid
          injuries and harmful chemicals, please follow the safety tips below.
          Happy cleaning! :-)</p>
          <br />
          <h3>Protect Yourself</h3>
          <ol>
            <li>Make sure to dress appropriately to ensure that you are as protected as possible.</li>
            <li>Wear long sleeves and long pants.</li>
            <li>Protect your eyes with goggles.</li>
            <li>Wear a mask to prevent inhalation or harmful chemicals.</li>
            <li>Picking up trash with bare hands is dangerous. Wear work or gardening gloves.</li>
            <li>Wear close-toed shoes with thick soles or boots to protect from sharp objects.</li>
            <li>Consider wearing a safety or Hi-Visibility vest so that you are visible to drivers and traffic.</li>
            <li>Protect yourself from the sun with hats and sunscreen.</li>
            <li>Have a first aid kit.</li>
          </ol>
          <h3>Cleaning Safely</h3>
          <ol>
            <li>Always have an adult (18 or older) in the group.</li>
            <li>Check the weather to make sure conditions will be safe and prepare accordingly.</li>
            <li>Stay hydrated! Drink plenty of water.</li>
            <li>Rest when needed, and don't overexert yourself.</li>
            <li>Watch your footing and stay off of steep, rocky, or unsafe areas.</li>
            <li>Use a box to carry sharp objects.</li>
            <li>Always wash hands after cleaning.</li>
          </ol>
          <h3>Watch Out!</h3>
          <ol>
            <li>Be aware of your surroundings in any vegetation.</li>
            <li>Do not carry dangerous items like knives and axes.</li>
            <li>Do not pick up syringes or hypodermic needles.</li>
            <li>Do not pick up dead animals.</li>
            <li>Do not clean suspicious liquids that may be toxic chemicals or hazardous substances.</li>
            <li>Do not ingest any substances, and avoid inhaling chemicals. </li>
          </ol>
        </div>

    </div>
    );
  }
}

export default Safety;
