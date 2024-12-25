import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img from "../../../assets/img.jpg";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import img4 from "../../../assets/img4.jpg"

import '../../../styles/public/main.css';
const Slider = () => (
    <div className="w3-container padding-contact" id="jewelleries">
    <h1>Jewelleries</h1>
    <Slide slidesToScroll={1} slidesToShow={1} indicators={true} autoplay={true} pauseOnHover={true} duration={1500} responsive={[
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
    ]}>
      <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <img
          src={img} // Replace with your image URL
          alt="First Slide"
          style={{
            width: '100%', // Ensures the image spans the full width of the container
            height: '100%', // Ensures the image spans the full height of the container
            objectFit: 'cover', // Fills the container while maintaining the aspect ratio
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
      }}>
        <img
          src={img1} // Replace with your image URL
          alt="Second Slide"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
      }}>
        <img
          src={img2} // Replace with your image URL
          alt="Third Slide"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
      }}>
        <img
          src={img3} // Replace with your image URL
          alt="Third Slide"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px'
      }}>
        <img
          src={img4} // Replace with your image URL
          alt="Third Slide"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </Slide>

  </div>
);

export default Slider;
