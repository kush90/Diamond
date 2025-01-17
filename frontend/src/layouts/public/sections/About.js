import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../../../assets/logo1.png';
import img11 from '../../../assets/img11.jpg';

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 4),
  backgroundColor: theme.palette.grey?.[100] || '#f5f5f5', // Use default light grey as fallback
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const StyledImage = styled('img')({
  borderRadius: '8px',
  width: '100%',
  objectFit: 'cover',
});

const About = () => (
  <Container   id="about" maxWidth="xl" style={{ marginTop: '30px' }}>
    {/* First Section */}
    <StyledSection>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <StyledImage src={logo} alt="Business Alliance Hub Logo" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" style={{color:"#007bff"}} gutterBottom>
            About Business Alliance Hub
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Building Successful Businesses Since 1985
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Business Alliance Hub (BAH)</strong> is Myanmar’s premier one-stop solution for foreign investors. Located on the top floor of the newly established Business Alliance Hub, our full-service business center is fully equipped to meet every business requirement—from office supplies and equipment to state-of-the-art conference rooms, private office spaces, and comprehensive secretarial services.
          </Typography>
          <Typography variant="body1" paragraph>
            Our in-house consultants are highly knowledgeable in Myanmar’s Foreign Investment Law and are ready to assist investors throughout all stages of business development. Whether you're forming your company or are still in the planning phase, BAH provides the expertise and resources to support your success.
          </Typography>
          <Typography variant="body1" paragraph>
            We are a dynamic team of over 500 seasoned professionals, each committed to driving value for our clients. From engineers, scientists, and geologists to experts in recruitment, career development, and more, we uphold the highest standards of excellence and integrity.
          </Typography>
        </Grid>
      </Grid>
    </StyledSection>

    {/* Second Section */}
    <StyledSection>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" style={{color:"#007bff"}} gutterBottom>
            A Trusted Platform for Brokers and Customers
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our new online jewellery shop, the premier platform revolutionizing the jewellery market. Our platform not only connects buyers with exquisite jewellery but also empowers brokers to facilitate transactions seamlessly, earning substantial rewards in the process.
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Broker-Friendly Platform
          </Typography>
          <Typography variant="body1" paragraph>
            We provide a unique opportunity for brokers to become an integral part of the jewellery industry by registering on our platform. Brokers play a pivotal role in connecting potential buyers with the jewellery they desire, and for their efforts, they earn a competitive 10% fee on every successful deal.
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Unmatched Product Assurance
          </Typography>
          <Typography variant="body1" paragraph>
            Every product listed on our platform comes with a 100% warranty, providing peace of mind to buyers. This warranty guarantees the authenticity, quality, and craftsmanship of our jewellery, allowing customers to shop with confidence.
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Cash on Delivery Service
          </Typography>
          <Typography variant="body1" paragraph>
            To make your shopping experience even more convenient, we offer a Cash on Delivery (COD) service for select locations. This ensures that you can inspect your purchase before making payment, further strengthening trust and satisfaction in every transaction.
          </Typography>
          <Box mt={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Why Choose Us?
            </Typography>
            <ul>
              <li><Typography variant="body1"><strong>Diverse Product Range:</strong> Our catalog features a wide selection of high-quality jewellery, catering to every taste and occasion.</Typography></li>
              <li><Typography variant="body1"><strong>Broker Incentives:</strong> Brokers can earn significant commissions while benefiting from an easy-to-use platform that supports their growth and success.</Typography></li>
              <li><Typography variant="body1"><strong>Customer Trust:</strong> With our 100% warranty, customers feel secure in every transaction.</Typography></li>
              <li><Typography variant="body1"><strong>Seamless Transactions:</strong> Our platform simplifies the buying and selling process, making it accessible and efficient for everyone involved.</Typography></li>
              <li><Typography variant="body1"><strong>Cash on Delivery:</strong> Experience added convenience and assurance with our COD option, allowing you to pay only after inspecting your purchase.</Typography></li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledImage src={img11} alt="Show Room" />
        </Grid>
      </Grid>
    </StyledSection>
  </Container>
);

export default About;