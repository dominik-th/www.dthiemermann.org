import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { divIcon } from 'leaflet';
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
  handleMoveend = (e) => {
    let pathLocation = this.props.location.pathname;
    let cutIndex = pathLocation.indexOf('@');
    if (cutIndex > 0) {
      pathLocation = pathLocation.substr(0, cutIndex - 1);
    }
    if (!pathLocation.endsWith('/')) {
      pathLocation += '/';
    }
    let center = this.refs.map.leafletElement.getCenter();
    let zoom = this.refs.map.leafletElement.getZoom();
    this.props.history.replace(`${pathLocation}@${center.lat.toFixed(7)},${center.lng.toFixed(7)},${zoom.toFixed(0)}z`);
  }

  componentDidMount() {
    let pathLocation = this.props.location.pathname;
    let cutIndex = pathLocation.indexOf('@');
    if (cutIndex > 0) {
      let parameters = pathLocation.substr(cutIndex + 1, pathLocation.length).split(',');
      if (parameters.length < 3) return;
      let lat = parseFloat(parameters[0]);
      let lng = parseFloat(parameters[1]);
      let zoom = parseInt(parameters[2], 10);
      if (!(lat >= -90 && lat <= 90)) return;
      if (!(lng >= -180 && lng <=  180)) return;
      if (!(zoom >= 3 && zoom <= 18)) return;
      this.refs.map.leafletElement.setView({lat, lng}, zoom, {animate: false});
    } else if (this.props.markers.length > 0) {
      let marker = this.props.markers[Math.floor(Math.random() * (this.props.markers.length - 1))];
      this.refs.map.leafletElement.panTo({lat: marker.location[0], lng: marker.location[1]}, {duration: .25});
    }
  }

  componentWillReceiveProps(nextProps) {
    let pathLocation = nextProps.location.pathname;
    let cutIndex = pathLocation.indexOf('@');
    if (cutIndex < 0 && nextProps.markers.length > 0 && this.props.markers.length !== nextProps.markers.length) {
      let marker = nextProps.markers[Math.floor(Math.random() * (nextProps.markers.length - 1))];
      this.refs.map.leafletElement.panTo({lat: marker.location[0], lng: marker.location[1]}, {duration: .25});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.markers.length !== nextProps.markers.length;
  }

  createMarkerCustomIcon = (marker) => {
    return divIcon({
      className: 'Photo-Map-Cluster-Icon',
      html: `<div style="background-image: url(${marker.thumbnail});"></div>`,
      iconSize: [40, 40]
    });
  }

  createClusterCustomIcon = (cluster) => {
    let thumbnail = cluster.getAllChildMarkers()[0].options.marker.thumbnail;
    return divIcon({
      className: 'Photo-Map-Cluster-Icon',
      html: `<div style="background-image: url(${thumbnail});"></div><b>${cluster.getChildCount()}</b>`,
      iconSize: [40, 40]
    });
  }

  render() {
    const markers = this.props.markers.map(marker => {
      return (
        <Marker key={marker.key} position={marker.location} icon={this.createMarkerCustomIcon(marker)} marker={marker}>
          <Popup className="Photo-Map-Popup">
            <RouterForwarder context={this.context}>
              <img className="Photo-Map-Preview" src={marker.preview} alt="preview" />
              <p>
                <Link to={marker.url}>{marker.title}</Link>
              </p>
            </RouterForwarder>
          </Popup>
        </Marker>
      )
    });
    return (
      <div className="Photo-Map-Container">
        <Map
          ref="map"
          // default center to germany
          center={[51.18622,10.51391]}
          zoom={3}
          zoomControl={false}
          minZoom={3}
          maxZoom={18}
          onMoveend={this.handleMoveend}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${this.props.mapboxToken}`}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            detectRetina
          />
          <ZoomControl position="bottomleft" />
          <MarkerClusterGroup options={{iconCreateFunction: this.createClusterCustomIcon, showCoverageOnHover: false}}>
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

export default withRouter(PhotoMap);
