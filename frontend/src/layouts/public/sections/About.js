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
          <h1 className="w3-center" style={{ fontWeight: 'bolder' }}>A Trusted Platform for Brokers and Customers</h1><br />
          <p className="w3-large">
          Welcome to our new online jewelry shop, the premier platform revolutionizing the jewelry market. Our platform not only connects buyers with exquisite jewelry but also empowers brokers to facilitate transactions seamlessly, earning substantial rewards in the process.          </p>
          <h5 style={{ fontWeight: 'bold' }}>Broker-Friendly Platform</h5>
          <p className="w3-large">
            We provide a unique opportunity for brokers to become an integral part of the jewelry industry by registering on our platform. Brokers play a pivotal role in connecting potential buyers with the jewelry they desire, and for their efforts, they earn a competitive 10% fee on every successful deal. Our platform ensures a straightforward registration process, allowing brokers to start earning quickly and efficiently while enjoying a professional and supportive environment.          </p>
          <h5 style={{ fontWeight: 'bold' }}>Unmatched Product Assurance</h5>
          <p className='w3-large'>
            At our online platform, we believe in complete transparency and customer satisfaction. Every product listed on our platform comes with a 100% warranty, providing peace of mind to buyers. This warranty guarantees the authenticity, quality, and craftsmanship of our jewelry, allowing customers to shop with confidence.
          </p>
          <h5 style={{ fontWeight: 'bold' }}>Cash on Delivery Service
          </h5>
          <p className='w3-large'>
          To make your shopping experience even more convenient, we offer a Cash on Delivery (COD) service for select locations. This ensures that you can inspect your purchase before making payment, further strengthening trust and satisfaction in every transaction. COD adds an extra layer of convenience and security for our customers, making it easier than ever to shop with confidence.          </p>
          <section id="why-choose-us">
            <h5 style={{ fontWeight: 'bold' }}>Why Choose Us?</h5>
            <ul>
              <li>
                <strong>Diverse Product Range: </strong>
                Our catalog features a wide selection of high-quality jewelry, catering to every taste and occasion.
              </li>
              <li>
                <strong>Broker Incentives: </strong>
                Brokers can earn significant commissions while benefiting from an easy-to-use platform that supports their growth and success.
              </li>
              <li>
                <strong>Customer Trust: </strong>
                With our 100% warranty and  customers feel secure in every transaction.
              </li>
              <li>
                <strong>Seamless Transactions: </strong>
                Our platform simplifies the buying and selling process, making it accessible and efficient for everyone involved.
              </li>
              <li>
                <strong>Cash on Delivery: </strong>
                Experience added convenience and assurance with our COD option, allowing you to pay only after inspecting your purchase.              </li>
            </ul>
          </section>

        </div>
        <div className="about-image">
          <img src={img11} className="w3-round" alt="Vision and Mission" />
        </div>

      </div>
    </div>
  </div>
);

export default About;
