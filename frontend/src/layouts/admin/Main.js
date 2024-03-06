import React from 'react'
import { Outlet } from 'react-router-dom'
import { MDBContainer } from 'mdb-react-ui-kit'
import Navbar from './Navbar'
import '../../styles/admin/main.css';
const AdminMain = () => {
    return (
        <>
            <Navbar></Navbar>
            <MDBContainer fluid>
                <><Outlet /></>
            </MDBContainer>

        </>
    )
}

export default AdminMain