import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Grid, Paper, Button, Box, TextField, IconButton } from '@mui/material';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { getStorage, updateStorage } from '../Helper';
import { ToastContainer, toast } from 'react-toastify';
import { patch } from '../Api';
import { API_URL } from '../Helper';
import defaultImage from '../assets/default.jpeg';
import { useNavigate } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';

const Profile = () => {
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFiles(event.target.files);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage({ path: imageUrl });
    }
  };

  const handleRemoveImage = () => {
    setFiles(null);
    setNewImage(null);
    setFormData({
      ...formData,
      profile: [],
    });
  };

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

    if (showPasswordFields && passwords.newPassword) {
      if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      data.append('password', passwords.newPassword);
    }

    try {
      setLoading(true);
      let action = 'Update User';
      if (showPasswordFields) action = 'Update Password';
      let response = await patch(`api/user/update/${formData.id}?action=${action}`, data);
      if (response.status === 200) {
        toast.success(response.data.message);
        if (action === 'Update Password') {
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
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

  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
              borderRadius: 2,
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3, color: '#1976d2' }}>
              Profile Info
            </Typography>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  marginBottom: 2,
                  border: '2px solid #1976d2',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
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
              <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ gap: 1.5, width: '100%' }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Name: <span style={{ fontWeight: 400 }}>{formData.name}</span>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Email: <span style={{ fontWeight: 400 }}>{formData.email}</span>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Phone No: <span style={{ fontWeight: 400 }}>{formData.phoneNo}</span>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Address: <span style={{ fontWeight: 400 }}>{formData.address}</span>
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                  sx={{ mt: 2, alignSelf: 'flex-start' }}
                >
                  {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
                </Button>
              </Box>
            </Grid>
          </Paper>
        </MDBCol>

        {/* Right Column - Profile Update Form */}
        <MDBCol md="6">
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              maxWidth: 600,
              margin: 'auto',
              borderRadius: 2,
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3, color: '#1976d2' }}>
              {showPasswordFields ? 'Change Password' : 'Update Profile'}
            </Typography>
            <form>
              {!showPasswordFields ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                    <Avatar
                      sx={{ width: 100, height: 100, marginRight: 2, border: '2px solid #1976d2' }}
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
                    <IconButton color="error" aria-label="remove picture" onClick={handleRemoveImage}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>

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
                  <div className="password-input-wrapper custom-input">
                    <TextField
                      label="New Password"
                      name="newPassword"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <MDBIcon
                      fas
                      icon={showPassword ? 'eye-slash' : 'eye'}
                      className="password-toggle-icon"
                      style={{ top: '40%' }}
                      onClick={handlePasswordVisibility}
                    />
                  </div>
                  <div className="password-input-wrapper custom-input">
                    <TextField
                      label="Confirm New Password"
                      name="confirmPassword"
                      variant="outlined"
                      type={showConfirmPassword ? 'text' : 'password'}
                      fullWidth
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <MDBIcon
                      fas
                      icon={showConfirmPassword ? 'eye-slash' : 'eye'}
                      className="password-toggle-icon"
                      style={{ top: '40%' }}
                      onClick={handleConfirmPasswordVisibility}
                    />
                  </div>
                </>
              )}

              <Button variant="contained" color="primary" onClick={save} disabled={loading} sx={{ mt: 2 }}>
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