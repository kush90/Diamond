import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Table from '../../components/Table';
import { get, patch } from '../../Api';
import {
    MDBRow, MDBCol, MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBSpinner,
    MDBBtn,
    MDBTooltip, MDBIcon,
} from 'mdb-react-ui-kit';
import '../../styles/admin/main.css'
import TableModal from '../../components/modals/TableModal';

const User = () => {
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState([]);
    const userHeader = ['name', 'email', 'phoneNo','totalDeals','joinDate'];
    const [tableModal, setTableModal] = React.useState(false);
    const [tableData, setTableData] = React.useState([]);
    const tableHeader = ['referenceNo', 'product', 'price', 'status', 'date'];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalCount, setTotalCount] = React.useState(null);

    const getUserData = async () => {
        try {
            setLoading(true)
            const response = await get(`api/user/getAll?page=${page + 1}&limit=${rowsPerPage}`);
            if (response.status === 200) {
                setLoading(false);
                setUserData(response.data.data);
                setTotalCount(response.data.totalCount)
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
        getUserData();
    }, [page, rowsPerPage]);

    const getTotalOrder = (value)=>{
        setTableModal(true)
        getOrderData(value)
    }

    const closeTableModal = ()=>{
        setTableModal(false)
    }
    const getOrderData = async (value) => {
        try {
         const response = await get(`api/order/getAll?broker=${value._id}`);
            if (response.status === 200) {
                console.log(response.data)
                setTableData(response.data.data)
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
                        <span className='text-primary'>Users</span> <span className='text-danger'>({userData.length})</span>
                        <MDBBtn onClick={() => getUserData()} size='sm' className='text-primary position-absolute top-7 end-0 mt-1 me-3' tag='a' color='light' floating>
                            <MDBTooltip tag='span' title="Get Latest Data">
                                <MDBIcon fas icon="sync-alt" />
                            </MDBTooltip>
                        </MDBBtn>
                    </MDBCardHeader>
                    <MDBCardBody className='custom-height-setting'>
                        {(loading === false) ? (<Table title={'user'} header={userHeader} data={userData} getTotalOrder={getTotalOrder}  page={page} rowsPerPage={rowsPerPage} onPageChange={handlePageChange} totalCount={totalCount} />)

                            : (<MDBSpinner role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>)
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            {tableModal && <TableModal open={tableModal} title="Orders" tableHeader={tableHeader} data={tableData} close={closeTableModal} />}
            <ToastContainer />
        </MDBRow>

    )
}

export default User