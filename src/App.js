import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCoverImage } from './actions'
import Cover from './Cover';
import ContentGrid from './ContentGrid';
import './App.css';

// Exiftool:
// exiftool -j -n
// ImageMagick:
// convert -strip -interlace Plane -gaussian-blur 0.05 -quality 75% -resize 3840x2160^ source.jpg destination.jpg
// TODO: switch to Redux!

class App extends Component {

  componentWillMount() {
    this.props.showCoverImage(this.props.currentImageId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentImageId !== nextProps.currentImageId) {
      this.props.showCoverImage(nextProps.currentImageId);
    }
  }

  render() {
    return (
      <div className="App">
        <Cover
          imageUrl={`images/${this.props.currentImage.fileName}`}
          prevImage={this.props.prevImage}
          nextImage={this.props.nextImage}
        />
        <ContentGrid
          image={this.props.currentImage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showCoverImage: (id) => {
      dispatch(loadCoverImage(id));
    }
  };
};

const mapStateToProps = (state, props) => {
  return {
    currentImageId: props.match.params.imageId,
    currentImage: state.cover.currentImage,
    prevImage: state.cover.prevImage,
    nextImage: state.cover.nextImage
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
