import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../components/cartContext/index';
import axios from 'axios';
import Navbar from '../../components/navbar/index';
import Footer from '../../components/footer/index';
import './products.css';

function Products() {
  const [listings, setListings] = useState([]);
  const location = useLocation();
  const { cart, dispatch } = useCart(); // Retrieve `cart` from context

  // Check if the item is in the cart
  const isInCart = (listingId) => {
    return cart.some(item => item._id === listingId);
  };

  const addToCart = (listing) => {
    if (!isInCart(listing._id)) { 
      dispatch({ type: 'ADD_ITEM', payload: listing });
    } else {
      console.log("Item is already in the cart");
    }
  };
  useEffect(() => {
    // Extract the category query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    // Determine the API endpoint to fetch data from
    let apiEndpoint = 'http://localhost:4000/api/listings';
    if (category) {
      apiEndpoint = `http://localhost:4000/api/listings/category/${category}`;
    }

    console.log("API Endpoint: ", apiEndpoint);

    // Fetch data from the API and update the component's state
    axios.get(apiEndpoint)
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // Handle error appropriately
      });
  }, [location.search]); // Re-run effect when query parameters change

  return (
    <div className='main-container'>
    <Navbar />
    <div className="listings-container">
      <div className="listings-list row">
        {listings.map((listing) => (
          <div key={listing._id} className="col-3 listing-item">
            <div className="image-container" 
                 onClick={() => addToCart(listing)}
                 style={{cursor: isInCart(listing._id) ? 'not-allowed' : 'pointer'}} // Change cursor style based on item's presence in cart
            >
            <FontAwesomeIcon 
              icon={faShoppingBag} 
              className="shopping-bag-icon" 
              style={{color: isInCart(listing._id) ? 'grey' : 'black'}} // Change icon color based on item's presence in cart
            />
            <span className="tooltip-text">
              {isInCart(listing._id) ? 'Already in Cart' : 'Add to Cart'} 
            </span>
            <img src={listing.images[0]} alt={listing.title} />
            </div>
            <h2>{listing.description}</h2>
            <h4>{listing.title}</h4>
            <h3 className='price'>${listing.price}</h3>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>

  );
}

export default Products;
