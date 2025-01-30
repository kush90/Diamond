import React from 'react';
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
    MDBIcon
} from 'mdb-react-ui-kit';
import { isValidPhoneNumber } from 'libphonenumber-js';

import '../../styles/public/register.css'

const ForgotPassword = (props) => {
    const [phoneNo, setPhoneNo] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPhoneValid, setIsPhoneValid] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false); // State for password visibility

    const close = () => {
        props.close(false)
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

    const login = () => {
        let obj = {};
        obj['phoneNo'] = phoneNo;
        obj['password'] = password;
        props.close(obj);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !props.loading && phoneNo && password && isPhoneValid) {
            login();
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
        <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} className='auth-modal'>
            <MDBModalDialog centered>
                <MDBModalContent className='shadow-5-strong rounded-lg' style={{height:'385px'}}>
                    {/* Enhanced Header */}
                    <MDBModalHeader className='bg-gradient-primary text-white py-4'>
                        <div className="w-100 text-center position-relative">
                            <MDBModalTitle className='fw-bold mb-1 h3'>Reset Password</MDBModalTitle>
                            <p className="mb-0 small">Enter your details to reset password</p>
                            <MDBBtn 
                                className='btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2' 
                                color='none' 
                                onClick={close}
                            />
                        </div>
                    </MDBModalHeader>

                    <MDBModalBody className='px-4 py-3'>
                        {/* Phone Input with Matching Styling */}
                        <div className='mb-4'>
                            <MDBInput
                                wrapperClass='custom-input-group'
                                required
                                onKeyDown={handleKeyDown}
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

                        {/* Password Input with Matching Styling */}
                        <div className="mb-4 position-relative">
                            <MDBInput
                                type={showPassword ? 'text' : 'password'}
                                required
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                label='New Password'
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
                    </MDBModalBody>

                    {/* Enhanced Footer Matching Login Style */}
                    <MDBModalFooter className='d-flex justify-content-between px-4 py-3 border-top-0'>
                        <MDBBtn 
                            color='light' 
                            onClick={close}
                            className='rounded-pill px-4 border-secondary'
                            outline
                            style={{
                                borderColor: '#6c757d', // Explicit border color
                                color: '#6c757d' // Darker text color
                            }}
                        >
                            Close
                        </MDBBtn>
                        <MDBBtn 
                            disabled={props.loading || !phoneNo || !password || !isPhoneValid} 
                            onClick={login}
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
                                    Resetting...
                                </div>
                            ) : (
                                'Reset Password'
                            )}
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </>
    );
}

export default ForgotPassword;