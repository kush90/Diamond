import React, { useEffect } from 'react'
import {
    MDBRow, MDBCol, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBBtn,
    MDBTooltip, MDBIcon, MDBSpinner
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';

import Table from '../../components/Table';
import CategoryForm from '../../components/modals/CategoryForm';
import GemTypeForm from '../../components/modals/GemTypeForm';
import ProductForm from '../../components/modals/ProductForm';
import '../../styles/admin/main.css'

import { get, post, patch, remove } from '../../Api';



const Dashboard = () => {
    const [loading, setLoading] = React.useState(false);
    const [catLoading, setCatLoading] = React.useState(true);
    const [gemTypeLoading, setGemTypeLoading] = React.useState(true)

    const [tempDeleteData, setTempDeleteData] = React.useState('');


    const [catModal, setCatModal] = React.useState(false);
    const [gemTypeModal, setGemTypeModal] = React.useState(false)
    const [categoryData, setCategoryData] = React.useState([]);
    const [gemTypeData, setGemTypeData] = React.useState([]);
    const [deleteDataCatConfirm, setDeleteDataCatConfirm] = React.useState(false)
    const [deleteDataGemTypeConfirm, setDeleteGemTypeCatConfirm] = React.useState(false)
    const [tempEditCatData, setTempEditCatData] = React.useState('');
    const [tempEditGemTypeData, setTempEditGemTypeData] = React.useState('');
    const categoryHeader = ['name', 'action'];
    const gemTypeHeader = ['name', 'action']

    const [productModal, setProductModal] = React.useState(false);
    const [productData, setProductData] = React.useState([]);
    const [deleteDataProductConfirm, setDeleteDataProductConfirm] = React.useState(false)
    const [tempEditProductData, setTempEditProductData] = React.useState('');
    const productHeader = ['productNumber', 'name', 'category', 'gem Type', 'price', 'description', 'status', 'createdAt', 'action'];


    const getCategoryData = async () => {
        try {
            setCatLoading(true)
            const response = await get('api/category/getAll');
            if (response.status === 200) {
                setCatLoading(false);
                setCategoryData(response.data.data);
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setCatLoading(false);
        }
    }

    const getGemTypeData = async () => {
        try {
            setGemTypeLoading(true)
            const response = await get('api/gemType/getAll');
            if (response.status === 200) {
                setGemTypeLoading(false);
                setGemTypeData(response.data.data);
                console.log(gemTypeData)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setGemTypeLoading(false);
        }
    }

    const getProductData = async () => {
        try {
            setLoading(true)
            const response = await get('api/product/getAll/admin');
            if (response.status === 200) {
                setLoading(false);
                setProductData(response.data.data);
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategoryData();
        getProductData();
        getGemTypeData();
    }, []);

    /*  ====== Product CRUD ====== */

    const openProductModal = (value) => {
        setTempEditProductData(value);
        setProductModal(true);
    }
    const closeProductModal = async (value) => {
        console.log(tempEditProductData);
        if (value && tempEditProductData) {
            updateProduct(value);
        }
        if (value && tempEditProductData === '') createProduct(value);
    }

    const createProduct = async (value) => {
        try {
            setLoading(true)
            let response = await post('api/product/create', value);
            if (response.status === 200) {
                console.log(response.data.data)
                setProductModal(false)
                toast.success(response.data.message);
                let newArr = productData;
                newArr.unshift({ ...response.data.data });
                setProductData(newArr);
                setLoading(false);
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setLoading(false);
        }

    }

    const updateProduct = async (value) => {
        console.log(value)
        setLoading(true)
        try {
            let response = await patch(`api/product/update/${tempEditProductData._id}`, value);
            if (response.status === 200) {

                toast.success(response.data.message);
                let newArr = productData.map((obj) =>
                    obj._id === tempEditProductData._id ? { ...obj, ...response.data.data } : obj
                );
                console.log(response.data.data)
                setProductData(newArr);
                console.log(newArr)
                setLoading(false);
                setTempEditProductData('')
                setProductModal(false)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setLoading(false);
        }

    }

    const deleteProduct = async () => {
        try {
            setLoading(true)
            let response = await remove(`api/product/delete/${tempDeleteData._id}`);
            if (response.status === 200) {
                toast.success(response.data.message);
                setProductData(productData.filter((obj) => { return obj._id !== tempDeleteData._id }))
                setLoading(false);
                setTempDeleteData('');
                setDeleteDataProductConfirm(false)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else if (error.response && error.response.status === 404) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setLoading(false);
            setTempDeleteData('')
            setDeleteDataProductConfirm(false)
        }
    }
    const deleteProductConfirm = (value) => {
        setDeleteDataProductConfirm(true)
        setTempDeleteData(value);

    }

    const productClose = (value) => {
        setProductModal(value)
        setTempEditProductData('')
    }
    /* ========= end of Product CRUD ======== */

    /*  ====== Gem Type CRUD ====== */

    const openGemTypeModal = (value) => {
        setTempEditGemTypeData(value);
        setGemTypeModal(true);
    }
    const closeGemTypeModal = async (value) => {
        console.log(value)
        if (value && tempEditGemTypeData) {
            updateGemType(value);
        }
        if (value && !tempEditGemTypeData) createGemType(value)
        setGemTypeModal(false);
        setTempEditGemTypeData('');

    }

    const createGemType = async (value) => {
        console.log('call backend', value)
        try {
            setGemTypeLoading(true)
            let response = await post('api/gemType/create', { "name": value });
            if (response.status === 200) {

                toast.success(response.data.message);
                let newArr = gemTypeData;
                newArr.unshift({ ...response.data.data });
                setGemTypeData(newArr);
                setGemTypeLoading(false);
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setGemTypeLoading(false);
        }

    }

    const updateGemType = async (value) => {
        try {
            setGemTypeLoading(true)
            let response = await patch(`api/gemType/update/${value._id}`, { "name": value.name });
            if (response.status === 200) {

                toast.success(response.data.message);
                let newArr = gemTypeData.map((obj) =>
                    obj._id === value._id ? { ...obj, "name": value.name } : obj
                );
                setGemTypeData(newArr);
                setGemTypeLoading(false);
                setTempEditGemTypeData('')
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setGemTypeLoading(false);
            setTempEditGemTypeData('')
        }

    }


    const deleteGemType = async () => {
        try {
            setGemTypeLoading(true)
            let response = await remove(`api/gemType/delete/${tempDeleteData._id}`);
            if (response.status === 200) {
                toast.success(response.data.message);
                setGemTypeData(gemTypeData.filter((obj) => { return obj._id !== tempDeleteData._id }))
                setGemTypeLoading(false);
                setTempDeleteData('');
                setDeleteGemTypeCatConfirm(false)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else if (error.response && error.response.status === 404) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setCatLoading(false);
            setTempDeleteData('')
            setDeleteGemTypeCatConfirm(false)
        }
    }
    const deleteGemTypeConfirm = (value) => {
        console.log(value)
        setDeleteGemTypeCatConfirm(true)
        setTempDeleteData(value);

    }
    /* ========= end of Gem Type CRUD ======== */
    /*  ====== Category CRUD ====== */

    const openCategoryModal = (value) => {
        setTempEditCatData(value);
        setCatModal(true);
    }
    const closeCatModal = async (value) => {
        if (value && tempEditCatData) {
            updateCategory(value);
        }
        if (value && !tempEditCatData) createCategory(value)
        setCatModal(false);
        setTempEditCatData('');

    }

    const createCategory = async (value) => {
        try {
            setCatLoading(true)
            let response = await post('api/category/create', { "name": value });
            if (response.status === 200) {

                toast.success(response.data.message);
                let newArr = categoryData;
                newArr.unshift({ ...response.data.data });
                setCategoryData(newArr);
                setCatLoading(false);
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setCatLoading(false);
        }

    }

    const updateCategory = async (value) => {
        try {
            setCatLoading(true)
            let response = await patch(`api/category/update/${value._id}`, { "name": value.name });
            if (response.status === 200) {

                toast.success(response.data.message);
                let newArr = categoryData.map((obj) =>
                    obj._id === value._id ? { ...obj, "name": value.name } : obj
                );
                setCategoryData(newArr);
                setCatLoading(false);
                setTempEditCatData('')
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setCatLoading(false);
            setTempEditCatData('')
        }

    }


    const deleteCategory = async () => {
        try {
            setCatLoading(true)
            let response = await remove(`api/category/delete/${tempDeleteData._id}`);
            if (response.status === 200) {
                toast.success(response.data.message);
                setCategoryData(categoryData.filter((obj) => { return obj._id !== tempDeleteData._id }))
                setCatLoading(false);
                setTempDeleteData('');
                setDeleteDataCatConfirm(false)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else if (error.response && error.response.status === 404) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
            setCatLoading(false);
            setTempDeleteData('')
            setDeleteDataCatConfirm(false)
        }
    }
    const deleteCategoryConfirm = (value) => {
        console.log(value)
        setDeleteDataCatConfirm(true)
        setTempDeleteData(value);

    }
    /* ========= end of Category CRUD ======== */
    const onCancel = () => {
        setDeleteDataCatConfirm(false);
        setDeleteDataProductConfirm(false)
        setDeleteGemTypeCatConfirm(false)
        setTempDeleteData('')
    }

    return (
        <>
            <MDBRow className='custom-margin-top'>

                <MDBCol md='12' >
                    <MDBCard alignment='center' style={{ height: '100%' }}>
                        <MDBCardHeader>

                            <span className='text-primary'>Products</span> <span className='text-danger'>({productData.length})</span>
                            {
                                categoryData.length > 0 && (<MDBBtn onClick={() => setProductModal(true)} size='sm' className='text-primary position-absolute top-0 end-0 mt-1 me-3' tag='a' color='light' floating>

                                    <MDBTooltip tag='span' title="Add Product">
                                        <MDBIcon fas icon="add" />
                                    </MDBTooltip>
                                </MDBBtn>)
                            }


                        </MDBCardHeader>
                        <MDBCardBody className='custom-height-setting'>
                            {(loading === false) ? (<Table title={'product'} header={productHeader} data={productData} editData={openProductModal} deleteData={deleteProductConfirm} />)

                                : (<MDBSpinner role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </MDBSpinner>)
                            }
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                {catModal && <CategoryForm open={catModal} closeModal={closeCatModal} data={tempEditCatData} />}
                {gemTypeModal && <GemTypeForm open={gemTypeModal} closeModal={closeGemTypeModal} data={tempEditGemTypeData} />}
                {productModal && <ProductForm open={productModal} close={productClose} closeModal={closeProductModal} data={tempEditProductData} category={categoryData} gemType={gemTypeData} loading={loading} />}
                <ToastContainer />
                {
                    deleteDataCatConfirm && (
                        <>
                            <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="Yes, delete it!"
                                confirmBtnBsStyle="danger"
                                title="Are you sure?"
                                onConfirm={deleteCategory}
                                onCancel={onCancel}
                                focusCancelBtn
                            >
                                You will not be able to recover this data!
                            </SweetAlert>
                        </>
                    )
                }
                {
                    deleteDataGemTypeConfirm && (
                        <>
                            <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="Yes, delete it!"
                                confirmBtnBsStyle="danger"
                                title="Are you sure?"
                                onConfirm={deleteGemType}
                                onCancel={onCancel}
                                focusCancelBtn
                            >
                                You will not be able to recover this data!
                            </SweetAlert>
                        </>
                    )
                }
                {
                    deleteDataProductConfirm && (
                        <SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Yes, delete it!"
                            confirmBtnBsStyle="danger"
                            title="Are you sure?"
                            onConfirm={deleteProduct}
                            onCancel={onCancel}
                            focusCancelBtn
                        >
                            You will not be able to recover this data!
                        </SweetAlert>
                    )
                }

            </MDBRow>
            <MDBRow className='custom-margin-top'>
                <MDBCol md='6' >
                    <MDBCard alignment='center' >
                        <MDBCardHeader>

                            <span className='text-primary'>Categories</span> <span className='text-danger'>({categoryData.length})</span>
                            <MDBBtn onClick={() => setCatModal(true)} size='sm' className='text-primary position-absolute top-0 end-0 mt-1 me-3' tag='a' color='light' floating>
                                <MDBTooltip tag='span' title="Add Category">
                                    <MDBIcon fas icon="add" />
                                </MDBTooltip>
                            </MDBBtn>

                        </MDBCardHeader>
                        <MDBCardBody className='custom-height-setting'>
                            {(catLoading === false) ? (<Table title={'category'} header={categoryHeader} data={categoryData} editData={openCategoryModal} deleteData={deleteCategoryConfirm} />)
                                : (
                                    <MDBSpinner role='status'>
                                        <span className='visually-hidden'>Loading...</span>
                                    </MDBSpinner>)
                            }
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md='6' >
                    <MDBCard alignment='center' >
                        <MDBCardHeader>

                            <span className='text-primary'>Gem Type</span> <span className='text-danger'>({gemTypeData.length})</span>
                            <MDBBtn onClick={() => setGemTypeModal(true)} size='sm' className='text-primary position-absolute top-0 end-0 mt-1 me-3' tag='a' color='light' floating>
                                <MDBTooltip tag='span' title="Add Gem Type">
                                    <MDBIcon fas icon="add" />
                                </MDBTooltip>
                            </MDBBtn>

                        </MDBCardHeader>
                        <MDBCardBody className='custom-height-setting'>
                            {(gemTypeLoading === false) ? (<Table title={'gemType'} header={gemTypeHeader} data={gemTypeData} editData={openGemTypeModal} deleteData={deleteGemTypeConfirm} />)
                                : (
                                    <MDBSpinner role='status'>
                                        <span className='visually-hidden'>Loading...</span>
                                    </MDBSpinner>)
                            }
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default Dashboard;