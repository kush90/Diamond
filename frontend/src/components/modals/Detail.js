import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBadge
} from 'mdb-react-ui-kit';
import '../../styles/admin/main.css'


const Detail = (props) => {

    const close = () => {
        props.closeModal(false)
    }

    const commission = (data) => {
        let fee = (data?.product.price * 10) / 100;
        return fee;
    }

    return (
        <>
            <MDBModal open={props.open} tabIndex='-1' onClose={close} >
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Order Detail</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={close} ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <table className="body-wrap">
                                <tbody>
                                    <tr>
                                        <td className="container" width="600">
                                            <div className="content">
                                                <table className="main" id="printTable" width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <table className='mt-20' width="100%" cellPadding="0" cellSpacing="0">
                                                                                    <tbody>
                                                                                        <tr><td> <MDBBadge color='danger'>Product</MDBBadge></td></tr>
                                                                                        <tr>
                                                                                            <td className='custom-td'>Product Number :&nbsp;&nbsp; <span className='text-primary'>{props.data?.product?.productNumber}</span><br />
                                                                                                Name :&nbsp;&nbsp; <span className='text-danger'> {props.data?.product?.name}</span><br />
                                                                                                Price :&nbsp;&nbsp; <span className='text-success'> {props.data?.product?.price} USD</span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <table width="100%" className='mt-20'>
                                                                                    <tbody>
                                                                                        <tr><td> <MDBBadge >Broker</MDBBadge></td></tr>
                                                                                        <tr>
                                                                                            <td className='custom-td'>Name :&nbsp;&nbsp;<span className='text-primary'>{props.data?.broker.name}</span><br />Phone No :&nbsp;&nbsp; <span className='text-danger'>{props.data?.broker?.phoneNo}</span><br />
                                                                                                Commission Fee :&nbsp;&nbsp; <span className='text-success'>{commission(props.data)} USD</span> <span className='text-danger'> (10%) </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <table className='mt-20' width="100%" cellPadding="0" cellSpacing="0">
                                                                                                    <tbody>
                                                                                                        <tr><td> <MDBBadge color='success'>Buyer</MDBBadge></td></tr>
                                                                                                        <tr>
                                                                                                            {
                                                                                                                props.data.deliveryAddress ? (
                                                                                                                    <td className='custom-td no-border'>Name :&nbsp;&nbsp; <span className='text-primary'>{props.data?.deliveryAddress?.fullName}</span><br />
                                                                                                                        Phone No :&nbsp;&nbsp; <span className='text-danger'> {props.data?.deliveryAddress?.phoneNo}</span><br />
                                                                                                                        Address :&nbsp;&nbsp; <span className='text-success'> {props.data?.deliveryAddress?.address}</span>
                                                                                                                    </td>
                                                                                                                ) : (
                                                                                                                    <td className='custom-td no-border'>The broker is actively marketing the product to potential buyers. </td>
                                                                                                                )
                                                                                                            }
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody></table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={close}>
                                Close
                            </MDBBtn>
                            <MDBBtn color='success' onClick={() => window.print()}>Print</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default Detail;