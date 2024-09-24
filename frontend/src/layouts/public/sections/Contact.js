import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../../../styles/public/main.css'

const Contact = () => (
  <div className="w3-container padding-contact" id="contact">
    <h1>Contact Us</h1>
    <div className="contact-grid">
      {/* Column 1: Contact Form */}
      <div className="contact-form">
        <form>
          <p><input className="w3-input w3-padding-16" type="text" placeholder="Name" required name="Name" /></p>
          <p><input className="w3-input w3-padding-16" type="text" placeholder="Email" required name="Email" /></p>
          <p><textarea className="w3-input w3-padding-16" type="text" placeholder="Message" required name="Message" /></p>
          <div className="button-container">
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </div>
        </form>
      </div>

      {/* Column 2: Main Branch Address */}
      <div className="contact-address">
        <h3>Address</h3>
        <p>123 Main Street,</p>
        <p>City, State, ZIP</p>
        <p>Email: mainbranch@example.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>

      {/* Column 3: Branch Address */}
      <div className="contact-address">
        <h3>Show Room</h3>
        <p>456 Second Street,</p>
        <p>City, State, ZIP</p>
        <p>Email: branch@example.com</p>
        <p>Phone: (987) 654-3210</p>
      </div>
    </div>
  </div>
);

export default Contact;
