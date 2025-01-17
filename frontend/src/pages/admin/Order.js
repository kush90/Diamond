import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Table from '../../components/Table';
import ProductImage from '../../components/modals/ProductImage';
import Detail from '../../components/modals/Detail';
import Payment from '../../components/modals/Payment';
import { get, post, patch, remove } from '../../Api';
import {
    MDBRow, MDBCol, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBBtn,
    MDBTooltip, MDBIcon,
    MDBSpinner
} from 'mdb-react-ui-kit';
import '../../styles/admin/main.css'
import * as XLSX from "xlsx";

const Order = () => {
    const [loading, setLoading] = React.useState(true);
    const [productImageModal, setProductImageModal] = React.useState(false);
    const [productImage, setProductImage] = React.useState('');
    const [viewDetailModal, setViewDetailModal] = React.useState(false);
    const [paymentModal, setPaymentModal] = React.useState(false);
    const [paymentData, setPaymentData] = React.useState('');
    const [viewDetailData, setViewDetailData] = React.useState('');
    const [orderData, setOrderData] = React.useState([]);
    const orderHeader = ['referenceNo', 'product', 'price', 'status', 'Date', 'action'];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalCount, setTotalCount] = React.useState(null);
    const getOrderData = async () => {
        try {
            setLoading(true)
            const response = await get(`api/order/getAll/admin?page=${page + 1}&limit=${rowsPerPage}`);
            if (response.status === 200) {
                setLoading(false);
                const filteredData = response.data.data.filter(order => order.product !== null);
                setOrderData(filteredData);
                setTotalCount(response.data.totalCount)
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
    }, [page, rowsPerPage]);

    const productView = (data) => {
        setProductImageModal(true);
        setProductImage(data.images)
    }
    const closeProductImageModal = async () => {
        setProductImageModal(false);
    }

    const viewDetail = (data) => {
        setViewDetailModal(true);
        setViewDetailData(data)
    }
    const closeViewDetailModal = async () => {
        setViewDetailModal(false);
    }
    const confirmDeliver = async (value) => {
        try {
            setLoading(true);
            let response = await patch(`api/order/update/${value._id}`, { status: 'delivered' });
            if (response.status === 200) {
                setLoading(false);
                toast.success('The product is successfully delivered to the buyer');
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
    const confirmPayment = async (value) => {
        setPaymentModal(true)
        setPaymentData(value)
    }
    const closePaymentModal = async (value) => {
        console.log(value)
        setPaymentModal(false);
        if(value !== false) payment(value);
    }
    const payment = async (value) => {
        try {
            setLoading(true);
            let response = await patch(`api/order/update/${paymentData._id}`, value);
            if (response.status === 200) {
                setLoading(false);
                toast.success('Commission fee is transferred successfully to the broker');
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

    const handlePageChange = (newPage, newRowsPerPage) => {
        console.log(newPage)
        setPage(newPage);
        console.log(page)
        setRowsPerPage(newRowsPerPage);
    };

    const exportExcel = () => {
        const formattedData = orderData.map((item) => ({
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
        XLSX.writeFile(workbook, 'orders.xlsx');
    };
    return (
        <MDBRow className='custom-margin-top'>
            <MDBCol md='12' >
                <MDBCard alignment='center' style={{ height: '100%' }}>
                    <MDBCardHeader>
                        <span className='text-primary'>Order</span> <span className='text-danger'>({orderData.length})
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
                        <MDBBtn onClick={() => getOrderData()}  size='sm' className='text-primary position-absolute top-7 end-0 mt-1 me-3' tag='a' color='light' floating>
                            <MDBTooltip tag='span' title="Get Latest Data">
                            <MDBIcon fas icon="sync-alt" />
                            </MDBTooltip>
                        </MDBBtn>
                    </MDBCardHeader>
                    <MDBCardBody className='custom-height-setting'>
                        {(loading === false) ? (<Table title={'order'} header={orderHeader} data={orderData} productData={productView} viewDetail={viewDetail} confirmDeliver={confirmDeliver} confirmPayment={confirmPayment}  page={page} rowsPerPage={rowsPerPage} onPageChange={handlePageChange} totalCount={totalCount}/>)

                            : (<MDBSpinner role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>)
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <ToastContainer />
            {productImageModal && <ProductImage open={productImageModal} closeModal={closeProductImageModal} data={productImage} />}
            {viewDetailModal && <Detail open={viewDetailModal} closeModal={closeViewDetailModal} data={viewDetailData} />}
            {paymentModal && <Payment open={paymentModal} closeModal={closePaymentModal} />}

        </MDBRow>

    )
}

export default Order