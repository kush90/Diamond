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

const ForgotPassword = (props) => {
    const [phoneNo, setPhoneNo] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPhoneValid, setIsPhoneValid] = React.useState(true);

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

    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog>
                    <MDBModalContent style={{ height: '313.94px' }}>
                        <MDBModalHeader>
                            <MDBModalTitle>Forgot Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody >
                            <MDBInput wrapperClass='custom-input' required onKeyDown={handleKeyDown} onChange={handlePhoneNumberChange} value={phoneNo} label='Phone no' />
                            {!isPhoneValid && phoneNo.trim() !== '' && (
                                <span className='custom-error'>*Invalid phone no</span>
                            )}
                            <MDBInput wrapperClass='custom-input' type='password' onKeyDown={handleKeyDown} required onChange={(e) => setPassword(e.target.value)} value={password} label='Password' />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn disabled={props.loading} color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={(props.loading || !phoneNo || !password || !isPhoneValid)} onClick={login}
                            >{props.loading ? 'Loading...' : 'Submit'}</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ForgotPassword;