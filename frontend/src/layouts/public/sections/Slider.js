import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img from "../../../assets/img.jpg";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import img4 from "../../../assets/img4.jpg";
import img6 from "../../../assets/img6.jpg";
import img12 from "../../../assets/img12.jpg";
import '../../../styles/public/main.css';

const images = [img, img1, img2, img3, img4, img6, img12];

const Slider = () => (
  <div className="slider-container" id="jewelleries">
    <h1 className="slider-heading" style={{color:"#007bff"}}>Jewelleries</h1>
    <Slide 
      slidesToScroll={1} 
      slidesToShow={1} 
      indicators={true}
      autoplay 
      pauseOnHover 
      duration={1000}
      arrows={false} 
      responsive={[
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]}
    >
      {images.map((src, index) => (
        <div 
          key={index} 
          className="slide-item"
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            position: 'relative',
          }}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="slide-image"
          />
        </div>
      ))}
    </Slide>
  </div>
);

export default Slider;