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
    MDBCarousel, MDBCarouselItem, MDBCarouselCaption
} from 'mdb-react-ui-kit';
import { API_URL } from '../../Helper';

import '../../styles/broker/main.css'

const ProductImage = (props) => {
    const [showControls, setShowControls] = React.useState(false);
    const close = () => {
        props.closeModal(false)
    }
    useEffect(() => {
        if (props.data.length === 1) {
            setShowControls(false);
        }
        else {
            setShowControls(true)
        }
    }, []);

    return (
        <>
            <MDBModal open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle  className='text-primary'>Image Detail</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {
                               (props.data && props.data.length > 0) ? ( <MDBCarousel showControls={showControls}>
                                {
                                    (props.data && props.data.length > 0) && props.data.map((img, index) => {

                                        return (
                                            <MDBCarouselItem key={index} itemId={index + 1}>
                                                <img src={img.path ? `${API_URL}/${img?.path}` : ''} className='d-block w-100 slide-img' alt='...' />

                                            </MDBCarouselItem>
                                        )
                                    })
                                }

                            </MDBCarousel>) : (<p className='text-primary no-image'>No Image Availabe!</p>)
                            }
                           
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

export default ProductImage;