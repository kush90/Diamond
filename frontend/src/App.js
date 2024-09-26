import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './styles/default.css'

import Main from './layouts/public/Main';
import AdminMain from './layouts/admin/Main';
import Error from './pages/Error';
import Dashboard from './pages/admin/Dashboard';
import Order from './pages/admin/Order'
import BrokerDashboard from './pages/broker/Dashboard';
import Deal from './pages/broker/Deal';
import AuthGuard from './AuthGuard';
import User from './pages/admin/User';
import Feedback from './pages/admin/Feedback';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin" element={<AuthGuard Component={AdminMain} />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/broker/dashboard" element={<BrokerDashboard/>}/>
        <Route path="/admin/broker/deal" element={<Deal/>}/>
        <Route path="/admin/feedback" element={<Feedback/>}/>
        <Route path="/admin/profile" element={<Profile/>}/>
      </Route>
      <Route path="*" element={<Error />} />

    </Routes>
  </Router>
  );
}

export default App;
