// components/Footer/Footer.jsx
import React from "react";
import "./Footer.css"; // Import custom styles for the Footer component

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Contact Us</h3>
            <p>
              <strong>Email:</strong> contact@capstone.com
            </p>
            <p>
              <strong>Phone:</strong> +123-456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 Street, City, Country
            </p>
          </div>
          <div className="col-md-6">
            <h3>Follow Us</h3>
            <ul className="social-links">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              {/* Add more social media links as needed */}
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <p className="text">© 2024 CAPSTONE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
