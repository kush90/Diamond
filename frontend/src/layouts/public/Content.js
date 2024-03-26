import React from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import bg from '../../assets/bg.webp';

import Register from '../../components/modals/Register';
import Login from '../../components/modals/Login';
import ForgotPassword from '../../components/modals/ForgotPassword';
import axios from 'axios';
import { createStorage, API_URL, getStorage } from "../../Helper";

export default function Content() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [registerModal, setRegisterModal] = React.useState(false);
  const [loginModal, setLoginModal] = React.useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = React.useState(false);

  const registerOpenModal = () => {
    setRegisterModal(true);
  }

  const loginOpenModal = () => {
    setLoginModal(true);
  }

  const forgotPasswordOpenModal = () => {
    setForgotPasswordModal(true);
  }

  const close = (value) => {
    if (value) signUp(value);
    else setRegisterModal(false)
  }

  const loginClose = (value) => {
    if (value) login(value);
    else setLoginModal(false)
  }

  const forgotPasswordClose = (value) => {
    if (value) forgotPassword(value);
    else setForgotPasswordModal(false)
  }

  const signUp = async (value) => {
    try {
      setLoading(true)
      let response = await axios.post(
        `${API_URL}/api/user/signup`, value);
      if (response.status === 200) {
        setRegisterModal(false)
        toast.success(response.data.message);
        setLoading(false);
      }
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error)
      }
      else {
        toast.error(error.message)
      }
      setLoading(false);
    }

  }
  const login = async (value) => {
    try {
      setLoading(true)
      let response = await axios.post(
        `${API_URL}/api/user/login`, value);
      if (response.status === 200) {
        setLoginModal(false)
        toast.success(response.data.message);
        createStorage('user', response.data);
        let user = JSON.parse(getStorage('user'));
        if (user.type === 'Admin') navigate('/admin');
        else navigate('/admin/broker/dashboard');
        console.log(user);
        setLoading(false);
       
      }
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error)
      }
      else {
        toast.error(error.message)
      }
      setLoading(false);
    }

  }

  const forgotPassword = async (value) => {
    try {
      setLoading(true)
      let response = await axios.post(
        `${API_URL}/api/user/forgot`, value);
      if (response.status === 200) {
        setForgotPasswordModal(false)
        toast.success(response.data.message);
        setLoading(false);
      }
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error)
      }
      else {
        toast.error(error.message)
      }
      setLoading(false);
    }

  }
  return (
    <header>
      <div
        id='main-bg'
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Welcome to our Jewellery Website</h1>
              <h5 className='mb-4'></h5>
              <MDBBtn
                className="m-2"
                tag="a"
                outline
                size="lg"
                onClick={loginOpenModal}
              >
                Login
              </MDBBtn>
              <MDBBtn
                className="m-2"
                tag="a"
                outline
                size="lg"
                onClick={registerOpenModal}
              >
                Register
              </MDBBtn>
              <MDBBtn
                className="m-2"
                tag="a"
                outline
                size="lg"
                onClick={forgotPasswordOpenModal}
              >
                Forgot Password
              </MDBBtn>

            </div>
          </div>
        </div>
      </div>
      {registerModal && <Register open={registerModal} close={close} />}
      {loginModal && <Login open={loginModal} close={loginClose} />}
      {forgotPasswordModal && <ForgotPassword open={forgotPasswordModal} close={forgotPasswordClose} />}
      <ToastContainer />
    </header>
  );
}