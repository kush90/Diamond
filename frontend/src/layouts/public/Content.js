import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


import Register from '../../components/modals/Register';
import Login from '../../components/modals/Login';
import ForgotPassword from '../../components/modals/ForgotPassword';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Slider from './sections/Slider';
import axios from 'axios';
import { createStorage, API_URL, getStorage } from "../../Helper";

export default function Content() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [registerModal, setRegisterModal] = React.useState(false);
  const [loginModal, setLoginModal] = React.useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = React.useState(false);

  const registerOpenModal = () => {
    setRegisterModal(true);
  }

  const loginOpenModal = () => {
    console.log('login')
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
        toast.success('Congratulations! You\'re now officially a member!');
        createStorage('user', response.data);
        navigate('/admin/broker/dashboard');
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
    <>
            <Navbar login={loginOpenModal} register={registerOpenModal} />
            <Header />
            <About />
            <hr/>
            <Slider/>
            <hr/>
            <Contact />

            {registerModal && <Register open={registerModal} close={close} loading={loading} />}
            {loginModal && <Login open={loginModal} close={loginClose} loading={loading} forgotPasswordOpen={forgotPasswordOpenModal} />}
            {forgotPasswordModal && <ForgotPassword open={forgotPasswordModal} loading={loading} close={forgotPasswordClose} />}
            
            <ToastContainer />
            <Footer />
        </>
  );
}