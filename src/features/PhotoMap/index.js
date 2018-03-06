import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Map, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import RouterForwarder from '../../utils/RouterForwarder';
import 'react-leaflet-markercluster/dist/styles.min.css';
import './PhotoMap.css';

const propTypes = {
  mapboxToken: PropTypes.string,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

const contextTypes = {
  router: PropTypes.object,
}

const defaultProps = {
  markers: [],
}

class PhotoMap extends Component {
  render() {
    const markers = this.props.markers.map(marker => {
      return (
        <Marker key={marker.key} position={marker.location}>
          <Popup>
            <RouterForwarder context={this.context}>
              {marker.title}
              <br />
              <Link to={marker.url}>Details</Link>
            </RouterForwarder>
          </Popup>
        </Marker>
      )
    });
    return (
      <div className="Photo-Map-Container">
        <Map
          center={[0, 0]}
          zoom={3}
          zoomControl={false}
          minZoom={3}
          maxZoom={18}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${this.props.mapboxToken}`}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <ZoomControl position="bottomleft" />
          <MarkerClusterGroup options={{showCoverageOnHover: false}}>
            { markers }
          </MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

PhotoMap.propTypes = propTypes;
PhotoMap.contextTypes = contextTypes;
PhotoMap.defaultProps = defaultProps;

export default PhotoMap;
