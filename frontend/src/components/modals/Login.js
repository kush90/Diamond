import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { createStorage, API_URL, getStorage } from "../../Helper";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [step, setStep] = useState('login'); // 'login' or 'verification'
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [timer, setTimer] = useState(0); // Timer state
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Track if the timer is running

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

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post(`${API_URL}/api/user/login`, { phoneNo, password });
            console.log('Login response:', response.data);

            // Move to verification step
            setStep('verification');
            setLoading(false);

            // Start the countdown timer for 5 minutes (300 seconds)
            setTimer(300);
            setIsTimerRunning(true);
        } catch (error) {
            setLoading(false);
            setErrorMessage(
                error.response?.data?.error || 'Login failed. Please try again.'
            );
        }
    };

    // Countdown timer logic
    useEffect(() => {
        let interval;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTime => prevTime - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            setIsTimerRunning(false);
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [isTimerRunning, timer]);

    const handleVerification = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post(`${API_URL}/api/user/verify`, {
                phoneNo,
                verificationCode,
            });
            console.log('Verification response:', response.data);

            if (response.status === 200) {
                toast.success(response.data.message);
                createStorage('user', response.data);
                let user = JSON.parse(getStorage('user'));
                if (user.type === 'Admin') navigate('/admin');
                else navigate('/admin/broker/dashboard');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage(
                error.response?.data?.error || 'Verification failed. Please try again.'
            );
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post(`${API_URL}/api/user/resend`, { phoneNo });
            toast.success(response.data.message);
            setLoading(false);

            // Reset the timer if code is resent
            setTimer(300);
            setIsTimerRunning(true);
        } catch (error) {
            setLoading(false);
            setErrorMessage(
                error.response?.data?.error || 'Failed to resend the verification code. Please try again.'
            );
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle className='text-primary'>
                                {step === 'login' ? 'Login' : 'Verification'}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {step === 'login' ? (
                                <>
                                    <MDBInput
                                        wrapperClass='custom-input'
                                        required
                                        onChange={handlePhoneNumberChange}
                                        value={phoneNo}
                                        label='Phone no'
                                    />
                                    {!isPhoneValid && phoneNo.trim() !== '' && (
                                        <span className='custom-error'>*Invalid phone no</span>
                                    )}
                                    <MDBInput
                                        wrapperClass='custom-input'
                                        type='password'
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        label='Password'
                                    />
                                    <p
                                        className="forgot-password-link"
                                        onClick={props.forgotPasswordOpen}
                                    >
                                        Forgot Password?
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="mb-2">Time remaining to resend code: {formatTime(timer)}</p>
                                    <MDBInput
                                        wrapperClass='custom-input'
                                        required
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        value={verificationCode}
                                        label='Enter Verification Code'
                                    />
                                    {errorMessage && (
                                        <span className='custom-error'>{errorMessage}</span>
                                    )}
                                    <div className="d-flex flex-column align-items-start">
                                        <MDBBtn
                                            className="mt-2"
                                            disabled={loading || isTimerRunning}
                                            color="secondary"
                                            onClick={handleResendCode}
                                        >
                                            {loading ? 'Resending...' : isTimerRunning ? 'Wait...' : 'Resend Code'}
                                        </MDBBtn>
                                    </div>
                                </>
                            )}
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            {step === 'login' ? (
                                <MDBBtn
                                    disabled={loading || !phoneNo || !password || !isPhoneValid}
                                    onClick={handleLogin}
                                >
                                    {loading ? 'Loading...' : 'Login'}
                                </MDBBtn>
                            ) : (
                                <MDBBtn
                                    disabled={loading || !verificationCode}
                                    onClick={handleVerification}
                                >
                                    {loading ? 'Verifying...' : 'Verify'}
                                </MDBBtn>
                            )}
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <ToastContainer />
        </>
    );
};

export default Login;
