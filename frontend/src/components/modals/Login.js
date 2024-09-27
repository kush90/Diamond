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
    MDBInput
} from 'mdb-react-ui-kit';
import { isValidPhoneNumber } from 'libphonenumber-js';

import '../../styles/public/register.css'

const Login = (props) => {
    const [phoneNo, setPhoneNo] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPhoneValid, setIsPhoneValid] = React.useState(true);

    const close = () => {
        props.close(false)
    }

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

    const login = () => {
        let obj = {};
        obj['phoneNo'] = phoneNo;
        obj['password'] = password;
        props.close(obj);
    }

    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle className='text-primary'>Login</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput wrapperClass='custom-input' disabled required onChange={handlePhoneNumberChange} value={phoneNo} label='Phone no' />
                            {!isPhoneValid && phoneNo.trim() !== '' && (
                                <span className='custom-error'>*Invalid phone no</span>
                            )}
                            <MDBInput wrapperClass='custom-input' disabled type='password' required onChange={(e) => setPassword(e.target.value)} value={password} label='Password' />

                            {/* Add Forgot Password link */}
                            <p className="forgot-password-link" onClick={props.forgotPasswordOpen}>
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
}

export default Login;