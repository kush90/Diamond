import React, { useEffect, useRef } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdb-react-ui-kit';
import '../../styles/admin/main.css'
import { API_URL } from '../../Helper';

const ProductForm = (props) => {
    const { open, closeModal, data, category,gemType, loading } = props;
    const [name, setName] = React.useState('');
    const [productNumber, setProductNumber] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [shortDescription, setShortDescription] = React.useState('');
    const [categoryId, setCategoryId] = React.useState('');
    const [gemTypeId, setGemTypeId] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [images, setImages] = React.useState([]);
    const [imgUrl, setImgUrl] = React.useState([]);
    const [certificate, setCertificate] = React.useState([]);
    const [certificateUrl, setCertificateUrl] = React.useState([]);
    const imageRef = useRef();
    const certiRef = useRef();



    useEffect(() => {
        if (data) {
            setName(data.name);
            setProductNumber(data.productNumber);
            setDescription(data.description);
            setCategoryId(data?.categoryId?._id);
            setGemTypeId(data?.gemTypeId?._id);
            setPrice(data.price);
            setShortDescription(data.shortDescription);
            setImgUrl(data.images)
            if(data.certificate) setCertificateUrl(data?.certificate)
        }
    }, [data]);

    const toggleOpenClose = (status) => {
        if (data) {
            let newFormData = new FormData();
            newFormData.append('name', name);
            newFormData.append('productNumber', productNumber)
            newFormData.append('description', description)
            newFormData.append('categoryId', categoryId)
            newFormData.append('gemTypeId',gemTypeId)
            newFormData.append('price', price)
            newFormData.append('shortDescription', shortDescription);
            let path = [];
            let certiPath = [];
            for (const url of imgUrl) {
                if (!url.hasOwnProperty('new')) path.push(url)
            }
            newFormData.append('images', JSON.stringify(path));
            for (const file of images) {
                newFormData.append('files', file);
            }
            for (const url of certificateUrl) {
                if (!url.hasOwnProperty('new')) certiPath.push(url)
            }
            newFormData.append('certificate', JSON.stringify(certiPath));
            for (const file of certificate) {
                newFormData.append('certificate', file);
            }
            closeModal(newFormData);
        }
        else if (data === '') {

            let newFormData = new FormData();
            newFormData.append('name', name)
            newFormData.append('productNumber', productNumber)
            newFormData.append('description', description)
            newFormData.append('categoryId', categoryId)
            newFormData.append('gemTypeId',gemTypeId)
            newFormData.append('price', price)
            newFormData.append('shortDescription', shortDescription);
            for (const file of images) {
                console.log(file)
                newFormData.append('files', file);
            }
            for (const file of certificate) {
                console.log(file)
                newFormData.append('certificate', file);
            }
            closeModal(newFormData);
        }
        if (status === 'close') closeModal(status);
        // setName('');
        // setProductNumber();
        // setDescription('');
        // setCategoryId('');
        // setPrice('');
        // setShortDescription('')
        // setImages('');
        // setImgUrl([]);
        // setCertificate('');
        // setCertificateUrl([]);
        // imageRef.current.value = null;
        // certiRef.current.value = null;
    }
    const imageUpload = (e) => {
        let files = e.target.files;
        let newImages = [...images];
        let newArr = imgUrl;
        for (let i = 0; i < files.length; i++) {
            newImages.push(files[i]);
            newArr.unshift({ name: files[i].name, type:files[i].type, path: URL.createObjectURL(files[i]), new: true });
        }
        setImages(newImages)
        setImgUrl(newArr)
    }
    const certificateUpload = (e) => {
        setCertificate(e.target.files)
        let newArr = certificateUrl;
        for (let i = 0; i < e.target.files.length; i++) {

            newArr.unshift({ name: e.target.files[i].name, type: e.target.files[i].type, path: URL.createObjectURL(e.target.files[i]), new: true });
        }
        setCertificateUrl(newArr)
    }
    const removeCertificate = (name) => {
        let newArr = certificateUrl.filter((img) => { return img.name !== name });
        let newFile = [];
        for (const file of images) {
            if (file.name !== name) newFile.push(file)
        }
        setCertificateUrl(newArr);
        setCertificate(newFile)
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
    const disabled = certificateUrl.length > 0 ? 'disabled-certi' : 'custom-file-upload';
    const close= ()=>{
        props.close(false)
    }
    return (
        <>
            <MDBModal staticBackdrop open={open} tabIndex='-1' onClose={close} >
                <MDBModalDialog>
                    <MDBModalContent>


                        <MDBModalHeader>
                            <MDBModalTitle>Product Form</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <MDBInput className='mb-4' required onChange={(e) => setName(e.target.value)} value={name} label='Name' />
                            <MDBInput className='mb-4' required onChange={(e) => setProductNumber(e.target.value)} value={productNumber} label='Product Number' />
                            <MDBInput className='mb-4' required onChange={(e) => setDescription(e.target.value)} value={description} label='Description' />
                            <MDBInput className='mb-4' required onChange={(e) => setShortDescription(e.target.value)} value={shortDescription} label='Short Description' />
                            <div className='mb-4'>
                                <select className="browser-default custom-select" required value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value="" >Choose Product Category</option>
                                    {
                                        category.map((cat, index) => {
                                            return <option key={cat._id} value={cat._id} >{cat.name}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <div className='mb-4'>
                                <select className="browser-default custom-select" required value={gemTypeId} onChange={(e) => setGemTypeId(e.target.value)}>
                                    <option value="" >Choose Gem</option>
                                    {
                                        gemType.map((type, index) => {
                                            return <option key={type._id} value={type._id} >{type.name}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <MDBInput className='mb-4' required onChange={(e) => setPrice(e.target.value)} value={price} label='Price' />
                            <label htmlFor="certi-upload" className={disabled}>
                                <i className="fa fa-cloud-upload"></i> <span>Upload Certificate</span>
                            </label>
                            <input accept='image/*' ref={certiRef} id="certi-upload" type="file" onChange={(e) => certificateUpload(e)} disabled={certificateUrl.length > 0} />
                            <MDBContainer className='product-modal-img-list'>
                                <MDBRow>
                                    {
                                        (certificateUrl && certificateUrl?.length > 0) && certificateUrl.map((img, index) => {

                                            return (
                                                <MDBCol key={index} lg='4' md='12' className='mb-4 set-relative'>
                                                    <MDBIcon fas icon="times-circle" color='danger' className='delete-btn' onClick={() => removeCertificate(img.name)} />

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
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"></i> <span>Upload Related Images</span>
                            </label>
                            <input accept='image/*' ref={imageRef} id="file-upload" type="file" onChange={(e) => imageUpload(e)} multiple />
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
                            <MDBBtn disabled={loading} color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn disabled={(loading || !name || !description || !price || !categoryId || !gemTypeId || certificateUrl.length === 0 || imgUrl.length === 0)}
                                onClick={() => toggleOpenClose('save')} >{props.loading ? 'Loading...' : 'Submit'}</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ProductForm;