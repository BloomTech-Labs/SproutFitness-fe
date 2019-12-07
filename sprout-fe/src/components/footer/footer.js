import React from "react";

const Footer = (props) => {
  return (
    <footer className="footer-section">
      <div class="footer-container">
        <ul class="footer-flex">
          <li class="footer-item footer-nav"><a href="index.html">Home</a></li>
          <li class="footer-item footer-nav"><a href="#services">Services</a></li>
          <li class="footer-item footer-nav"><a href="#contact">Contact</a></li>
        </ul>
        <div class="footer-copyright">
          <p>&copy; 2019 Sprout Fitness</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;