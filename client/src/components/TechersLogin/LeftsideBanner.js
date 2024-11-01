import React from 'react'
import logo from '../../assets/images/image.png'
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.jpg';
import '../../styles/LeftsideBanner.css';

function LeftsideBanner() {
  return (
        <div className="login-left">
        <div className="login-logo">
          <img src={logo} alt="school Logo" /> 
          <h3>Sri Techno Schools</h3>
        </div>
        <div className="login-images">
          <img src={image1} alt="img1" className="login-image" />
          <img src={image2} alt="Woman with Laptop" className="login-image" />
        </div>
    </div>
  )
}

export default LeftsideBanner