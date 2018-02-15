import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPhotos } from '../../actions';
import config from '../../env/config';
import LoadingScreen from '../../components/LoadingScreen';
import NavBar from '../../features/NavBar';
import Cover from '../../features/Cover';
import Footer from '../../features/Footer';
import PhotoDetails from '../../features/PhotoDetails';

class App extends Component {
  componentWillMount() {
    if (!this.props.currentImage) {
      this.props.dispatch(fetchPhotos());
    }
  }

  render() {
    return (
      <div className="App">
        <Transition.Group animation="fade" duration={500}>
          { this.props.loading &&
            <div>
              <LoadingScreen subheader={config.website.title} />
            </div>
          }
        </Transition.Group>
        { (!this.props.loading && this.props.currentImage) &&
          <div>
            <Cover
              imageUrl={`${config.backend.url}/photo/${this.props.currentImage.id}`}
              prevImage={this.props.prevImage}
              nextImage={this.props.nextImage}
            />
            <PhotoDetails
              image={this.props.currentImage}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { storage, loading } = state.cover;
  const stateProps = {
    loading
  };
  if (storage) {
    const randomIndex = _.random(0, storage.images.length - 1);
    const paramIndex = _.findIndex(storage.images, ['id', ownProps.match.params.imageId]);
    const currentIndex = paramIndex === -1 ? randomIndex : paramIndex;

    const prevIndex = (currentIndex - 1) < 0 ? storage.images.length - 1 : currentIndex -1;
    const nextIndex = (currentIndex + 1) % storage.images.length;

    stateProps.currentImage = storage.images[currentIndex];
    stateProps.prevImage = storage.images[prevIndex];
    stateProps.nextImage = storage.images[nextIndex];
  }

  return stateProps;
};

export default connect(
  mapStateToProps
)(App);
