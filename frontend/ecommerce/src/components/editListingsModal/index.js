import React from 'react';

const EditListingModal = ({
  editModalOpen,
  editedListing,
  setEditedListing,
  handleUpdateListing,
  setEditModalOpen,
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setEditedListing({ ...editedListing, images: event.target.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`modal ${editModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
      <h1 style={{ marginTop: "0", color: "#333" }}>Edit Listing</h1>
        <form>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={editedListing.title}
              onChange={(e) =>
                setEditedListing({ ...editedListing, title: e.target.value })
              }
              disabled
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={editedListing.description}
              style={{padding:"5px"}}
              onChange={(e) =>
                setEditedListing({
                  ...editedListing,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedListing.price}
              className="priceInput"
              onChange={(e) =>
                setEditedListing({ ...editedListing, price: e.target.value })
              }
             
            />
          </div>
          <div >
            <label>Image:</label><br/>
            <img src={editedListing.images} width='100px'/><br></br>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageUpload}
              
            />
          </div><br></br>
          {/* Add more input fields for other listing attributes */}
          <button onClick={handleUpdateListing} className="save-button" style={{marginRight:"15px"}}>Update Listing</button>
          <button onClick={() => setEditModalOpen(false)} className="cancel-button">Cancel</button>
        </form>
        {editedListing.image && (
          <div>
            <h3>Current Image:</h3>
            <img src={editedListing.images} alt="Listing" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditListingModal;