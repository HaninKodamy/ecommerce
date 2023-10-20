import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


const initialListingData = {
  title: '',
  description: '',
  price: 0,
  category: '',
  quantityStock: 0,
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
    const file = e.target.files[0]; // Get the first selected file
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        // This function is called when the file is read
        const imageURL = e.target.result; // This is the URL of the image
  
        // Now you can update the listingData.image with the imageURL
        setListingData({ ...listingData, images: imageURL });
      };
  
      // Read the file as a data URL (base64 encoded image)
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
    <Modal
      isOpen={isOpen}
      onRequestClose={resetForm}
      contentLabel="Add Listing Modal"
    >
      <h2>Add New Listing</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={listingData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={listingData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={listingData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity in Stock:</label>
          <input
            type="number"
            name="quantityStock"
            value={listingData.quantityStock}
            onChange={handleChange}
          />
        </div>
        <div>
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
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <button onClick={handleSubmit}>Add Listing</button>
        <button onClick={resetForm}>Cancel</button>
      </form>
    </Modal>
  );
}

export default AddListing;