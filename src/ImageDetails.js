import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { MdPhotoCamera, MdCamera, MdTimer, MdVisibility, MdIso, MdFlashOn, MdFlashOff } from 'react-icons/lib/md';
import './ImageDetails.css';

class ImageDetails extends Component {
  render() {
    return (
      <div className="Image-Details">
        <Header color='teal' size='large'>{ this.props.image.title }</Header>
        <div className='Specifications'>
          <div data-tooltip='Camera model'>
            <MdPhotoCamera className='Specs-Icon' />
            { this.props.image.cameraModel }
          </div>
          <div data-tooltip='Aperture'>
            <MdCamera className='Specs-Icon' />
            { this.props.image.aperture }
          </div>
          <div data-tooltip='Exposure time'>
            <MdTimer className='Specs-Icon' />
            { this.props.image.exposure }
          </div>
          <div data-tooltip='Focal length'>
            <MdVisibility className='Specs-Icon' />
            { this.props.image.focalLength }
          </div>
          <div data-tooltip='ISO'>
            <MdIso className='Specs-Icon' />
            { this.props.image.iso }
          </div>
          <div data-tooltip='Flash'>
            <MdFlashOn className='Specs-Icon' />
            Did fire
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetails;
