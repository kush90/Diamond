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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalCount, setTotalCount] = React.useState(null);

    const getOrderData = async () => {
        try {
            setLoading(true)
            const response = await get(`api/order/getAll?page=${page + 1}&limit=${rowsPerPage}`);
            if (response.status === 200) {
                setLoading(false);
                const filteredData = response.data.data.filter(order => order.product !== null);
                setDealData(filteredData);
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
    const handlePageChange = (newPage, newRowsPerPage) => {
        console.log(newPage)
        setPage(newPage);
        console.log(page)
        setRowsPerPage(newRowsPerPage);
    };
    return (
        <MDBRow className='custom-margin-top'>
            <MDBCol md='12' >
                <MDBCard alignment='center' style={{ height: '100%' }}>
                    <MDBCardHeader>
                        <span className='text-primary'>Deals</span> <span className='text-danger'>({dealData.length})</span>
                        <MDBBtn onClick={() => getOrderData()} size='sm' className='text-primary position-absolute top-7 end-0 mt-1 me-3' tag='a' color='light' floating>
                            <MDBTooltip tag='span' title="Get Latest Data">
                                <MDBIcon fas icon="sync-alt" />
                            </MDBTooltip>
                        </MDBBtn>
                    </MDBCardHeader>
                    <MDBCardBody className='custom-height-setting'>
                        {(loading === false) ? (<Table title={'deal'} header={dealHeader} data={dealData} productData={productView} viewDetail={viewDetail} confirmDeal={confirmDeal} viewCommission={viewCommission} page={page} rowsPerPage={rowsPerPage} onPageChange={handlePageChange} totalCount={totalCount}  />)

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