import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// import './index.css';

const initialListingData = {
  title: '',
  description: '',
  price: 1,
  category: '',
  quantityStock: 1,
  images: '',
};

function AddListing({ isOpen, onRequestClose, onAddListing }) {
  const [listingData, setListingData] = useState(initialListingData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:4000/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListingData({
      ...listingData,
      [name]: name === 'category' ? value : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; 
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {

        const imageURL = e.target.result; 
  
  
        setListingData({ ...listingData, images: imageURL });
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const resetForm = () => {
    setListingData(initialListingData);
    onRequestClose();
  };

  const handleSubmit = () => {
    onAddListing(listingData);
    resetForm();
  };

  return (
    isOpen ? (
    <div className='modal'>
      <div className="modal-content">
      <h2>Add New Listing</h2>
      <form>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={listingData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={listingData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={listingData.price}
            onChange={handleChange}
            className="priceInput"
            min={1}
          />
        </div>
        <div className="form-group">
          <label>Quantity in Stock:</label>
          <input
            type="number"
            name="quantityStock"
            value={listingData.quantityStock}
            onChange={handleChange}
            className="priceInput"
            min={1}
            defaultValue={1}
            
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={listingData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div >
          <label>Image:</label><br></br>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div><br></br>
        <button onClick={handleSubmit} className="save-button" style={{marginRight:"15px"}}>Add Listing</button>
        <button onClick={resetForm} className="cancel-button">Cancel</button>
      </form>
   </div>
   </div>
    ): null
  );
}

export default AddListing;