import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import HeatmapLayer from '../src/HeatmapLayer';
import { addressPoints } from './realworld.10000.js';

class HeatMap extends React.Component {

  updateDimensions() {
   const height = window.innerWidth >= 992 ? window.innerHeight : 400
   this.setState({ height: height })
 }

 componentWillMount() {
   this.updateDimensions()
 }

 componentDidMount() {
   window.addEventListener("resize", this.updateDimensions.bind(this))
 }

 componentWillUnmount() {
   window.removeEventListener("resize", this.updateDimensions.bind(this))
 }

  render() {
    return (
      <div class="map-container" style={{ height: this.state.height - 40}}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
 crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
  integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
  crossOrigin=""></script>
  <div class="map-container" style={{ height: this.state.height }}>
        <Map
        center={[0,0]}
        zoom={18}
        bounds = {[[40.4079549, -74.5768574],[41.0210528, -73.5697356]]}
        maxBounds = {[[40.4079549, -74.5768574],[41.0210528, -73.5697356]]}
        maxZoom = {19}
        minZoom = {11}
        style={{height: this.state.height - 40}}>
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={addressPoints}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])} />
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
          />
          <Polygon color="#28BBB4" fillOpacity = {.2} stroke = {false} positions={[
                    [[41.3618319, -75.2051234],[41.469047, -72.2873209],[39.7803319, -72.3759987],[39.4415253, -77.2803378]], // outer ring
                    [[40.9174387, -73.9182608],[40.9036805, -73.8616911],[40.9101667, -73.8529897],
                    [40.9047576, -73.8403284], [40.8964564, -73.8370143], [40.8769762, -73.7574783], [40.7915645, -73.7683374], [40.7534296, -73.7008563],
                    [40.7387889, -73.6995021], [40.7270097, -73.7079006], [40.7206274, -73.727728], [40.6524473, -73.7232974], [40.5938638, -73.7365575],
                    [40.5387046, -73.9406415], [40.4925961, -74.2546212], [40.513526, -74.258347], [40.5210896, -74.2461042], [40.5533506, -74.2497042],
                    [40.5581952, -74.216163], [40.6308063, -74.2023198], [40.6464677, -74.1808265], [40.6423436, -74.1423563], [40.6517223,-74.0660873]] // hole
                  ]} />
        </Map>
        </div>
      </div>
    );
  }

}

export default HeatMap;
