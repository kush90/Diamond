import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBCarousel, MDBCarouselItem, MDBCarouselCaption,
    MDBSpinner
} from 'mdb-react-ui-kit';
import { API_URL } from '../../Helper';
import '../../styles/broker/main.css';

const ProductImage = (props) => {
    const [showControls, setShowControls] = useState(false);
    const [loading, setLoading] = useState(true);

    const close = () => {
        props.closeModal(false);
    };

    useEffect(() => {
        if (props.data.length === 1) {
            setShowControls(false);
        } else {
            setShowControls(true);
        }
        // Simulate loading delay
        setTimeout(() => setLoading(false), 1000);
    }, [props.data]);

    return (
        <>
            <MDBModal open={props.open} tabIndex='-1' onClose={close} backdrop={true} staticBackdrop={true}>
                <MDBModalDialog size='lg' centered>
                    <MDBModalContent className='rounded-3 shadow-lg'>
                        <MDBModalHeader className='bg-primary text-white'>
                            <MDBModalTitle className='fw-bold'>Image Details</MDBModalTitle>
                            <MDBBtn className='btn-close btn-close-white' color='none' onClick={close} />
                        </MDBModalHeader>
                        <MDBModalBody className='p-4'>
                            {loading ? (
                                <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                                    <MDBSpinner role='status'>
                                        <span className='visually-hidden'>Loading...</span>
                                    </MDBSpinner>
                                </div>
                            ) : (
                                props.data && props.data.length > 0 ? (
                                    <MDBCarousel showControls={showControls} fade>
                                        {props.data.map((img, index) => (
                                            <MDBCarouselItem key={index} itemId={index + 1}>
                                                <img
                                                    src={img.path ? `${API_URL}/${img.path}` : ''}
                                                    className='d-block w-100 rounded-3 slide-img'
                                                    alt={`Product Image ${index + 1}`}
                                                    onLoad={() => setLoading(false)}
                                                />
                                                {img.caption && (
                                                    <MDBCarouselCaption className='bg-dark bg-opacity-50 rounded-bottom'>
                                                        <h5 className='text-white'>{img.caption}</h5>
                                                    </MDBCarouselCaption>
                                                )}
                                            </MDBCarouselItem>
                                        ))}
                                    </MDBCarousel>
                                ) : (
                                    <p className='text-center text-muted py-5'>No Images Available!</p>
                                )
                            )}
                        </MDBModalBody>
                        <MDBModalFooter className='bg-light'>
                            <MDBBtn color='secondary' onClick={close} className='rounded-pill px-4'>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ProductImage;