import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { fetchPhotos } from '../../actions';
import config from '../../env/config';
import Gallery from '../../features/Gallery';

const defaultProps = {
  photos: [],
}

class Photos extends Component {
  componentWillMount() {
    if (this.props.photos.length === 0) {
      this.props.dispatch(fetchPhotos());
    }
  }

  render() {
    return (
      <div>
        <Grid centered columns={1}>
          <Grid.Column largeScreen={14} computer={14} tablet={14} mobile={16}>
            <Gallery photos={this.props.photos} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { storage } = state.cover;
  const stateProps = {};
  if (storage) {
    stateProps.photos = storage.images.map(image => {
      image.url = `${config.backend.url}/photo/${image.id}`;
      return image;
    });
  }
  return stateProps;
};

Photos.defaultProps = defaultProps;

export default connect(
  mapStateToProps
)(Photos);
