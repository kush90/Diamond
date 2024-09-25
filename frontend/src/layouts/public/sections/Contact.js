import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import '../../../styles/public/main.css';
import { ToastContainer, toast } from 'react-toastify';
import { post } from '../../../Api';
import { isValidPhoneNumber } from 'libphonenumber-js';
import {
  MDBIcon
} from 'mdb-react-ui-kit';
const Contact = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isPhoneValid, setIsPhoneValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);

  const handlePhoneNumberChange = (e) => {
    const number = e.target.value;
    setFormData({
      ...formData,
      phone: number,
    });
    // Validate phone number format for Thailand and Myanmar if not empty
    if (number.trim() !== '') {
      const isValidThailand = isValidPhoneNumber(number, 'TH');
      const isValidMyanmar = isValidPhoneNumber(number, 'MM');
      setIsPhoneValid(isValidThailand || isValidMyanmar);
    } else {
      setIsPhoneValid(true); // Reset to valid if empty
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setFormData({
      ...formData,
      email: inputEmail,
    });
    // Validate email format only if not empty
    if (inputEmail.trim() === '') {
      setIsEmailValid(true); // Empty email is considered valid
    } else {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
      setIsEmailValid(isValidEmail);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    // Prevent submission if phone or email is invalid
    if (!isPhoneValid) {
      return;
    }
    if (!isEmailValid) {
      return;
    }
    try {
      setLoading(true);
      let response = await post('api/feedback/create', formData, 'public');
      if (response.status === 200) {
        console.log(response.data.data);
        toast.success(response.data.message);
        setFormData({ name: '', email: '', phone: '', message: '' });  // Clear form fields
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="w3-container padding-contact" id="contact">
      <h1>Contact Us</h1>
      <div className="contact-grid">
        {/* Column 1: Contact Form */}
        <div className="contact-form">
          <form onSubmit={submitForm}>
            <p>
              <input
                className="w3-input w3-padding-16"
                type="text"
                placeholder="Name"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                className="w3-input w3-padding-16"
                type="text"
                placeholder="Email"
                required
                name="email"
                value={formData.email}
                onChange={handleEmailChange} />
              {!isEmailValid && (
                <span className='custom-error'>*Invalid email</span>
              )}
            </p>
            <p>
              <input
                className="w3-input w3-padding-16"
                type="text"
                placeholder="Phone No"
                required
                name="phone"
                value={formData.phone}
                onChange={handlePhoneNumberChange} />
              {!isPhoneValid && (
                <span className='custom-error'>*Invalid phone no</span>
              )}
            </p>
            <p>
              <textarea
                className="w3-input w3-padding-16"
                placeholder="Message"
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </p>
            <div className="button-container">
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                {loading ? 'Loading...' : 'Send'}

              </Button>
            </div>
          </form>
        </div>

        {/* Column 2: Main Branch Address */}
        <div className="contact-address">
          <h3><LocationOnIcon className="icon" /> Office</h3>
          <p><strong>Address:</strong></p>
          <p>
            <ApartmentIcon className='icon' style={{ marginRight: '10px' }} />
            123 Main Street,
          </p>          
          <p style={{ marginLeft: '35px' }} >City, State, ZIP</p>
          <p><EmailIcon className="icon" /> branch@example.com</p>
          <p><PhoneIcon className="icon" /> (987) 654-3210</p>
        </div>

        {/* Column 3: Branch Address */}
        <div className="contact-address">
          <h3><LocationOnIcon className="icon" /> Show Room</h3>
          <p><strong>Address:</strong></p>
          <p>
            <ApartmentIcon className='icon' style={{ marginRight: '10px' }} />
            123 Main Street,
          </p>          
          <p style={{ marginLeft: '35px' }} >City, State, ZIP</p>
          <p><EmailIcon className="icon" /> branch@example.com</p>
          <p><PhoneIcon className="icon" /> (987) 654-3210</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
