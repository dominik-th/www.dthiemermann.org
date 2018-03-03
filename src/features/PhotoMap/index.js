import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import './PhotoMap.css';

class PhotoMap extends Component {
  render() {
    const markers = [];
    return (
      <div className="Photo-Map-Container">
        <Map
          center={[0, 0]}
          zoom={3}
          zoomControl={false}
          maxZoom={18}
        >
          <TileLayer
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9taW5pay10aCIsImEiOiJjajZxYnF4ZnowN25qMzJvNnAyMzF0OW13In0.wt8ntpDLnptHNro4B7S7Fg'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <ZoomControl position="bottomleft" />
          <MarkerClusterGroup markers={markers} options={{showCoverageOnHover: false}} />
        </Map>
      </div>
    );
  }
}

export default PhotoMap;
