import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';

class Photos extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
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
