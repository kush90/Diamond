import React, { useEffect } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBIcon,
    MDBDropdownMenu,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBNavbarToggler
} from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png';
import '../../styles/admin/main.css';
import { clearStorage, getStorage } from '../../Helper';


export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [openToggle, setOpenToggle] = React.useState('');
    const [user, setUser] = React.useState('');

    useEffect(() => {
        setUser(JSON.parse(getStorage('user')));
    }, [])
    const logout = () => {
        clearStorage('user');
        setUser('')
        navigate('/');
    }
    return (
        <div>
            <MDBNavbar fixed='top' expand='lg' color="light" bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>
                        <img
                            src={logo}
                            height='30'
                            alt=''
                            loading='lazy'
                        />
                        <span className='logo-text'>Diamond</span>
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenToggle(!openToggle)}
                    >
                        <MDBIcon icon='bars' fas color='primary' />
                    </MDBNavbarToggler>
                    <MDBCollapse open={openToggle} navbar>


                        <MDBNavbarNav className='me-auto'>
                            <MDBNavbarItem className='active'>
                                <MDBNavbarLink style={{ display: user.type == 'Broker' ? 'none' : '' }} active={location.pathname === '/admin'} aria-current='page' href='/admin'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type == 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/order'} href='/admin/order'>Order</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type == 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/user'} href='/admin/user'>User</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type != 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/broker/dashboard'} href='/admin/broker/dashboard'>Home</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type != 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/broker/deal'} href='/admin/broker/deal'>Deals</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>


                        <MDBDropdown color="primary" >
                            <MDBDropdownToggle color='link' caret="true">
                                {user.user} &nbsp;
                                <MDBIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem link onClick={logout}>Logout</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>

                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}