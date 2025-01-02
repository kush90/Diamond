import React from 'react';
import logo from "../../../assets/logo1.png";
import img11 from "../../../assets/img11.jpg";
// import anotherImage from "../../../assets/anotherImage.png";
import '../../../styles/public/main.css';

const About = () => (
  <div>
    {/* First Section */}
    <div className="about-section" id="about">
      <div className="about-content">
        <div className="about-image">
          <img src={logo} className="w3-round" alt="Table Setting" />
        </div>
        <div className="about-text">
          <h1 className="w3-center" style={{ fontWeight: 'bolder' }}>About Business Alliance Hub</h1><br />
          <h5 style={{ fontWeight: 'bold' }}>Building Successful Businesses Since 1985</h5><br />
          <p className="w3-large">
            <strong>Business Alliance Hub (BAH)</strong> is Myanmar’s premier one-stop solution for foreign investors. Located on the top floor of the newly established Business Alliance Hub, our full-service business center is fully equipped to meet every business requirement—from office supplies and equipment to state-of-the-art conference rooms, private office spaces, and comprehensive secretarial services.</p>
          <p className="w3-large">
            Our in-house consultants are highly knowledgeable in Myanmar’s Foreign Investment Law and are ready to assist investors throughout all stages of business development. Whether you're forming your company or are still in the planning phase, BAH provides the expertise and resources to support your success.
          </p>
          <p className='w3-large'>We are a dynamic team of over 500 seasoned professionals, each committed to driving value for our clients. From engineers, scientists, and geologists to experts in recruitment, career development, and more, we uphold the highest standards of excellence and integrity. Our corporate values shape our culture, guiding every decision we make to ensure our clients achieve their business goals.</p>
        </div>
      </div>
    </div>

    {/* Second Section */}
    <div className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h1 className="w3-center" style={{ fontWeight: 'bolder' }}>Our Vision and Mission</h1><br />
          <h5 style={{ fontWeight: 'bold' }}>Driving Innovation and Sustainable Growth</h5><br />
          <p className="w3-large">
            At <strong>Business Alliance Hub (BAH)</strong>, our vision is to be the leading business consulting service for companies looking to expand in Myanmar and Southeast Asia. We aim to offer exceptional service that creates real impact for our clients and their businesses.</p>
          <p className="w3-large">
            Our mission is simple: to provide comprehensive, top-tier support that enables businesses to navigate the complexities of operating in Myanmar with confidence. From market entry strategies to navigating local regulations, we stand by our clients every step of the way.
          </p>
          <p className='w3-large'>Through innovative solutions and a commitment to excellence, we are continually evolving to meet the needs of a rapidly changing market, ensuring that every client we work with achieves sustainable growth.</p>
        </div>
        <div className="about-image">
          <img src={img11} className="w3-round" alt="Vision and Mission" />
        </div>

      </div>
    </div>
  </div>
);

export default About;
