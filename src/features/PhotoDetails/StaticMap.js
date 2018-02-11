import React, { Component } from 'react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';

class StaticMap extends Component {
  handleMouseover = () => {
    this.refs.map.leafletElement.setZoom(10);
  }

  handleMouseout = () => {
    this.refs.map.leafletElement.setZoom(6);
  }

  handleMousemove = ({ containerPoint }) => {
    const size = this.refs.map.leafletElement.getSize();
    const center = [size.x/2, size.y/2];
    const distance = containerPoint.distanceTo(center)/size.distanceTo(center);
    if (distance < 0.15) {
      this.refs.map.leafletElement.setView(this.refs.location.props.center, 15, {animate: false});
      this.refs.location.leafletElement.setRadius(30);
    } else {
      this.refs.map.leafletElement.setZoom(11);
      this.refs.location.leafletElement.setRadius(15);
    }
  }

  render() {
    const { location, zoomLevels, ...rest } = this.props;
    return (
      <Map
        ref="map"
        center={location}
        zoom={zoomLevels[0]}
        zoomAnimation={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
        dragging={false}
        onMouseover={this.handleMouseover}
        onMouseout={this.handleMouseout}
        onMousemove={this.handleMousemove}
        {...rest}
      >
        <TileLayer
          url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9taW5pay10aCIsImEiOiJjajZxYnF4ZnowN25qMzJvNnAyMzF0OW13In0.wt8ntpDLnptHNro4B7S7Fg'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleMarker ref="location" center={this.props.location} radius={15} color="" />
      </Map>
    );
  }
}

export default StaticMap;
