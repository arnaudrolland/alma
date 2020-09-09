import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg  sticky-top no-padding">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src="img/logo.png" />
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Notre produit
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/panier" className="cart">
                <i className="fa fa-shopping-cart "></i> Mon panier
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
