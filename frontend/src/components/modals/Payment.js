import React, { useRef } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBadge,
    MDBInput,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdb-react-ui-kit';
import '../../styles/admin/main.css'
import { API_URL } from '../../Helper';


const Payment = (props) => {

    const [images, setImages] = React.useState([]);
    const [imgUrl, setImgUrl] = React.useState([]);
    const ref = useRef();
    const close = () => {
        props.closeModal(false)
    }
    const imageUpload = (e) => {
        setImages(e.target.files)
        let newArr = imgUrl;
        for (let i = 0; i < e.target.files.length; i++) {

            newArr.unshift({ name: e.target.files[i].name, type: e.target.files[i].type, path: URL.createObjectURL(e.target.files[i]), new: true });
        }
        setImgUrl(newArr)
    }
    const removeImage = (name) => {
        let newArr = imgUrl.filter((img) => { return img.name !== name });
        let newFile = [];
        for (const file of images) {
            if (file.name !== name) newFile.push(file)
        }
        setImgUrl(newArr);
        setImages(newFile)
    }

    const submit = () => {
        let newFormData = new FormData();
        newFormData.append('status', 'doneDeal');
        for (const file of images) {
            newFormData.append('files', file);
        }
        props.closeModal(newFormData);
    }

    return (
        <>
            <MDBModal open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Payment Receipt For Broker</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"></i> <span>Upload Payment Receipt</span>
                            </label>
                            <input accept='image/*' ref={ref} id="file-upload" type="file" onChange={(e) => imageUpload(e)} multiple />
                            <MDBContainer className='product-modal-img-list'>
                                <MDBRow>
                                    {
                                        (imgUrl && imgUrl.length > 0) && imgUrl.map((img, index) => {

                                            return (
                                                <MDBCol key={index} lg='4' md='12' className='mb-4 set-relative'>
                                                    <MDBIcon fas icon="times-circle" color='danger' className='delete-btn' onClick={() => removeImage(img.name)} />

                                                    <img
                                                        src={img?.new ? img.path : `${API_URL}/${img.path}`}
                                                        className='img-fluid shadow-2-strong rounded-4 custom-img'
                                                        alt={img.name}
                                                    />
                                                </MDBCol>
                                            )
                                        })
                                    }
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn color='primary' onClick={submit}>
                                Submit
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default Payment;