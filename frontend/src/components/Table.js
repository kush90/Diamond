import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBTooltip, MDBIcon, MDBBadge } from 'mdb-react-ui-kit';
import { formatDateToLocaleString, separateAndCapitalize } from '../Helper';

import '../styles/table.css'


const Table = ({ title, header, data, editData, deleteData, productData, confirmDeal, viewDetail, confirmDeliver, confirmPayment, viewCommission, getTotalOrder, updateFeedback }) => {

    const [expandedRow, setExpandedRow] = useState(null); // Track the expanded row
    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index); // Toggle the clicked row
    };
    const editRow = (row) => {
        editData(row)
    }
    const productView = (row) => {
        productData(row)
    }

    const orderViewByUser = (row) => {
        getTotalOrder(row)
    }

    const updateStatus = (row) => {
        updateFeedback(row)
    }
    return (
        <MDBTable>

            <MDBTableHead>
                <tr>
                    <th scope='col'>#</th>
                    {
                        header.map((value, index) => {
                            return <th key={index} scope='col'>{separateAndCapitalize(value)}</th>
                        })
                    }
                </tr>
            </MDBTableHead>

            <MDBTableBody>
                {
                    data.length > 0 ? data.map((value, index) => {
                        return (
                            <tr key={index} >
                                <th scope='row'>{index + 1}</th>
                                {title === 'product' && <td className="text-primary pointer">{value.productNumber}</td>}
                                {(title === 'product' || title === 'category' || title === 'user' || title === 'gemType' || title === 'feedback') &&

                                    <td className="text-truncate text-primary pointer" style={{ maxWidth: 116 }} onClick={title === 'user' ? () => orderViewByUser(value) : undefined}>{value.name}</td>


                                }
                                {title === 'product' && value?.categoryId?.name && <td>{separateAndCapitalize(value?.categoryId?.name)}</td>}
                                {title === 'product' && value?.gemTypeId?.name && <td>{separateAndCapitalize(value?.gemTypeId?.name)}</td>}
                                {title === 'product' && value.price && <td>{value.price}</td>}
                                {title === 'feedback' && value.email && <td>{value.email}</td>}
                                {title === 'feedback' && value.phone && <td>{value.phone}</td>}
                                {title === 'feedback' && value.message && (
                                    <td
                                        className="text-truncate text-primary pointer"
                                        style={{
                                            maxWidth: expandedRow === index ? 'none' : 116,
                                            overflow: expandedRow === index ? 'visible' : 'hidden',
                                            textOverflow: expandedRow === index ? 'unset' : 'ellipsis',
                                            whiteSpace: expandedRow === index ? 'normal' : 'nowrap',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleRowClick(index)} // Toggle full text on click
                                    >
                                        {value.message}
                                    </td>
                                )}
                                {title === 'product' && value.description &&
                                    <td
                                        className="text-truncate text-primary pointer"
                                        style={{
                                            maxWidth: expandedRow === index ? 'none' : 116,
                                            overflow: expandedRow === index ? 'visible' : 'hidden',
                                            textOverflow: expandedRow === index ? 'unset' : 'ellipsis',
                                            whiteSpace: expandedRow === index ? 'normal' : 'nowrap',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleRowClick(index)} // Toggle full text on click
                                    >
                                        {value.description}
                                    </td>
                                }
                                {(title === 'product' || title === 'feedback') && value.status && <td>

                                    {(value.status === 'active') &&
                                        <MDBBadge pill light >
                                            {

                                                separateAndCapitalize(value.status)

                                            }
                                        </MDBBadge>
                                    }
                                    {(value.status === 'pending') &&
                                        <MDBBadge pill color='warning' light>
                                            {

                                                separateAndCapitalize(value.status)

                                            }
                                        </MDBBadge>
                                    }
                                    {(value.status === 'sold' || value.status === 'confirmed') &&
                                        <MDBBadge pill color='success' light>
                                            {

                                                separateAndCapitalize(value.status)

                                            }
                                        </MDBBadge>
                                    }
                                </td>}
                                {title === 'product' && <td>{formatDateToLocaleString(value.createdAt)}</td>}
                                {(title === 'deal' || title === 'order' || title === 'table') && <td>{value.referenceNo}</td>}
                                {(title === 'deal' || title === 'order' || title === 'table') && <td>
                                    {value.product && <a href="#" onClick={() => productView(value.product)}>{value.product?.name}</a>}
                                </td>
                                }
                                {(title === 'deal' || title === 'order' || title === 'table') && <td>{value.product?.price} {value.product && 'USD'}</td>}
                                {(title === 'deal' || title === 'order' || title === 'table') && <td>


                                    {(value.status === 'pending') &&
                                        <MDBBadge pill color='warning' light>
                                            {

                                                separateAndCapitalize(value.status)

                                            }
                                        </MDBBadge>
                                    }
                                    {(value.status === 'toDeliver') &&
                                        <MDBBadge pill color='danger' light>
                                            {

                                                separateAndCapitalize(value.status)

                                            }
                                        </MDBBadge>
                                    }
                                    {(value.status === 'delivered') &&
                                        <MDBBadge pill color='success' light>
                                            {

                                                separateAndCapitalize(value.status)

                                            }
                                        </MDBBadge>
                                    }
                                    {(value.status === 'doneDeal') &&
                                        <MDBBadge pill color='primary' light>
                                            {

                                                separateAndCapitalize(value.status)

                                            }
                                        </MDBBadge>
                                    }


                                </td>

                                }

                                {(title === 'deal' || title === 'order' || title === 'table' || title === 'feedback') && <td>{formatDateToLocaleString(value.createdAt)}</td>}
                                {title === 'user' && <td>{value.email ? value.email : 'N/A'}</td>}
                                {title === 'user' && <td>{value.phoneNo}</td>}
                                {title === 'user' && <td className='text-primary'>{value.totalDeals}</td>}
                                {title === 'user' && <td>{formatDateToLocaleString(value.createdAt)}</td>}
                                {(title === 'deal' || title === 'order' || title === 'category' || title === 'product' || title === 'gemType' || title === 'feedback') &&
                                    <td>
                                        {
                                            (title === 'product' || title === 'category' || title === 'gemType') &&
                                            <MDBBtn onClick={() => editRow(value)} size='sm' className='ms-2  text-primary' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="Edit">
                                                    <MDBIcon fas icon="edit" />
                                                </MDBTooltip>
                                            </MDBBtn>
                                        }
                                        {
                                            (title === 'product' || title === 'category' || title === 'gemType') &&
                                            <MDBBtn onClick={() => deleteData(value)} size='sm' className='ms-2  text-danger' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="Delete">
                                                    <MDBIcon fas icon="trash" />
                                                </MDBTooltip>
                                            </MDBBtn>
                                        }
                                        {
                                            (title === 'deal' && value.status === 'pending') &&
                                            <MDBBtn onClick={() => confirmDeal(value)} size='sm' className='ms-2  text-primary' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="Confirm Deal">
                                                    <MDBIcon fas icon="check-circle" />
                                                </MDBTooltip>
                                            </MDBBtn>
                                        }
                                        {
                                            (title === 'deal' && value.status === 'doneDeal') &&
                                            <MDBBtn onClick={() => viewCommission(value)} size='sm' className='ms-2  text-primary' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="Commission Fee">
                                                    <MDBIcon fas icon="file-invoice-dollar" />
                                                </MDBTooltip>
                                            </MDBBtn>
                                        }
                                        {
                                            (title === 'order' && value.status === 'toDeliver') &&
                                            <MDBBtn onClick={() => confirmDeliver(value)} size='sm' className='ms-2  text-danger' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="Confrim Delivered">
                                                    <MDBIcon fas icon="truck" />
                                                </MDBTooltip>
                                            </MDBBtn>
                                        }
                                        {
                                            (title === 'order' && value.status === 'delivered') &&
                                            <MDBBtn onClick={() => confirmPayment(value)} size='sm' className='ms-2  text-primary' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="Confirm Payment To Broker">
                                                    <MDBIcon fas icon="file-invoice-dollar" />
                                                </MDBTooltip>
                                            </MDBBtn>
                                        }
                                        {
                                            (title === 'order' || title === 'deal') &&
                                            <MDBBtn onClick={() => viewDetail(value)} size='sm' className='ms-2  text-primary' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="View Detail">
                                                    <MDBIcon fas icon="info-circle" />
                                                </MDBTooltip>
                                            </MDBBtn>
                                        }
                                        {
                                            (title === 'feedback' && value.status === 'pending') &&
                                            <MDBBtn onClick={() => updateStatus(value)} size='sm' className='ms-2  text-primary' tag='a' color='light' floating>
                                                <MDBTooltip tag='span' title="Close Feedback">
                                                    <MDBIcon far icon="check-square" />                                                </MDBTooltip>
                                            </MDBBtn>
                                        }

                                    </td>
                                }

                            </tr>
                        )
                    }) : (<tr><td className='no-data-setting' colSpan={header.length + 1}>No Data</td></tr>)
                }
            </MDBTableBody>

        </MDBTable>
    );
}

export default Table;