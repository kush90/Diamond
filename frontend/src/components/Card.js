import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import defaultImage from '../assets/default.jpeg';
import { API_URL } from '../Helper';

const Card = ({ data,handleClick }) => {

  const book = () =>{
    handleClick(data);
  }
  return (
        <MDBCard>
          <MDBCardImage
             src={data.images[0]?.path ? `${API_URL}/${data.images[0]?.path}` : defaultImage}
            alt='...'
            position='top'
          />
          <MDBCardBody>
          <MDBCardText>
             Price : {data.price}USD
            </MDBCardText>
            <MDBCardText className='text-danger'>
              {data.description}
            </MDBCardText>
           
          </MDBCardBody>
          <MDBCardFooter>
          <MDBBtn onClick={book}className="book-btn" rounded>Book</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
    
  );
}
export default Card