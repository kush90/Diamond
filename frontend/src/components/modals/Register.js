import React, { useRef } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdb-react-ui-kit';
import { isValidPhoneNumber } from 'libphonenumber-js';

import '../../styles/public/register.css'
import { API_URL } from '../../Helper';

const Register = (props) => {
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNo, setPhoneNo] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [profile, setProfile] = React.useState([]);
    const [imgUrl, setImgUrl] = React.useState([]);

    const [isPhoneValid, setIsPhoneValid] = React.useState(true);
    const [isEmailValid, setIsEmailValid] = React.useState(true);

    const [showPassword, setShowPassword] = React.useState(false); // State for password visibility

    const ref = useRef();

    const close = () => {
        props.close(false)
    }

    const uploadProfile = (e) => {
        setProfile(e.target.files)
        let newArr = [];
        for (let i = 0; i < e.target.files.length; i++) {

            newArr.push({ name: e.target.files[i].name, type: e.target.files[i].type, path: URL.createObjectURL(e.target.files[i]), new: true });
        }
        setImgUrl(newArr);
    }

    const removeImage = (name) => {
        let newArr = imgUrl.filter((img) => { return img.name !== name });
        let newFile = [];
        for (const file of profile) {
            if (file.name !== name) newFile.push(file)
        }
        setImgUrl(newArr);
        setProfile(newFile)
    }

    const save = () => {
        let newFormData = new FormData();
        newFormData.append('name', name)
        newFormData.append('password', password)
        newFormData.append('phoneNo', phoneNo)
        newFormData.append('email', email)
        newFormData.append('address', address)
        for (const file of profile) {
            newFormData.append('files', file);
        }
        props.close(newFormData)
    }

    const handlePhoneNumberChange = (e) => {
        const number = e.target.value;
        setPhoneNo(number);
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
        setEmail(inputEmail);
        // Validate email format only if not empty
        if (inputEmail.trim() === '') {
            setIsEmailValid(true); // Empty email is considered valid
        } else {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
            setIsEmailValid(isValidEmail);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !props.loading && name && password && phoneNo && isPhoneValid && isEmailValid) {
            save();
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
        <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} className='auth-modal'>
            <MDBModalDialog centered>
                <MDBModalContent className='shadow-5-strong rounded-lg'>
                    {/* Enhanced Header */}
                    <MDBModalHeader className='bg-gradient-primary text-white py-4'>
                        <div className="w-100 text-center position-relative">
                            <MDBModalTitle className='fw-bold mb-1 h3'>Create Account</MDBModalTitle>
                            <p className="mb-0 small">Join our community today</p>
                            <MDBBtn 
                                className='btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2' 
                                color='none' 
                                onClick={close}
                            />
                        </div>
                    </MDBModalHeader>

                    <MDBModalBody className='px-4 py-3' onKeyDown={handleKeyDown}>
                        {/* Name Input */}
                        <div className='mb-4'>
                            <MDBInput
                                wrapperClass='custom-input-group'
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                label='Full Name'
                                size='lg'
                                className='rounded-pill'
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4 position-relative">
                            <MDBInput
                                type={showPassword ? 'text' : 'password'}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                label='Password'
                                size='lg'
                                className='rounded-pill'
                            />
                            <MDBIcon
                                fas
                                icon={showPassword ? 'eye-slash' : 'eye'}
                                className="position-absolute end-0 top-50 translate-middle-y me-3"
                                style={{ 
                                    cursor: 'pointer', 
                                    color: '#6c757d',
                                    transition: 'color 0.3s ease'
                                }}
                                onClick={toggleShowPassword}
                            />
                        </div>

                        {/* Phone Input */}
                        <div className='mb-4'>
                            <MDBInput
                                wrapperClass='custom-input-group'
                                required
                                onChange={handlePhoneNumberChange}
                                value={phoneNo}
                                label='Phone Number'
                                size='lg'
                                className='rounded-pill'
                                style={{
                                    borderColor: isPhoneValid ? '#e0e0e0' : '#ff4444',
                                    transition: 'border-color 0.3s ease'
                                }}
                            />
                            {!isPhoneValid && phoneNo.trim() !== '' && (
                                <div className='d-flex align-items-center mt-2 text-danger small'>
                                    <MDBIcon icon='exclamation-circle' className='me-2' />
                                    <span>Please enter a valid phone number</span>
                                </div>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className='mb-4'>
                            <MDBInput
                                wrapperClass='custom-input-group'
                                required
                                onChange={handleEmailChange}
                                value={email}
                                label='Email'
                                size='lg'
                                className='rounded-pill'
                                style={{
                                    borderColor: isEmailValid ? '#e0e0e0' : '#ff4444',
                                    transition: 'border-color 0.3s ease'
                                }}
                            />
                            {!isEmailValid && (
                                <div className='d-flex align-items-center mt-2 text-danger small'>
                                    <MDBIcon icon='exclamation-circle' className='me-2' />
                                    <span>Please enter a valid email address</span>
                                </div>
                            )}
                        </div>

                        {/* Address Input */}
                        <div className='mb-4'>
                            <MDBInput
                                wrapperClass='custom-input-group'
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                label='Address'
                                size='lg'
                                className='rounded-pill'
                            />
                        </div>

                        {/* Profile Upload */}
                        <div className='mb-4'>
                            <label htmlFor="file-upload" className="btn btn-primary rounded-pill w-100 gradient-btn">
                                <MDBIcon fas icon="cloud-upload-alt" className='me-2' />
                                Upload Profile Image
                            </label>
                            <input 
                                accept='image/*' 
                                ref={ref} 
                                id="file-upload" 
                                type="file" 
                                onChange={(e) => uploadProfile(e)}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {/* Image Previews */}
                        <MDBContainer className='product-modal-img-list mt-3'>
                            <MDBRow>
                                {imgUrl.map((img, index) => (
                                    <MDBCol key={index} lg='4' md='12' className='mb-4 set-relative'>
                                        <MDBIcon 
                                            fas 
                                            icon="times-circle" 
                                            color='danger' 
                                            className='delete-btn' 
                                            onClick={() => removeImage(img.name)} 
                                        />
                                        <img
                                            src={img?.new ? img.path : `${API_URL}/${img.path}`}
                                            className='img-fluid shadow-2-strong rounded-4 custom-img'
                                            alt={img.name}
                                        />
                                    </MDBCol>
                                ))}
                            </MDBRow>
                        </MDBContainer>
                    </MDBModalBody>

                    {/* Enhanced Footer */}
                    <MDBModalFooter className='d-flex justify-content-between px-4 py-3 border-top-0'>
                        <MDBBtn 
                            color='light' 
                            onClick={close}
                            className='rounded-pill px-4 border-secondary'
                            outline
                            style={{
                                borderColor: '#6c757d',
                                color: '#6c757d'
                            }}
                        >
                            Close
                        </MDBBtn>
                        <MDBBtn 
                            disabled={props.loading || !name || !password || !phoneNo || !isPhoneValid || !isEmailValid} 
                            onClick={save}
                            className='rounded-pill px-5 gradient-btn'
                            style={{ 
                                background: 'linear-gradient(45deg, #3b71ca, #14a44d)',
                                border: 'none',
                                color: 'white',
                                transition: 'transform 0.2s ease'
                            }}
                        >
                            {props.loading ? (
                                <div className="d-flex align-items-center">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                                    Registering...
                                </div>
                            ) : (
                                'Register'
                            )}
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </>
    );
}

export default Register;