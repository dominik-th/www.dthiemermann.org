import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';

const propTypes = {
  mapboxToken: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomLevels: PropTypes.arrayOf(PropTypes.number),
}

const defaultProps = {
  zoomLevels: [7, 11, 14],
}

class StaticMap extends Component {
  handleMouseover = () => {
    const { zoomLevels } = this.props;
    if (zoomLevels.length > 1) {
      this.setZoom(zoomLevels[1]);
    } else {
      this.setZoom(zoomLevels[0]);
    }
  }

  handleMouseout = () => {
    this.setZoom(this.props.zoomLevels[0]);
  }

  handleMousemove = ({ containerPoint }) => {
    const { zoomLevels } = this.props;
    if (zoomLevels.length > 2) {
      const size = this.refs.map.leafletElement.getSize();
      const center = [size.x/2, size.y/2];
      const distance = Math.min(1, containerPoint.distanceTo(center)/Math.min(size.x/2, size.y/2));
      const stepSize = 1/(zoomLevels.length-1);
      const step = Math.floor((1-distance)/stepSize)+1;
      const markerRadius = step === zoomLevels.length-1 ? 30 : undefined;
      this.setZoom(zoomLevels[step], markerRadius);
    }
  }

  handleMarkerclick = () => {
    this.props.history.push(`/map/@${this.props.coordinates[0]},${this.props.coordinates[1]},13z`)
  }

  setZoom = (level, markerRadius = 15) => {
    this.refs.map.leafletElement.setView(this.refs.centerMarker.props.center, level);
    this.refs.centerMarker.leafletElement.setRadius(markerRadius);
  }

  render() {
    const { coordinates, zoomLevels, ...rest } = this.props;
    return (
      <Map
        ref="map"
        center={coordinates}
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
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${this.props.mapboxToken}`}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          detectRetina
        />
        <CircleMarker ref="centerMarker" center={coordinates} radius={15} color="" onClick={this.handleMarkerclick} />
      </Map>
    );
  }
}

StaticMap.propTypes = propTypes;
StaticMap.defaultProps = defaultProps;

export default withRouter(StaticMap);
