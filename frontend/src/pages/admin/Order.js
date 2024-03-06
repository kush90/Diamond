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
    const getOrderData = async () => {
        try {
            setLoading(true)
            const response = await get('api/order/getAll/admin');
            if (response.status === 200) {
                setLoading(false);
                setOrderData(response.data.data);
                console.log(response.data.data)
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
        setPaymentModal(false);
        payment(value);
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
    return (
        <MDBRow className='custom-margin-top'>
            <MDBCol md='12' >
                <MDBCard alignment='center' style={{ height: '100%' }}>
                    <MDBCardHeader>
                        <span className='text-primary'>Order</span> <span className='text-danger'>({orderData.length})</span>
                        <MDBBtn onClick={() => getOrderData()}  size='sm' className='text-primary position-absolute top-7 end-0 mt-1 me-3' tag='a' color='light' floating>
                            <MDBTooltip tag='span' title="Get Latest Data">
                            <MDBIcon fas icon="sync-alt" />
                            </MDBTooltip>
                        </MDBBtn>
                    </MDBCardHeader>
                    <MDBCardBody className='custom-height-setting'>
                        {(loading === false) ? (<Table title={'order'} header={orderHeader} data={orderData} productData={productView} viewDetail={viewDetail} confirmDeliver={confirmDeliver} confirmPayment={confirmPayment} />)

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