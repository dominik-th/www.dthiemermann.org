import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
 * Helper component to fix react-router <Link> usage in leaflet popups
 * See:
 * https://github.com/PaulLeCam/react-leaflet/issues/310
 * https://stackoverflow.com/a/45143614
 */

const propTypes = {
  context: PropTypes.object.isRequired,
}

const childContextTypes = {
  router: PropTypes.object.isRequired,
}

class RouterForwarder extends Component {
  getChildContext() {
    return this.props.context
  }

  render() {
    return <span>{this.props.children}</span>
  }
}

RouterForwarder.childContextTypes = childContextTypes;
RouterForwarder.propTypes = propTypes;

export default RouterForwarder;
