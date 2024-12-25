import React, { useState } from 'react';
import logo from "../../../assets/logo1.png"
const Navbar = (props) => {
  // State to control the visibility of the mobile dropdown
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="w3-top">
      <div className="w3-bar w3-white w3-padding w3-card navbar-container">
        {/* Title and Hamburger for small screens */}
        <div className="navbar-title">
          <img src={logo} alt='Business Alliance Hub' className='navbar-logo' />
          <a href="#home" className="w3-bar-item w3-button company-title">Business Alliance Hub</a>

          {/* Hamburger icon for mobile screens */}
          <a
            href="#!"
            className="w3-bar-item w3-button w3-hide-large w3-hide-medium hamburger"
            onClick={toggleMobileMenu}
          >
            &#9776; {/* Hamburger icon */}
          </a>
        </div>

        {/* Right-aligned items for larger screens */}
        <div className="w3-right w3-hide-small navbar-links">
          <a href="#about" className="w3-bar-item w3-button">About</a>
          <a href="#contact" className="w3-bar-item w3-button">Contact</a>
          <a href="#jewelleries" className="w3-bar-item w3-button">Jewelleries</a>
          <a href="#login" className="w3-bar-item w3-button" onClick={props.login}>Login</a>
          <a href="#register" className="w3-bar-item w3-button" onClick={props.register}>Register</a>
        </div>
      </div>

      {/* Dropdown menu for mobile, shown when hamburger is clicked */}
      {isMobileMenuOpen && (
        <div className="w3-bar-block w3-white w3-hide-large w3-hide-medium">
          <a href="#about" className="w3-bar-item w3-button" onClick={handleLinkClick}>About</a>
          <a href="#contact" className="w3-bar-item w3-button" onClick={handleLinkClick}>Contact</a>
          <a href="#jewelleries" className="w3-bar-item w3-button" onClick={handleLinkClick}>Jewelleries</a>
          <a href="#login" className="w3-bar-item w3-button" onClick={props.login}>Login</a>
          <a href="#register" className="w3-bar-item w3-button" onClick={props.register}>Register</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
