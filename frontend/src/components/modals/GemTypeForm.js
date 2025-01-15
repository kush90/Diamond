import React, { useEffect } from 'react';
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
import '../../styles/admin/main.css'

const GemTypeForm = (props) => {
    const { open, closeModal, data } = props;
    const [name, setName] = React.useState('');


    useEffect(() => {
        if (data.name) setName(data.name)
    }, [data]);

    const toggleOpenClose = (status) => {
        if (data && status === 'save') {
            let newObj = { ...data, name };
            closeModal(newObj);
        }
        if (data === '' && status === 'save') closeModal(name);
        if (status === 'close') closeModal();
        setName('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission behavior
            if (name.trim()) {
                toggleOpenClose('save');
            }
        }
    };

    return (
        <>
            <MDBModal staticBackdrop open={open} tabIndex='-1' onClose={toggleOpenClose} >
                <MDBModalDialog>
                    <MDBModalContent>


                        <MDBModalHeader>
                            <MDBModalTitle  className='text-primary'>Gem Type Form</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => toggleOpenClose('close')} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <MDBInput className='mb-4' required onKeyDown={handleKeyDown} onChange={(e) => setName(e.target.value)} value={name} label='Gem Type Name' />

                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={() => toggleOpenClose('close')}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={!name} onClick={() => toggleOpenClose('save')} >Submit</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default GemTypeForm;