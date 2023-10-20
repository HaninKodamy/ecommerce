import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './index.css';

function ProductsOverview() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch listings
    axios.get('http://localhost:4000/api/listings')
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching listings:', error);
      });
  }, []); // Empty dependency array, so it runs once on component mount
   
    
  return (

    <div className="listings-container">
      <div className='heading-container'>
        <div className='heading'>Most Purchased Items</div>
      </div>
      <div className="listings-list row">
        {listings.map((listing) => (
          <div key={listing._id} className="col-3 listing-item">
            <div className="image-container">
              <img src={listing.images[0]} alt={listing.title} />
            </div>
            <h2>{listing.description}</h2>
            <h4>{listing.title}</h4>
            <h3 className='price'>${listing.price}</h3>
          </div>
        ))}
      </div>
      <Link to="/products" style={{ textDecoration: 'none' }}>
        <span className="load-more">Load More</span>
      </Link>
    </div>
  );
}

export default ProductsOverview;
