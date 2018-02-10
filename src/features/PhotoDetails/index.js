import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Title from './Title';
import Specs from './Specs';
import './PhotoDetails.css';

class PhotoDetails extends Component {
  render() {
    const location = [this.props.image.location.lat, this.props.image.location.long]
    return (
      <div className="Photo-Details-Wrapper">
        <Title text={this.props.image.title} description={this.props.image.description} />
        <div className="Flex-Item">
          <Specs image={this.props.image} />
        </div>
        <div className="Flex-Item Map-Item">
          <Map className="Map" center={location} zoom={13}>
            <TileLayer
              url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9taW5pay10aCIsImEiOiJjajZxYnF4ZnowN25qMzJvNnAyMzF0OW13In0.wt8ntpDLnptHNro4B7S7Fg'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location} />
          </Map>
        </div>
      </div>
    );
  }
}

export default PhotoDetails;
