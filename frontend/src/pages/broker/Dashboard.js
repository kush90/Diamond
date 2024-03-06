import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {
    MDBCol, MDBRow, MDBSpinner
} from 'mdb-react-ui-kit';


import Card from '../../components/Card';

import '../../styles/broker/main.css';
import { get, post } from '../../Api';


const BrokerDashboard = () => {
    const [loading, setLoading] = React.useState(true);
    const [productData, setProductData] = React.useState([]);

    const book = async (value) => {
        try {
            setLoading(true);
            let response = await post('api/order/create', { product: value._id });
            if (response.status === 200) {
                setLoading(false);
                toast.success('You have secured this deal to sell!');
                getProductData();
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
    const getProductData = async () => {
        try {
            setLoading(true)
            const response = await get('api/product/getAll');
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
        getProductData();
    }, []);
    return (
        <div className='custom-margin-top'>
            {(loading === false) ?
                (<MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {
                        (productData && productData.length > 0) ? productData.map((item, index) => {
                            return (

                                <MDBCol key={index}>
                                    <Card key={index} data={item} handleClick={book} />
                                </MDBCol>

                            )
                        })  : <MDBCol>
                                <p className='no-data text-primary'>No Data Available yet!</p>
                        </MDBCol>
                    }
                </MDBRow>) : (<MDBSpinner className='spinner' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>)}
                <ToastContainer />
        </div>
    )
}

export default BrokerDashboard