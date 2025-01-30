import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
} from 'mdb-react-ui-kit';
import ProductImage from '../components/modals/ProductImage';
import defaultImage from '../assets/default.jpeg';
import { API_URL } from '../Helper';

const Card = ({ data, handleClick }) => {
  const [productImageModal, setProductImageModal] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const book = () => {
    handleClick(data);
  };

  const productView = () => {
    setProductImageModal(true);
  };

  const closeProductImageModal = async () => {
    setProductImageModal(false);
  };

  const handleMouseMove = (e) => {
    // Update tooltip position based on mouse coordinates
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <MDBCard
        className="pro-card"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Image Container with Tooltip */}
        <div
          style={{ width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          onMouseMove={handleMouseMove}
          onClick={productView}
        >
          <MDBCardImage
            src={data.certificate[0]?.path ? `${API_URL}/${data.certificate[0]?.path}` : defaultImage}
            alt="..."
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>

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
          <MDBBtn onClick={book} className="book-btn" rounded size="sm">
            Book Now
          </MDBBtn>
        </MDBCardFooter>
      </MDBCard>

      {/* Custom Tooltip */}
      {tooltipVisible && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x + 10}px`, // Offset to avoid overlapping the cursor
            top: `${tooltipPosition.y + 10}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '0.875rem',
            pointerEvents: 'none', // Ensure the tooltip doesn't interfere with mouse events
            zIndex: 1000, // Ensure it appears above other elements
          }}
        >
          View product images
        </div>
      )}

      {productImageModal && (
        <ProductImage open={productImageModal} closeModal={closeProductImageModal} data={data.images} />
      )}
    </>
  );
};

export default Card;