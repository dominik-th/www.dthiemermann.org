import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { MdPhotoCamera, MdCamera, MdTimer, MdVisibility, MdIso, MdFlashOn, MdFlashOff } from 'react-icons/lib/md';
import './ImageDetails.css';

const flashFiredExifValues = [1,5,7,9,13,15,25,29,31,65,69,71,73,77,79,89,93,95];

class ImageDetails extends Component {
  render() {
    return (
      <div className="Image-Details">
        <Header color='teal' size='large'>{ this.props.image.title }</Header>
        <div className='Specifications'>
          <div data-tooltip='Camera model'>
            <MdPhotoCamera className='Specs-Icon' />
            { this.props.image.cameraMake } { this.props.image.cameraModel }
          </div>
          <div data-tooltip='Aperture'>
            <MdCamera className='Specs-Icon' />
            &fnof;/{ this.props.image.aperture.toFixed(1) }
          </div>
          <div data-tooltip='Exposure time'>
            <MdTimer className='Specs-Icon' />
            1/{ Math.round(1/this.props.image.exposure) } sec.
          </div>
          <div data-tooltip='Focal length'>
            <MdVisibility className='Specs-Icon' />
            { this.props.image.focalLength } mm
          </div>
          <div data-tooltip='ISO'>
            <MdIso className='Specs-Icon' />
            { this.props.image.iso }
          </div>
          {flashFiredExifValues.indexOf(this.props.image.flash) !== -1 ? (
            <div data-tooltip='Flash'>
              <MdFlashOn className='Specs-Icon' />
              Did fire
            </div>
          ) : (
            <div data-tooltip='Flash'>
              <MdFlashOff className='Specs-Icon' />
              Did not fire
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ImageDetails;
