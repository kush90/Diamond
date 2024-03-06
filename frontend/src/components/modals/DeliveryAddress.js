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

const DeliveryAddress = (props) => {
    const [fullName, setFullName] = React.useState('');
    const [phoneNo, setPhoneNo] = React.useState('');
    const [address, setAddress] = React.useState('');
    const close = () => {
        props.closeModal(false)
    }

    const submit = () => {
        let obj = {};
        obj['fullName'] = fullName;
        obj['phoneNo'] = phoneNo;
        obj['address'] = address;
        props.closeModal(obj);
    }

    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Delivery Address</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setFullName(e.target.value)} value={fullName} label='Full Name' />
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} label='Phone No' />
                            <MDBInput wrapperClass='custom-input' required onChange={(e) => setAddress(e.target.value)} value={address} label='Address' />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={(!fullName || !phoneNo || !address)} onClick={submit}
                            >Submit</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default DeliveryAddress;