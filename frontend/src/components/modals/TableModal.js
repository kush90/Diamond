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
} from 'mdb-react-ui-kit';
import Table from '../../components/Table';

const TableModal = (props) => {

    const close = () => {
        props.close(false)
    }
    return (
        <>
            <MDBModal staticBackdrop open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{props.title}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{ overflow: 'scroll' }}>
                            <Table title={'table'} header={props.tableHeader} data={props.data} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default TableModal;