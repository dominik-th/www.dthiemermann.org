import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
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
      let thumbnailSq = _.filter(image.thumbnails, { flickrSuffix: 'sq' })[0];
      let thumbnailM = _.filter(image.thumbnails, { flickrSuffix: 'm' })[0];
      return {
        key: image.id,
        location: [image.location.lat, image.location.long],
        title: image.title,
        url: `/photo/${image.id}`,
        thumbnail: thumbnailSq.url,
        preview: thumbnailM.url,
      }
    });
  }
  return stateProps;
};

export default connect(
  mapStateToProps
)(Map);
