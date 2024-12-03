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
import * as XLSX from "xlsx";
import '../../styles/admin/main.css'

const Feedback = () => {
    const [loading, setLoading] = React.useState(true);
    const tableHeader = ['name', 'email', 'phone', 'message', 'status', 'date', 'action'];
    const [tableData, setTableData] = React.useState([]);
    const [tableModal, setTableModal] = React.useState(false)


    const getFeedbackData = async () => {
        try {
            setLoading(true)
            const response = await get('api/feedback/getAll');
            if (response.status === 200) {
                setLoading(false);
                setTableData(response.data.data);
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
        getFeedbackData();
    }, []);

    const updateStatus = async (value) => {
        value.status = 'confirmed'
        setLoading(true)
        try {
            let response = await patch(`api/feedback/update/${value._id}`, value);
            if (response.status === 200) {

                toast.success(response.data.message);
                let newArr = tableData.map((obj) =>
                    obj._id === tableData._id ? { ...obj, ...response.data.data } : obj
                );
                setTableData(newArr);
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

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        // Export the Excel file
        XLSX.writeFile(workbook, 'feedback.xlsx');
    };
    return (
        <MDBRow className='custom-margin-top'>
            <MDBCol md='12' >
                <MDBCard alignment='center' style={{ height: '100%' }}>
                    <MDBCardHeader>
                        <span className='text-primary'>Feedbacks</span> <span className='text-danger'>({tableData.length})
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
                        <MDBBtn onClick={() => getFeedbackData()} size='sm' className='text-primary position-absolute top-7 end-0 mt-1 me-3' tag='a' color='light' floating>
                            <MDBTooltip tag='span' title="Get Latest Data">
                                <MDBIcon fas icon="sync-alt" />
                            </MDBTooltip>
                        </MDBBtn>

                    </MDBCardHeader>
                    <MDBCardBody className='custom-height-setting'>
                        {(loading === false) ? (<Table title={'feedback'} header={tableHeader} data={tableData} updateFeedback={updateStatus} />)

                            : (<MDBSpinner role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>)
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <ToastContainer />
        </MDBRow>

    )
}

export default Feedback