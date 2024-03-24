import React from 'react';
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
import '../../styles/public/register.css'

const ForgotPassword = (props) => {
    const [phoneNo, setPhoneNo] = React.useState('');
    const [password, setPassword] = React.useState('');
    const close = () => {
        props.close(false)
    }

    const login = () => {
        let obj = {};
        obj['phoneNo'] = phoneNo;
        obj['password'] = password;
        props.close(obj);
    }

    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Forgot Password</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} label='Phone No' />
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setPassword(e.target.value)} value={password} label='Password' />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={(!phoneNo || !password)} onClick={login}
                            >Login</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ForgotPassword;