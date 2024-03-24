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
            src={data.images[0]?.path ? `${API_URL}/${data.images[0]?.path}` : defaultImage}
            alt='...'
            position='top'
          />
        </MDBTooltip>

        <MDBCardBody>
          <MDBCardText>
            Price : {data.price}USD
          </MDBCardText>
          <MDBCardText className='text-danger'>
            {data.description}
          </MDBCardText>

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