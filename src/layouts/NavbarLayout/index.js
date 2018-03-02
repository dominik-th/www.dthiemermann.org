import React from 'react';
import { Route } from 'react-router';
import NavBar from '../../features/NavBar';
import './NavbarLayout.css';

const NavbarLayout = ({component: Component, navbarType, ...rest}) => (
  <Route {...rest} render={matchProps => (
    <div className="NavbarLayout">
      <div className="Nav">
        <NavBar type={navbarType} />
      </div>
      <div className="Content">
       <Component {...matchProps} />
      </div>
    </div>
  )} />
);

export default NavbarLayout;
