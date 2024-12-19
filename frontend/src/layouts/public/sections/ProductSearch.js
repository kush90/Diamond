import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import '../../../styles/public/main.css';
import axios from 'axios';
import { API_URL } from "../../../Helper";
import Card from '../../../components/Card';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

const ProductSearch = () => {
    const [loading, setLoading] = React.useState(false);
    const [productNumber, setProductNumber] = React.useState('');
    const [productData, setProductData] = React.useState(null);

    const submit = async (e) => {
        setProductData(null); // Reset product data
        e.preventDefault();

        try {
            setLoading(true);

            let response = await axios.get(`${API_URL}/api/public/product/${productNumber}`);

            if (response.status === 200 && response.data) {
                console.log("Product Data: ", response.data);
                setProductData(response.data); // Set product data
            } else {
                // In case the API returns 200 but no data
                setProductData({});
            }
        } catch (error) {
            setLoading(false);

            if (error.response) {
                console.log("Error Response: ", error.response);

                if (error.response.status === 404) {
                    setProductData({}); // Explicitly set to empty object
                } else if (error.response.status === 500) {
                    toast.error("Server error occurred!");
                } else {
                    toast.error(error.response.data.message || "An error occurred.");
                }
            } else {
                toast.error("Network error or server is unreachable.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w3-container padding-search" id="search">
            <h1>Search Product</h1>
            <div className="search-grid">
                {/* Column 1: Search Form */}
                <div className="search-form">
                    <form onSubmit={submit}>
                        <p>
                            <input
                                className="w3-input w3-padding-16"
                                type="text"
                                placeholder="Enter Product Number"
                                required
                                name="productNumber"
                                onChange={(e) => setProductNumber(e.target.value)} value={productNumber}
                            />
                        </p>
                        <div className="button-container" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <Button  disabled={loading} type="submit" variant="contained" endIcon={<SendIcon />}>
                                {loading ? 'Loading...' : 'Search'}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                color="error" // Use 'error' for a red color
                                onClick={() => {
                                    setProductNumber(''); // Clear the input
                                    setProductData(null); // Reset product data
                                }}
                            >
                                Cancel
                            </Button>
                        </div>

                        {/* Conditional Rendering */}
                        {!loading && productData !== null && (
                            <>
                                {Object.keys(productData).length > 0 ? (
                                    // If productData has content
                                    <MDBRow
                                        className='row-cols-1 row-cols-md-3 g-4'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <MDBCol style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Card key={0} data={productData} handleClick={() => { }} hideFooter="true" />
                                        </MDBCol>
                                    </MDBRow>
                                ) : (
                                    // If productData is empty
                                    <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                                        Product not found!
                                    </p>
                                )}
                            </>
                        )}

                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductSearch;
