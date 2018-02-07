import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../features/NavBar';

class Photos extends Component {
  render() {
    return (
      <div>
        <NavBar />
        Photos
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const stateProps = {
  };
  return stateProps;
};

export default connect(
  mapStateToProps
)(Photos);
