import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Table from '../../components/Table';
import ProductImage from '../../components/modals/ProductImage';
import Detail from '../../components/modals/Detail';
import DeliveryAddress from '../../components/modals/DeliveryAddress';
import { get, patch } from '../../Api';
import {
    MDBRow, MDBCol, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBSpinner,
    MDBBtn,
    MDBTooltip, MDBIcon,
} from 'mdb-react-ui-kit';
import '../../styles/broker/main.css'
import * as XLSX from "xlsx";

const Deal = () => {
    const [loading, setLoading] = React.useState(true);
    const [productImageModal, setProductImageModal] = React.useState(false);
    const [productImage, setProductImage] = React.useState('');
    const [viewDetailModal, setViewDetailModal] = React.useState(false);
    const [viewDetailData, setViewDetailData] = React.useState('');
    const [DeliveryAddressModal, setDeliveryAddressModal] = React.useState(false);
    const [dealData, setDealData] = React.useState([]);
    const [tempdealData, setTempDealData] = React.useState('');
    const dealHeader = ['referenceNo', 'product', 'price', 'status', 'Date', 'action'];
    const getOrderData = async () => {
        try {
            setLoading(true)
            const response = await get('api/order/getAll');
            if (response.status === 200) {
                setLoading(false);
                const filteredData = response.data.data.filter(order => order.product !== null);
                setDealData(filteredData);
                console.log(filteredData)
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
        getOrderData();
    }, []);

    const productView = (data) => {
        setProductImageModal(true);
        setProductImage(data.images)
    }
    const closeProductImageModal = async () => {
        setProductImageModal(false);
        setProductImage('')
    }

    const confirmDeal = async (value) => {
        setTempDealData(value);
        setDeliveryAddressModal(true)
    }
    const closeDeliveryAddressModal = async (value) => {
        if (value !== false) {
            let obj = {};
            obj['deliveryAddress'] = value;
            obj['status'] = 'toDeliver';
            obj['product'] = tempdealData.product._id;
            await updateDeal(obj);
        }
        setDeliveryAddressModal(false);
    }
    const updateDeal = async (value) => {
        try {
            setLoading(true);
            let response = await patch(`api/order/update/${tempdealData._id}`, value);
            if (response.status === 200) {
                setLoading(false);
                toast.success('You have just sent the buyer address to the system!');
                getOrderData();
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

    const viewCommission = (value) =>{
        setProductImageModal(true);
        setProductImage([value.receipt])
    }
    const viewDetail = (data) => {
        setViewDetailModal(true);
        setViewDetailData(data)
    }
    const closeViewDetailModal = async () => {
        setViewDetailModal(false);
    }

    const exportExcel = () => {
        const formattedData = dealData.map((item) => ({
            "Reference No": item.referenceNo,
            "Product Name": item.product?.name || "N/A", // Product name
            "Broker Name": item.broker?.name || "N/A", // Broker name
            "Delivery Full Name": item.deliveryAddress?.fullName || "N/A", // Full name
            "Delivery Phone No": item.deliveryAddress?.phoneNo || "N/A", // Phone number
            "Delivery Address": item.deliveryAddress?.address || "N/A", // Address
            "Delivery Email": item.deliveryAddress?.email || "N/A", // Email
            "Receipt Path": item.receipt?.path || "N/A", // Receipt file path
            "Status": item.status,
            "Created At": new Date(item.createdAt).toLocaleString(), // Format createdAt date
            "Updated At": new Date(item.updatedAt).toLocaleString(), // Format updatedAt date
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        // Export the Excel file
        XLSX.writeFile(workbook, 'deals.xlsx');
    };
    return (
        <MDBRow className='custom-margin-top'>
            <MDBCol md='12' >
                <MDBCard alignment='center' style={{ height: '100%' }}>
                    <MDBCardHeader>
                        <span className='text-primary'>Deals</span> <span className='text-danger'>({dealData.length})
                        <MDBBtn
                                onClick={() => exportExcel()}
                                tag="a"
                                size='sm'
                                className='text-primary' style={{ left: '10px', top: '3px' }} color='light'
                                floating
                            >
                                <MDBTooltip tag="span" title="Export Data">
                                    <MDBIcon fas icon="file-excel" />
                                </MDBTooltip>
                            </MDBBtn>
                        </span>
                        <MDBBtn onClick={() => getOrderData()} size='sm' className='text-primary position-absolute top-7 end-0 mt-1 me-3' tag='a' color='light' floating>
                            <MDBTooltip tag='span' title="Get Latest Data">
                                <MDBIcon fas icon="sync-alt" />
                            </MDBTooltip>
                        </MDBBtn>
                    </MDBCardHeader>
                    <MDBCardBody className='custom-height-setting'>
                        {(loading === false) ? (<Table title={'deal'} header={dealHeader} data={dealData} productData={productView} viewDetail={viewDetail} confirmDeal={confirmDeal} viewCommission={viewCommission} />)

                            : (<MDBSpinner role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>)
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <ToastContainer />
            {productImageModal && <ProductImage open={productImageModal} closeModal={closeProductImageModal} data={productImage} />}
            {DeliveryAddressModal && <DeliveryAddress open={DeliveryAddressModal} closeModal={closeDeliveryAddressModal} />}
            {viewDetailModal && <Detail open={viewDetailModal} closeModal={closeViewDetailModal} data={viewDetailData} />}

        </MDBRow>

    )
}

export default Deal