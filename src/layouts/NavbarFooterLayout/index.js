import React from 'react';
import { Route } from 'react-router';
import NavBar from '../../features/NavBar';
import Footer from '../../features/Footer';
import './NavbarFooterLayout.css';

const NavbarFooterLayout = ({component: Component, navbarType, ...rest}) => (
  <Route {...rest} render={matchProps => (
    <div className="NavbarFooterLayout">
      <div className="Nav">
        <NavBar type={navbarType} />
      </div>
      <div className="Content">
       <Component {...matchProps} />
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  )} />
);

export default NavbarFooterLayout;
