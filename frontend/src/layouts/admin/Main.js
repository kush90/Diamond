import React  from 'react'
import { Outlet } from 'react-router-dom'
import { MDBContainer } from 'mdb-react-ui-kit'
import Navbar from './Navbar'
import '../../styles/admin/main.css';
import { WebSocketProvider } from '../..//context';


const AdminMain = () => {
    return (
        <WebSocketProvider>
            <Navbar ></Navbar>
            <MDBContainer fluid>
                <><Outlet /></>
            </MDBContainer>

        </WebSocketProvider>
    )
}

export default AdminMain