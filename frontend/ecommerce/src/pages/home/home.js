import React, { useState } from 'react';
import Header from '../../components/header';
import Categories from '../../components/categories';
import ProductsOverview from '../../components/products_overview';
import Footer from '../../components/footer';
import scrollIcon from '../../assets/images/scroll-to_icon.png';
import './home.css';

export default function Home() {
  const [showOverview, setShowOverview] = useState(false);

  // Function to toggle the visibility of the overview component
  const toggleOverview = () => {
    setShowOverview(!showOverview);
  };

  return (
    <>
      <Header />
      <Categories />

      <div className="scroll-down-container">
        {/* Scroll to down icon */}
        <img
          src={scrollIcon}
          alt="Scroll down"
          className="scroll-icon"
          onClick={toggleOverview}
        />
      </div>

      {/* ProductsOverview component */}
      {showOverview && <ProductsOverview />}
      <Footer/>
    </>
  );
}
