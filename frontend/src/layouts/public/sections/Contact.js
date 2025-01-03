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
          <h3><LocationOnIcon className="icon" /> Office (Mogok Ruby Queen)</h3>
          <p><strong>Address:</strong></p>
          <p>
            <ApartmentIcon className='icon'  />
            981 Silom Rd Khwaeng Silom, Khet Bang Rak, Bangkok, Thailand, 10500
          </p>          
          {/* <p style={{ marginLeft: '35px' }} >Bangkok, Thailand, 10500</p> */}
          <p><EmailIcon className="icon" /> info@businessalliancehub.com</p>
          <p><PhoneIcon className="icon" /> (987) 654-3210</p>
          <p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.9250632449525!2d100.5181148518376!3d13.722792293484636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2d53eebdc1%3A0x401d4628694c9ecd!2sHoliday%20Inn%20Bangkok%20Silom%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2sth!4v1728999914646!5m2!1sen!2sth" width="100%" height="250"  style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </p>
        </div>

        {/* Column 3: Branch Address */}
        <div className="contact-address">
          <h3><LocationOnIcon className="icon" /> Show Room (Mogok Ruby Queen)</h3>
          <p><strong>Address:</strong></p>
          <p>
            <ApartmentIcon className='icon'  />
            981 Silom Rd Khwaeng Silom, Khet Bang Rak, Bangkok, Thailand, 10500
          </p>          
          {/* <p style={{ marginLeft: '35px' }} >Bangkok, Thailand, 10500</p> */}
          <p><EmailIcon className="icon" /> info@businessalliancehub.com</p>
          <p><PhoneIcon className="icon" /> (987) 654-3210</p>
          <p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.9250632449525!2d100.5181148518376!3d13.722792293484636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2d53eebdc1%3A0x401d4628694c9ecd!2sHoliday%20Inn%20Bangkok%20Silom%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2sth!4v1728999914646!5m2!1sen!2sth" width="100%" height="250"  style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
