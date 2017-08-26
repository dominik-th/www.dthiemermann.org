import React, { Component } from 'react';
import _ from 'lodash';
import Cover from './Cover';
import ContentGrid from './ContentGrid';
import './App.css';
import storage from './storage.json';

// Exiftool:
// exiftool -j -n
// ImageMagick:
// convert -strip -interlace Plane -gaussian-blur 0.05 -quality 75% -resize 3840x2160^ source.jpg destination.jpg
// TODO: switch to Redux!

class App extends Component {

  constructor(props) {
    super(props);
    var randomIndex = _.random(0, storage.images.length - 1);
    var paramIndex = -1;
    if (props.match.params.imageId) {
      paramIndex = _.findIndex(storage.images, ['id', props.match.params.imageId])
    }
    var currentIndex = paramIndex === -1 ? randomIndex : paramIndex;
    this.state = {
      currentImage: currentIndex
    };
  }

  previousImage = () => {
    var previousIndex = this.state.currentImage === 0 ? storage.images.length-1 : this.state.currentImage - 1;
    this.changeCoverImage(previousIndex);
  }

  nextImage = () => {
    var nextIndex = this.state.currentImage + 1 === storage.images.length ? 0 : this.state.currentImage + 1;
    this.changeCoverImage(nextIndex);
  }

  changeCoverImage(index) {
    this.setState({
      ...this.state,
      currentImage: index
    });
    this.props.history.push(storage.images[index].id);
  }

  render() {
    return (
      <div className="App">
        <Cover
          imageUrl={`images/${storage.images[this.state.currentImage].fileName}`}
          onClickPrevious={this.previousImage}
          onClickNext={this.nextImage}
        />
        <ContentGrid
          image={storage.images[this.state.currentImage]}
        />
      </div>
    );
  }
}

export default App;
