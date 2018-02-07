import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Mousetrap from 'mousetrap';
import { Icon } from 'semantic-ui-react';
import './Cover.css';

class Cover extends Component {

  componentWillMount() {
    Mousetrap.bind(['left', 'a'], (event) => {
      this.props.history.push(this.props.prevImage.id);
    });
    Mousetrap.bind(['right', 'd'], (event) => {
      this.props.history.push(this.props.nextImage.id);
    });
  }

  componentWillUnmount() {
    Mousetrap.unbind(['left', 'a', 'right', 'd']);
  }

  render() {
    var coverStyle = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0) 90%, rgba(34,34,34,1) 100%), url(${this.props.imageUrl})`
    }
    return (
      <div className="Cover" style={coverStyle}>
        <div className="Image-Controls">
          <Link to={this.props.prevImage.id}><div className="Prev-Image Control"><Icon size='huge' name='angle left'/></div></Link>
          <Link to={this.props.nextImage.id}><div className="Next-Image Control"><Icon size='huge' name='angle right'/></div></Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Cover);
