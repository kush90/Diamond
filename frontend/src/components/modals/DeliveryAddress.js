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

const DeliveryAddress = (props) => {
    const [fullName, setFullName] = React.useState('');
    const [phoneNo, setPhoneNo] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [email, setEmail] = React.useState('');

    const [isPhoneValid, setIsPhoneValid] = React.useState(true);
    const [isEmailValid, setIsEmailValid] = React.useState(true);

    const close = () => {
        props.closeModal(false)
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

    const submit = () => {
        let obj = {};
        obj['fullName'] = fullName;
        obj['phoneNo'] = phoneNo;
        obj['address'] = address;
        obj['email'] = email;
        props.closeModal(obj);
    }

    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle  className='text-primary'>Delivery Address</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setFullName(e.target.value)} value={fullName} label='Full Name' />
                            <MDBInput wrapperClass='custom-input' required onChange={handlePhoneNumberChange} value={phoneNo} label='Phone No' />
                            {!isPhoneValid && phoneNo.trim() !== '' && (
                                <span className='custom-error'>*Invalid phone no</span>
                            )}
                            <MDBInput wrapperClass='custom-input' required onChange={handleEmailChange} value={email} label='Email' />
                            {!isEmailValid && (
                                <span className='custom-error'>*Invalid email</span>
                            )}
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setAddress(e.target.value)} value={address} label='Address' />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={(!fullName || !phoneNo || !address || !isPhoneValid || !isEmailValid)} onClick={submit}
                            >Submit</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default DeliveryAddress;