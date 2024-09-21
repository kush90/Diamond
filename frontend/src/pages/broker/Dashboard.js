import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {
    MDBCol, MDBRow, MDBSpinner
} from 'mdb-react-ui-kit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Card from '../../components/Card';

import '../../styles/broker/main.css';
import { get, post } from '../../Api';


const BrokerDashboard = () => {
    const [loading, setLoading] = React.useState(true);
    const [productData, setProductData] = React.useState([]);
    const [type, setType] = React.useState([]);
    const [gemTypeData, setGemTypeData] = React.useState([]);

    const book = async (value) => {
        try {
            setLoading(true);
            let response = await post('api/order/create', { product: value._id, 'type': 'book' });
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
            const response = await get(`api/product/getAll?gemTypeId=${type}`);
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

    const getGemTypeData = async () => {
        try {
            // setGemTypeLoading(true)
            const response = await get('api/gemType/getAll');
            if (response.status === 200) {

                setGemTypeData(response.data.data);
                // console.log(gemTypeData)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error)
            }
            else {
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        getGemTypeData();
    }, []);

    // Use useEffect to call getProductData whenever 'type' changes
    useEffect(() => {
        getProductData();
    }, [type]);

    const handleChange = (e) => {
        console.log(e.target.value)
        setType(e.target.value)
    }
    return (
        <div className='custom-margin-top'>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-label">Gem Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Gem Type"
                    onChange={handleChange}
                >
                    <MenuItem value=""> <em>None</em></MenuItem>
                    {
                        gemTypeData.map((cat, index) => {
                            return <MenuItem key={cat._id} value={cat._id} >{cat.name}</MenuItem>
                        })
                    }


                </Select>
            </FormControl>
            {(loading === false) ?
                (<MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {
                        (productData && productData.length > 0) ? productData.map((item, index) => {
                            return (

                                <MDBCol key={index}>
                                    <Card key={index} data={item} handleClick={book} />
                                </MDBCol>

                            )
                        }) : <MDBCol>
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