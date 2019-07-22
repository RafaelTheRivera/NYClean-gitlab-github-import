import React, {Component} from 'react';
import L from 'leaflet'

class Map extends Component{
  constructor(){
    super();
    this.state = {height:null};
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    this.height = window.innerHeight-90;
    this.corner1 = L.latLng(40.4079549, -74.2768574);
    this.corner2 = L.latLng(41.0210528, -73.6697356);
    this.bounds = L.latLngBounds(this.corner1, this.corner2)
    this.map = L.map('map', {
      center: [40.7280822, -73.9937973],
      zoom: 17,
      minZoom:10,
      maxBounds: this.bounds,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
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