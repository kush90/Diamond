import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBTooltip
} from 'mdb-react-ui-kit';
import ProductImage from '../components/modals/ProductImage';
import defaultImage from '../assets/default.jpeg';
import { API_URL } from '../Helper';

const Card = ({ data, handleClick }) => {
  const [productImageModal, setProductImageModal] = React.useState(false);
  const book = () => {
    handleClick(data);
  }
  const productView = () => {
    setProductImageModal(true);
  }
  const closeProductImageModal = async () => {
    setProductImageModal(false);
  }
  return (
    <>

      <MDBCard className="pro-card" onClick={() => productView()}>
        <MDBTooltip tag='span' title="View product images">
          <MDBCardImage
            src={data.certificate[0]?.path ? `${API_URL}/${data.certificate[0]?.path}` : defaultImage}
            alt='...'
            position='top'
          />
        </MDBTooltip>

        <MDBCardBody style={{ flex: 1, padding: '1rem' }}>
          <MDBCardText style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <strong>Gem Type:</strong> {data.gemTypeId.name}
          </MDBCardText>
          <MDBCardText style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <strong>Price:</strong> <span className="text-danger">{data.price} USD</span>
          </MDBCardText>
          <MDBCardText style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <strong>Description:</strong> {data.description}
          </MDBCardText>
          {data.shortDescription && (
            <MDBCardText className="text-danger text-center" style={{ fontSize: '0.9rem' }}>
              {data.shortDescription}
            </MDBCardText>
          )}
        </MDBCardBody>
        <MDBCardFooter>
          <MDBBtn onClick={book} className="book-btn" rounded>Book</MDBBtn>
        </MDBCardFooter>
      </MDBCard>
      {productImageModal && <ProductImage open={productImageModal} closeModal={closeProductImageModal} data={data.images} />}
    </>
  );
}
export default Card