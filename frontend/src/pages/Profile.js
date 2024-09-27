import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Grid, Paper, Button, Box, TextField, IconButton } from '@mui/material';
import {
  MDBRow, MDBCol,
} from 'mdb-react-ui-kit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { getStorage, updateStorage } from '../Helper';
import { ToastContainer, toast } from 'react-toastify';
import { patch } from '../Api';
import { API_URL } from '../Helper';
import defaultImage from '../assets/default.jpeg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false); // For toggling password fields
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' }); // For password inputs

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phoneNo: '',
    address: '',
    file: null,
    profile: '',
    type: '',
  });

  // Handle profile image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFiles(event.target.files);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage({ path: imageUrl });
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setFiles(null);
    setNewImage(null);
    setFormData({
      ...formData,
      profile: [],
    });
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let user = JSON.parse(getStorage('user')) || {};
    if (user) {
      setFormData({
        id: user.id || '',
        name: user.user || '',
        email: user.email || '',
        phoneNo: user.phone || '',
        address: user.address || '',
        file: user.file || '',
        profile: user.profile || '',
        type: user.type || '',
      });
    }
  }, []);

  const save = async () => {
    if (!showPasswordFields && (formData.name === '' || formData.address === '')) {
      return;
    }

    const data = new FormData();
    data.append('id', formData.id);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phoneNo', formData.phoneNo);
    data.append('address', formData.address);

    let path = [];
    for (const url of formData.profile) {
      if (!url.hasOwnProperty('new')) path.push(url);
    }
    data.append('profile', JSON.stringify(path));

    if (files) {
      for (const file of files) {
        data.append('files', file);
      }
    }

    // Handle password change
    if (showPasswordFields && passwords.newPassword) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      data.append('password', passwords.newPassword);
    }

    try {
      setLoading(true);
      console.log(showPasswordFields)
      let action = 'Update User';
      if(showPasswordFields) action = 'Update Password'
      let response = await patch(`api/user/update/${formData.id}?action=${action}`, data);
      if (response.status === 200) {
        toast.success(response.data.message);
        if(action === 'Update Password'){
          setTimeout(() => {
            navigate('/');  // Redirect after showing the toast
          }, 1500);
        }
        else {
          updateStorage('user', response.data.data);
          window.dispatchEvent(
            new StorageEvent('storage', {
              key: 'user',
              newValue: JSON.stringify(response.data.data),
            })
          );
        }
       
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
    <>
      <MDBRow className="custom-margin-top">
        {/* Left Column - Profile Information */}
        <MDBCol md="6">
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              maxWidth: 600,
              margin: 'auto',
              marginBottom: 3,
            }}
          >
            <Typography variant="h6" className="text-primary" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Profile Info
            </Typography>
            <Grid container direction="column" alignItems="center">
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  marginBottom: 2,
                }}
                src={
                  newImage && newImage.path
                    ? newImage.path
                    : formData.profile?.length > 0
                    ? `${API_URL}/${formData.profile[0].path}`
                    : defaultImage
                }
                alt="Profile Picture"
              />
              <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ gap: 1 }}>
                <Typography variant="h6">
                  Name: <span style={{ fontWeight: 400 }}>{formData.name}</span>
                </Typography>
                <Typography variant="h6">
                  Email: <span style={{ fontWeight: 400 }}>{formData.email}</span>
                </Typography>
                <Typography variant="h6">
                  Phone No: <span style={{ fontWeight: 400 }}>{formData.phoneNo}</span>
                </Typography>
                <Typography variant="h6">
                  Address: <span style={{ fontWeight: 400 }}>{formData.address}</span>
                </Typography>

                {/* Change Password Button */}
                <Button variant="contained" color="success" onClick={() => setShowPasswordFields(!showPasswordFields)}>
                  {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
                </Button>
              </Box>
            </Grid>
          </Paper>
        </MDBCol>

        {/* Right Column - Profile Update Form */}
        <MDBCol md="6">
          <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h6" className="text-primary" sx={{ fontWeight: 600, marginBottom: 2 }}>
              {showPasswordFields ? 'Change Password' : 'Update Profile'}
            </Typography>
            <form>
              {/* Conditional Rendering */}
              {!showPasswordFields ? (
                <>
                  {/* Image Update Section */}
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Avatar
                      sx={{ width: 100, height: 100, marginRight: 2 }}
                      src={
                        newImage && newImage.path
                          ? newImage.path
                          : formData.profile?.length > 0
                          ? `${API_URL}/${formData.profile[0].path}`
                          : defaultImage
                      }
                      alt="Profile Picture"
                    />
                    <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleImageChange} />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    <IconButton color="secondary" aria-label="remove picture" onClick={handleRemoveImage}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  {/* Form Fields */}
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={formData.name}
                    error={!formData.name}
                    helperText={!formData.name ? 'Name is required' : ''}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Phone No"
                    name="phoneNo"
                    variant="outlined"
                    fullWidth
                    value={formData.phoneNo}
                    onChange={handleChange}
                    disabled
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Address"
                    name="address"
                    variant="outlined"
                    fullWidth
                    value={formData.address}
                    onChange={handleChange}
                    error={!formData.address}
                    helperText={!formData.address ? 'Address is required' : ''}
                    sx={{ marginBottom: 2 }}
                  />
                </>
              ) : (
                <>
                  {/* Password Fields */}
                  <TextField
                    label="New Password"
                    name="newPassword"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Confirm New Password"
                    name="confirmPassword"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    sx={{ marginBottom: 2 }}
                  />
                </>
              )}

              {/* Save Button */}
              <Button variant="contained" color="primary" onClick={save} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </form>
          </Paper>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </>
  );
};

export default Profile;
