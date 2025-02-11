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
import { motion } from 'framer-motion';

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
    if (number.trim() !== '') {
      const isValidThailand = isValidPhoneNumber(number, 'TH');
      const isValidMyanmar = isValidPhoneNumber(number, 'MM');
      setIsPhoneValid(isValidThailand || isValidMyanmar);
    } else {
      setIsPhoneValid(true);
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setFormData({
      ...formData,
      email: inputEmail,
    });
    if (inputEmail.trim() === '') {
      setIsEmailValid(true);
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
    if (!isPhoneValid || !isEmailValid) return;

    try {
      setLoading(true);
      const response = await post('api/feedback/create', formData, 'public');
      if (response.status === 200) {
        toast.success(response.data.message);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setLoading(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w3-container"
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="slider-heading" style={{ color: '#007bff', textAlign: 'center', marginBottom: '2rem' }}>
        Contact Us
      </h1>
      <div className="contact-grid">
        {/* Column 1: Contact Form */}
        <motion.div
          className="contact-form card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
            padding: '2rem', 
            borderRadius: '12px', 
            backgroundColor: '#fff' 
          }}
        >
          <form onSubmit={submitForm}>
            <p>
              <input
                className="w3-input w3-padding-16 input-bold"
                type="text"
                placeholder="Name"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  padding: '12px', 
                  fontSize: '16px' 
                }}
              />
            </p>
            <p>
              <input
                className="w3-input w3-padding-16 input-bold"
                type="text"
                placeholder="Email"
                required
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                style={{ 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  padding: '12px', 
                  fontSize: '16px' 
                }}
              />
              {!isEmailValid && (
                <span className="custom-error" style={{ color: '#ff4444', fontSize: '14px', marginTop: '4px' }}>
                  *Invalid email
                </span>
              )}
            </p>
            <p>
              <input
                className="w3-input w3-padding-16 input-bold"
                type="text"
                placeholder="Phone No"
                required
                name="phone"
                value={formData.phone}
                onChange={handlePhoneNumberChange}
                style={{ 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  padding: '12px', 
                  fontSize: '16px' 
                }}
              />
              {!isPhoneValid && (
                <span className="custom-error" style={{ color: '#ff4444', fontSize: '14px', marginTop: '4px' }}>
                  *Invalid phone number
                </span>
              )}
            </p>
            <p>
              <textarea
                className="w3-input w3-padding-16 input-bold"
                placeholder="Message"
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={{ 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd', 
                  padding: '12px', 
                  fontSize: '16px', 
                  minHeight: '120px' 
                }}
              />
            </p>
            <div className="button-container">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                fullWidth
                disabled={loading}
                style={{ 
                  backgroundColor: '#007bff', 
                  color: '#fff', 
                  boxShadow: '0 4px 6px rgba(0, 123, 255, 0.3)', 
                  padding: '12px', 
                  fontSize: '16px', 
                  borderRadius: '8px', 
                  textTransform: 'none' 
                }}
              >
                {loading ? 'Loading...' : 'Send'}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Column 2: Main Branch Address */}
        <motion.div
          className="contact-address card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
            padding: '2rem', 
            borderRadius: '12px', 
            backgroundColor: '#fff' 
          }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#007bff' }}>
            <LocationOnIcon className="icon" /> Office (Mogok Ruby Queen)
          </h3>
          <p><strong>Address:</strong></p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ApartmentIcon className="icon" /> 981 Silom Rd, Bangkok, Thailand
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EmailIcon className="icon" /> <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>info.businessalliancehub@gmail.com</span>
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PhoneIcon className="icon" /><a href="tel:+66639206269">+66 63 920 6269</a>
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.9250632449525!2d100.5181148518376!3d13.722792293484636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2d53eebdc1%3A0x401d4628694c9ecd!2sHoliday%20Inn%20Bangkok%20Silom%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2sth!4v1728999914646!5m2!1sen!2sth"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Column 3: Show Room Address */}
        <motion.div
          className="contact-address card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
            padding: '2rem', 
            borderRadius: '12px', 
            backgroundColor: '#fff' 
          }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#007bff' }}>
            <LocationOnIcon className="icon" /> Show Room (Mogok Ruby Queen)
          </h3>
          <p><strong>Address:</strong></p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ApartmentIcon className="icon" /> 981 Silom Rd, Bangkok, Thailand
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EmailIcon className="icon" /><span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>info.businessalliancehub@gmail.com</span>
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PhoneIcon className="icon" /> <a href="tel:+66639206269">+66 63 920 6269</a>
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.9250632449525!2d100.5181148518376!3d13.722792293484636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2d53eebdc1%3A0x401d4628694c9ecd!2sHoliday%20Inn%20Bangkok%20Silom%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2sth!4v1728999914646!5m2!1sen!2sth"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Contact;