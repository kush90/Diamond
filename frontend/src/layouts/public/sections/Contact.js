import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../../../styles/public/main.css';
import { ToastContainer, toast } from 'react-toastify';
import { post } from '../../../Api';

const Contact = () =>  {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(formData);
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
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                className="w3-input w3-padding-16"
                type="text"
                placeholder="Phone No"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
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
      <ToastContainer />
    </div>
  );
};

export default Contact;
