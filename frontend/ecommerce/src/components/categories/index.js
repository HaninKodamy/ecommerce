import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch categories
    axios.get('http://localhost:4000/api/categories') 
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [categories]);

  return (
    <div className="category-list row">
    {categories.map((category) => (
      <div key={category._id} className="col-3 category-item">
        <Link to={`products?category=${category.name}`} className='image-link'>
          <img src={category.images} alt={category.name} />
          <h3>{category.name}</h3>
        </Link>
      </div>
    ))}
  </div>
  
  );  
};

export default Categories;
