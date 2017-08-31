import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import storage from './env/storage.json';
import Cover from './Cover';
import ContentGrid from './ContentGrid';
import './App.css';

// Exiftool:
// exiftool -j -n
// ImageMagick:
// convert -strip -interlace Plane -gaussian-blur 0.05 -quality 75% -resize 3840x2160^ source.jpg destination.jpg

class App extends Component {

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

const mapStateToProps = (state, props) => {
  const randomIndex = _.random(0, storage.images.length - 1);
  const paramIndex = _.findIndex(storage.images, ['id', props.match.params.imageId]);
  const currentIndex = paramIndex === -1 ? randomIndex : paramIndex;

  const prevIndex = (currentIndex - 1) < 0 ? storage.images.length - 1 : currentIndex -1;
  const nextIndex = (currentIndex + 1) % storage.images.length;

  return {
    currentImage: storage.images[currentIndex],
    prevImage: storage.images[prevIndex],
    nextImage: storage.images[nextIndex]
  };
};

export default connect(
  mapStateToProps
)(App);
