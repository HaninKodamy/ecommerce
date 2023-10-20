import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditListingModal from '../editListingsModal/index';
import AddListing from '../addListings/index';


const ViewModal = ({ viewModalOpen, viewedListing, setViewModalOpen }) => {
  return (
    <div className={`modal ${viewModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>View Listing</h2>
        <p>Title: {viewedListing.title}</p>
        <p>Description: {viewedListing.description}</p>
        <p>Price: ${viewedListing.price}</p>
        <img
          src={viewedListing.images}
          alt={viewedListing.title}
          style={{ maxWidth: '200px' }}
        />{' '}
        <button onClick={() => setViewModalOpen(false)}>Close</button>
      </div>
    </div>
  );
};

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewedListing, setViewedListing] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedListing, setEditedListing] = useState({});
  const [editedListingIndex, setEditedListingIndex] = useState(null);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false); // State for the "Add Listing" modal

  useEffect(() => {
    axios.get('http://localhost:4000/api/listings')
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/listings')
      .then((response) => {
        setListings(response.data);
        setFilteredListings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    const filtered = listings.filter((listing) => {
      const titleMatch = listing.title.toLowerCase().includes(term.toLowerCase());
      const descriptionMatch = listing.description.toLowerCase().includes(term.toLowerCase());
      return titleMatch || descriptionMatch;
    });
  
    setFilteredListings(filtered);
  };
  

  const handleView = (listing) => {
    setViewedListing(listing);
    setViewModalOpen(true);
  };

  const handleEdit = (listing, index) => {
    setEditedListing({ ...listing });
    setEditedListingIndex(index);
    setEditModalOpen(true); // Open the edit modal
  };

  const handleUpdateListing = () => {
    // Make an axios PUT request to update the listing
    axios.put(`http://localhost:4000/api/listings/${editedListing._id}`, editedListing)
      .then((response) => {
        // Update the local state with the updated listing data
        const updatedListings = [...listings];
        updatedListings[editedListingIndex] = response.data;
        setListings(updatedListings);

        setEditModalOpen(false); // Close the edit modal
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (listing) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this listing?');

    if (confirmDeletion) {
      axios.delete(`http://localhost:4000/api/listings/${listing._id}`)
        .then(() => {
          setListings(listings.filter((l) => l._id !== listing._id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>Listings</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Images</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredListings.map((listing, index) => (
            <tr key={listing._id}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{listing.title}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{listing.description}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>${listing.price}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                <img src={listing.images} alt={listing.title} style={{ display: 'block', margin: '0 auto', maxWidth: '50px' }} />
              </td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                <button onClick={() => handleDelete(listing)}>Delete</button>
                <button onClick={() => handleView(listing)}>View</button>
                <button onClick={() => handleEdit(listing, index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setAddModalOpen(true)}>Add Listing</button>

      {viewModalOpen && (
        <ViewModal
          viewModalOpen={viewModalOpen}
          viewedListing={viewedListing}
          setViewModalOpen={setViewModalOpen}
        />
      )}
      {editModalOpen && ( // Conditionally render the edit modal
        <EditListingModal
          editModalOpen={editModalOpen}
          editedListing={editedListing}
          setEditedListing={setEditedListing}
          handleUpdateListing={handleUpdateListing}
          setEditModalOpen={setEditModalOpen}
        />
      )}

      {addModalOpen && (
        <AddListing
          isOpen={addModalOpen}
          onRequestClose={() => setAddModalOpen(false)}
          onAddListing={(newListingData) => {
            // Handle adding a new listing here
            axios.post('http://localhost:4000/api/listings', newListingData)
              .then((response) => {
                // Add the new listing to the local state
                setFilteredListings([...listings, response.data]);
                setAddModalOpen(false); // Close the "Add Listing" modal
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        />
      )}
    </div>
  );
};

export default Listings;