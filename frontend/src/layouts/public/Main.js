import React from 'react'
import { Outlet } from 'react-router-dom'
import { MDBContainer } from 'mdb-react-ui-kit'
import Content from './Content'
import '../../styles/public/main.css';
const Main = () => {
    return (
        <>
            <Content></Content>
            <><Outlet /></>
        </>
    )
}

export default Main