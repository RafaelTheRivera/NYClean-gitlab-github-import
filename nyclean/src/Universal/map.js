import React, {Component} from 'react';
import L from 'leaflet';
import {mapOverlay} from './../images/mapmask.png';

class Map extends Component{
  constructor(){
    super();
    this.state = {height:null};
    this.updateDimensions = this.updateDimensions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.height = window.innerHeight-90;
    this.corner1 = L.latLng(40.4079549, -74.2768574);
    this.corner2 = L.latLng(41.0210528, -73.6697356);
    this.bounds = L.latLngBounds(this.corner1, this.corner2);
    this.overlayCoords = [
                    [[41.3618319, -75.2051234],[41.469047, -72.2873209],[39.7803319, -72.3759987],[39.4415253, -77.2803378]], // outer ring
                    [[40.9174387, -73.9182608],[40.9036805, -73.8616911],[40.9101667, -73.8529897],
                    [40.9047576, -73.8403284], [40.8964564, -73.8370143], [40.8769762, -73.7574783], [40.7915645, -73.7683374], [40.7534296, -73.7008563],
                    [40.7387889, -73.6995021], [40.7270097, -73.7079006], [40.7206274, -73.727728], [40.6524473, -73.7232974], [40.5938638, -73.7365575],
                    [40.5387046, -73.9406415], [40.4925961, -74.2546212], [40.513526, -74.258347], [40.5210896, -74.2461042], [40.5533506, -74.2497042],
                    [40.5581952, -74.216163], [40.6308063, -74.2023198], [40.6464677, -74.1808265], [40.6423436, -74.1423563], [40.6517223,-74.0660873]] // hole
                  ];
    this.map = L.map('map', {
      center: [40.7280822, -73.9937973],
      zoom: 17,
      minZoom:11,
      maxBounds: this.bounds,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        L.polygon(this.overlayCoords, {color: 'black', fillOpacity: .7, stroke: false})
      ]
    });
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillMount(){
      this.updateDimensions();
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
   var w = window;
   var d = document;
   var documentElement = d.documentElement;
   var body = d.getElementsByTagName('body')[0];
   var height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
   this.setState({height: height});
 }
  render(){
    return(
      <div>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
 crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
  integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
  crossOrigin=""></script>
        <div id="map" style = {{height: this.state.height - 90}}></div>
      </div>
    );
  }
}

export default Map
