import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Gallery.css';

const propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
  })),
}

class Gallery extends Component {
  componentDidMount() {
    window.$(this.refs.gallery).justifiedGallery({
      rowHeight: 250,
      maxRowHeight: 500,
      lastRow: 'justify',
      cssAnimation: true,
    });
  }

  componentDidUpdate() {
    window.$(this.refs.gallery).justifiedGallery('norewind');
  }

  render() {
    const photos = this.props.photos.map((photo) => 
      <Link key={photo.id} to={`/${photo.id}`}>
        <img alt={photo.title} src={photo.url} />
        <div className="caption">
          <div className="Caption-Text">{photo.title}</div>
        </div>
      </Link>
    );
    return (
      <div ref="gallery" className="Gallery">
        {photos}
      </div>
    );
  }
}

Gallery.propTypes = propTypes;

export default Gallery;
