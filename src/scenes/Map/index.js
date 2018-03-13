import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../actions';
import config from '../../env/config';
import PhotoMap from '../../features/PhotoMap';

class Map extends Component {
  componentWillMount() {
    if (!this.props.markers.length) {
      this.props.dispatch(fetchPhotos());
    }
  }

  render() {
    return (
      <PhotoMap mapboxToken={config.mapbox.apiKey} markers={this.props.markers} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { storage } = state.cover;
  const stateProps = {
    markers: [],
  };
  if (storage) {
    stateProps.markers = storage.images.map(image => {
      return {
        key: image.id,
        location: [image.location.lat, image.location.long],
        title: image.title,
        url: `/photo/${image.id}`,
        thumbnail: `${config.backend.url}/photo/${image.id}`,
      }
    });
  }
  return stateProps;
};

export default connect(
  mapStateToProps
)(Map);
