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

        <MDBCardBody>
        <MDBCardText>
            Gem Type: {data.gemTypeId.name}
          </MDBCardText>
          <MDBCardText>
            Price: <span className='text-danger'>{data.price} USD </span>
          </MDBCardText>
          <MDBCardText>
            Description: {data.description}
          </MDBCardText>
          { data.shortDescription && <MDBCardText className='text-danger text-center'>
             {data.shortDescription}
          </MDBCardText>
          }

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