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
    MDBNavbarToggler,
    MDBBadge
} from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from "react-router-dom";

import logo from '../../assets/logo1.png';
import '../../styles/admin/main.css';
import { clearStorage, getStorage, createStorage } from '../../Helper';
import { get,post } from '../../Api';
import { useWebSocket } from '../../context';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openToggle, setOpenToggle] = React.useState('');
    const [user, setUser] = React.useState('');
    const [noti, setNoti] = React.useState([]);
    const { socket } = useWebSocket();
    useEffect(() => {
        setUser(JSON.parse(getStorage('user')));
        const storedNoti = JSON.parse(getStorage('noti'));
        if (storedNoti) {
            setNoti(...storedNoti.slice(0, 10)); // Set noti state if it's available in local storage
        }
        if (socket) {
            getNotiData();
            socket.on('new-noti', (data) => {
                setNoti((prevNoti) => {
                    if (data.createdBy === user.id || data.createdBy === null) {
                        const existingNotificationIndex = prevNoti.findIndex(notification => notification._id === data._id);
                        if (existingNotificationIndex !== -1) {
                            // If the notification exists, remove it
                            const updatedNoti = [...prevNoti];
                            updatedNoti.splice(existingNotificationIndex, 1);
                            // Add the new notification
                            const newNoti = [data, ...updatedNoti.slice(0, 9)];
                            // Store in local storage
                            createStorage('noti', newNoti);
                            // Update state
                            return newNoti;
                        } else {
                            // If the notification is new, add it to the existing notifications
                            const newNoti = [data, ...prevNoti.slice(0, 9)];
                            // Store in local storage
                            createStorage('noti', newNoti);
                            // Update state
                            return newNoti;
                        }
                    }
                    else {
                        return prevNoti;
                    }
                });
            });
        }
        return () => {
            // Clean up socket event listener
            if (socket) {
                socket.off('new-noti');
            }
        };
    }, [socket, user.id]);

    const getNotiData = async () => {
        try {
            const response = await get('api/notification/getAll');
            if (response.status === 200) {
                // Set state with filtered notifications
                setNoti(response.data.data);
                // Update local storage with filtered notifications
                createStorage('noti', response.data.data);
                console.log(response.data.data)
            }
        } catch (error) {
            // Handle errors
        }
    };


    const logout = () => {
        clearStorage('user');
        setUser('')
        navigate('/');
        clearStorage('noti')
    }

    const clearNoti = async() => {
        let obj = {};
        const ids = noti.map(notification => notification._id);
        obj['ids'] = ids;
    
        setTimeout(async () => { // Wait for 1 second before clearing notifications
            try {
                const response = await post('api/notification/update', obj);
                if (response.data.status === true) {
                    setNoti([]); // Update the state to clear notifications
                    getNotiData(); // Fetch updated notifications
                    clearStorage('noti')
                }
            } catch (error) {
                // Handle errors
            }
        }, 4000); // 1000 milliseconds = 1 second
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
                        <span className='logo-text'>Business Alliance Hub</span>
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
                                <MDBNavbarLink style={{ display: user.type === 'Broker' ? 'none' : '' }} active={location.pathname === '/admin'} aria-current='page' href='/admin'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type === 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/order'} href='/admin/order'>Order</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type === 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/user'} href='/admin/user'>User</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type !== 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/broker/dashboard'} href='/admin/broker/dashboard'>Home</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type !== 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/broker/deal'} href='/admin/broker/deal'>Deals</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink style={{ display: user.type === 'Broker' ? 'none' : '' }} active={location.pathname === '/admin/feedback'} href='/admin/feedback'>Feedbacks</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <MDBDropdown color="primary" >
                            <MDBDropdownToggle color='link' caret="true" onClick={clearNoti}>
                                <MDBBadge className='noti-count' pill color='danger'>{noti?.length >= 10 ? noti?.length + '+' : noti?.length}</MDBBadge>
                                <span>
                                    <MDBIcon fas icon='bell'></MDBIcon>
                                </span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                                {
                                    (noti && noti.length > 0) ? noti.map((item, index) => {
                                        return (
                                            <MDBDropdownItem className='text-wrap' key={index} link >{item?.sender?.toUpperCase()} {item.noti}

                                                {item.item && (
                                                    <span> ({item.item})</span>
                                                )}
                                            </MDBDropdownItem>
                                        )


                                    }) :
                                        <MDBDropdownItem link >No Notification!</MDBDropdownItem>
                                }
                            </MDBDropdownMenu>
                        </MDBDropdown>

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
export default Navbar