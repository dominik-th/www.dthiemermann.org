import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import './Cover.css';

class Cover extends Component {
  render() {
    var coverStyle = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0) 90%, rgba(34,34,34,1) 100%), url(${this.props.imageUrl})`
    }
    return (
      <div className="Cover" style={coverStyle}>
        <div className="Image-Controls">
          <div className="Prev-Image Control" onClick={this.props.onClickPrevious}><Icon size='huge' name='angle left'/></div>
          <div className="Next-Image Control" onClick={this.props.onClickNext}><Icon size='huge' name='angle right'/></div>
        </div>
      </div>
    );
  }
}

export default Cover;
