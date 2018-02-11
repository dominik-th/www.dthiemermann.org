import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import Title from './Title';
import Specs from './Specs';
import './PhotoDetails.css';

class PhotoDetails extends Component {
  onMapEnter = () => {
    this.refs.map.leafletElement.setZoom(11);
  }

  onMapExit = () => {
    this.refs.map.leafletElement.setZoom(6);
  }

  onMapHover = (mouseEvent) => {
    const size = this.refs.map.leafletElement.getSize();
    const center = [size.x/2, size.y/2];
    const distance = mouseEvent.containerPoint.distanceTo(center)/size.distanceTo(center);
    if (distance < 0.15) {
      this.refs.map.leafletElement.setView(this.refs.location.props.center, 15, {animate: false});
      this.refs.location.leafletElement.setRadius(30);
    } else {
      this.refs.map.leafletElement.setZoom(11);
      this.refs.location.leafletElement.setRadius(15);
    }
  }

  render() {
    const location = [this.props.image.location.lat, this.props.image.location.long];
    return (
      <div className="Photo-Details-Container">
        <Title text={this.props.image.title} description={this.props.image.description} />
        <Container>
          <div className="Photo-Details-Wrapper">
            <div className="Flex-Item Map-Item">
              <Map
                className="Map"
                ref="map"
                zoom={6}
                center={location}
                zoomAnimation={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                boxZoom={false}
                keyboard={false}
                dragging={false}
                onMouseover={this.onMapEnter}
                onMouseout={this.onMapExit}
                onMousemove={this.onMapHover}
              >
                <TileLayer
                  url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9taW5pay10aCIsImEiOiJjajZxYnF4ZnowN25qMzJvNnAyMzF0OW13In0.wt8ntpDLnptHNro4B7S7Fg'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <CircleMarker ref="location" center={location} radius={15} color="" />
              </Map>
            </div>
            <div className="Flex-Item">
              <Specs image={this.props.image} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default PhotoDetails;
