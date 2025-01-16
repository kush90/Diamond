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
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle className='text-primary'>Register</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody onKeyDown={handleKeyDown}>
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setName(e.target.value)} value={name} label='Name' />
                            <div className="password-input-wrapper custom-input">
                                <MDBInput wrapperClass='custom-input' type={showPassword ? 'text' : 'password'} required onChange={(e) => setPassword(e.target.value)} value={password} label='Password' />
                                <MDBIcon
                                    fas
                                    icon={showPassword ? 'eye-slash' : 'eye'}
                                    className="password-toggle-icon"
                                    onClick={toggleShowPassword}
                                />
                            </div>
                            <MDBInput wrapperClass='custom-input' required onChange={handlePhoneNumberChange} value={phoneNo} label='Phone No' />
                            {!isPhoneValid && phoneNo.trim() !== '' && (
                                <span className='custom-error'>*Invalid phone no</span>
                            )}
                            <MDBInput wrapperClass='custom-input' required onChange={handleEmailChange} value={email} label='Email' />
                            {!isEmailValid && (
                                <span className='custom-error'>*Invalid email</span>
                            )}
                            <MDBInput wrapperClass='custom-input' onChange={(e) => setAddress(e.target.value)} value={address} label='Address' />
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"></i> <span>Upload Profile Image</span>
                            </label>
                            <input accept='image/*' ref={ref} id="file-upload" type="file" onChange={(e) => uploadProfile(e)} />
                            <MDBContainer className='product-modal-img-list'>
                                <MDBRow>
                                    {
                                        (imgUrl && imgUrl.length > 0) && imgUrl.map((img, index) => {

                                            return (
                                                <MDBCol key={index} lg='4' md='12' className='mb-4 set-relative'>
                                                    <MDBIcon fas icon="times-circle" color='danger' className='delete-btn' onClick={() => removeImage(img.name)} />

                                                    <img
                                                        src={img?.new ? img.path : `${API_URL}/${img.path}`}
                                                        className='img-fluid shadow-2-strong rounded-4 custom-img'
                                                        alt={img.name}
                                                    />
                                                </MDBCol>
                                            )
                                        })
                                    }
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn disabled={props.loading} color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={(props.loading || !name || !password || !phoneNo || !isPhoneValid || !isEmailValid)} onClick={save}
                            >{props.loading ? 'Loading...' : 'Register'}</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default Register;