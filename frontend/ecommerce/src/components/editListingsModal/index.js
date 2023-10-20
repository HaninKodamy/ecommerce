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
        <h2>Edit Listing</h2>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={editedListing.title}
              onChange={(e) =>
                setEditedListing({ ...editedListing, title: e.target.value })
              }
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={editedListing.description}
              onChange={(e) =>
                setEditedListing({
                  ...editedListing,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedListing.price}
              onChange={(e) =>
                setEditedListing({ ...editedListing, price: e.target.value })
              }
            />
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
          {/* Add more input fields for other listing attributes */}
          <button onClick={handleUpdateListing}>Update Listing</button>
          <button onClick={() => setEditModalOpen(false)}>Cancel</button>
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