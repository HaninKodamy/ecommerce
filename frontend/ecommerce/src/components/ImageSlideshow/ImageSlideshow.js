import React, { useState, useEffect } from 'react';
import './ImageSlideshow.css';
import Image1 from '../../assets/images/WhatsApp Image 2023-10-02 at 2.56.33 PM.jpeg';
import Image2 from '../../assets/images/WhatsApp Image 2023-10-02 at 4.40.58 PM.jpeg';
import Image3 from '../../assets/images/WhatsApp Image 2023-10-02 at 4.41.02 PM.jpeg';

export default function ImageSlideshow() {
  const images = [Image1, Image2, Image3];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentImageIndex ? 'active' : ''}`}
        >
          <img src={image} alt="" className="slideshow-image" />
        </div>
      ))}
    </div>
  );
}
