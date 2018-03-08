import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPhotos } from '../../actions';
import config from '../../env/config';
import LoadingScreen from '../../components/LoadingScreen';
import Cover from '../../features/Cover';
import PhotoDetails from '../../features/PhotoDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (!this.props.currentImage) {
      this.props.dispatch(fetchPhotos());
    }
    this.setState({
      currentImage: this.props.currentImage,
      prevImage: this.props.prevImage,
      nextImage: this.props.nextImage,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.randomImage || !this.state.currentImage) {
      this.setState({
        currentImage: nextProps.currentImage,
        prevImage: nextProps.prevImage,
        nextImage: nextProps.nextImage,
      });
    }
  }

  render() {
    const { currentImage, prevImage, nextImage } = this.state;
    const { loading } = this.props;
    return (
      <div className="App">
        <Transition.Group animation="fade" duration={500}>
          { loading &&
            <div>
              <LoadingScreen subheader={config.website.title} />
            </div>
          }
        </Transition.Group>
        { (!loading && currentImage) &&
          <div>
            <Cover
              imageUrl={`${config.backend.url}/photo/${currentImage.id}`}
              prevImage={prevImage}
              nextImage={nextImage}
            />
            <PhotoDetails
              image={currentImage}
              mapboxToken={config.mapbox.apiKey}
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
    stateProps.randomImage = paramIndex === -1;
  }

  return stateProps;
};

export default connect(
  mapStateToProps
)(App);
