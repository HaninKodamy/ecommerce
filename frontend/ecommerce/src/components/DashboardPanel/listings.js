import React, { useEffect, useState } from "react";
import axios from "axios";
import EditListingModal from "../editListingsModal/index";
import AddListing from "../addListings/index";
import HeaderHome from "./header";
import SidebarHome from "./sidebar";
import "./index.css";

const ViewModal = ({ viewModalOpen, viewedListing, setViewModalOpen }) => {
  return (
    <div className="modal">
      <div className={`${viewModalOpen ? "open" : ""}`} style={{width:'750px'}}>
        <div className="modal-content">
          <div className="order-item-details">
            <h1 style={{ textDecoration: "underline" }}>Order Details</h1>
            <p>
              <strong>Title: </strong>
              {viewedListing.title}
            </p>
            <p>
              <strong>Description: </strong>
              {viewedListing.description}
            </p>
            <p>
              <strong>Price: </strong>${viewedListing.price}
            </p>
            <div className="order-item-image-container" style={{ float: 'left' }}>
              <img
                src={viewedListing.images}
                alt={viewedListing.title}
                className="order-item-image"
                
              />{" "}
            </div>
          </div><br></br><br></br><br></br>
          <button
            onClick={() => setViewModalOpen(false)}
            className="order-button"
          >
            Close
          </button>
        </div>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false); // State for the "Add Listing" modal

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/listings")
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = () => {
    axios
      .get("http://localhost:4000/api/listings")
      .then((response) => {
        setListings(response.data);
        setFilteredListings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = listings.filter((listing) => {
      const titleMatch = listing.title
        .toLowerCase()
        .includes(term.toLowerCase());
      const descriptionMatch = listing.description
        .toLowerCase()
        .includes(term.toLowerCase());
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
    
    axios
      .put(
        `http://localhost:4000/api/listings/${editedListing._id}`,
        editedListing
      )
      .then((response) => {
       console.log(response);
        const updatedListings = [...listings];
        updatedListings[editedListingIndex] = response.data;
        setListings(updatedListings);

        setEditModalOpen(false); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (listing) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (confirmDeletion) {
      axios
        .delete(`http://localhost:4000/api/listings/${listing._id}`)
        .then(() => {
          setListings(listings.filter((l) => l._id !== listing._id));
          getListings();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="orders-container">
        <HeaderHome searchData={handleSearch} />
        <div className="content-container" style={{ height: "130vh" }}>
          <SidebarHome />
          <div className="table-container">
            <div className="app-card app-card-orders-table mb-5">
              <div className="app-card-body">
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="order-button"
                  style={{ float: "right", backgroundColor: "grey" }}
                >
                  Add Listing
                </button>
                <div className="table-responsive">
                  <table className="table mb-0 text-left custom-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Images</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredListings && filteredListings.length > 0 ? (
                        <>
                          {filteredListings.map((listing, index) => (
                            <tr key={listing._id}>
                              <td>{listing.title}</td>
                              <td>{listing.description}</td>
                              <td>${listing.price}</td>
                              <td>
                                <img
                                  src={listing.images}
                                  alt={listing.title}
                                  style={{
                                    display: "block",
                                    margin: "0 auto",
                                    maxWidth: "50px",
                                  }}
                                />
                              </td>
                              <td>
                                <button
                                  onClick={() => handleDelete(listing)}
                                  className="order-button"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => handleView(listing)}
                                  className="order-button"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleEdit(listing, index)}
                                  className="order-button"
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <div className="center-div">
                          <div class="loader"></div>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          ;
        </div>
        {viewModalOpen && (
          <ViewModal
            viewModalOpen={viewModalOpen}
            viewedListing={viewedListing}
            setViewModalOpen={setViewModalOpen}
          />
        )}
        {editModalOpen && (
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
              console.log("newListingData", newListingData);
              // Handle adding a new listing here
              axios
                .post("http://localhost:4000/api/listings", newListingData)
                .then((response) => {
                  console.log("response", response);
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
    </>
  );
};

export default Listings;
