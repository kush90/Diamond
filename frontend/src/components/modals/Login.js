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

import '../../styles/public/register.css';

const Login = (props) => {
    const [phoneNo, setPhoneNo] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPhoneValid, setIsPhoneValid] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false); // State for password visibility

    const close = () => {
        props.close(false);
    };

    const handlePhoneNumberChange = (e) => {
        const number = e.target.value;
        setPhoneNo(number);
        if (number.trim() !== '') {
            const isValidThailand = isValidPhoneNumber(number, 'TH');
            const isValidMyanmar = isValidPhoneNumber(number, 'MM');
            setIsPhoneValid(isValidThailand || isValidMyanmar);
        } else {
            setIsPhoneValid(true);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const login = () => {
        let obj = {};
        obj['phoneNo'] = phoneNo;
        obj['password'] = password;
        props.close(obj);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && phoneNo && password && isPhoneValid) {
            login();
        }
    };

    // Function to clear fields
    const clearLoginFields = () => {
        setPhoneNo('');
        setPassword('');
    };

    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader className='bg-primary text-white'>
                            <MDBModalTitle className='fw-bold'>Login</MDBModalTitle>
                            <MDBBtn className='btn-close btn-close-white' color='none' onClick={close}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                wrapperClass='custom-input'
                                required
                                onKeyDown={handleKeyDown}
                                onChange={handlePhoneNumberChange}
                                value={phoneNo}
                                label='Phone no'
                            />
                            {!isPhoneValid && phoneNo.trim() !== '' && (
                                <span className='custom-error'>*Invalid phone no</span>
                            )}
                            <div className="password-input-wrapper custom-input">
                                <MDBInput
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    label='Password'
                                />
                                <MDBIcon
                                    fas
                                    icon={showPassword ? 'eye-slash' : 'eye'}
                                    className="password-toggle-icon"
                                    onClick={toggleShowPassword}
                                />
                            </div>

                            {/* Add Forgot Password link */}
                            <p className="forgot-password-link" onClick={() => {
                                    props.forgotPasswordOpen();
                                    clearLoginFields(); // Clear fields when Forgot Password is triggered
                                }}>
                                Forgot Password?
                            </p>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn disabled={props.loading} color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={props.loading || !phoneNo || !password || !isPhoneValid} onClick={login}>
                                {props.loading ? 'Loading...' : 'Login'}
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default Login;
