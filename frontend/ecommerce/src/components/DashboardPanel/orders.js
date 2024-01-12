import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import EditModal from "../editModal/index";
import HeaderHome from "./header";
import SidebarHome from "./sidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewedOrder, setViewedOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedOrder, setEditedOrder] = useState({});
  const [editedOrderIndex, setEditedOrderIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/orders")
      .then((response) => {
        setOrders(response.data);
        setFilteredListings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleView = (order) => {
    setViewedOrder(order);
    setViewModalOpen(true);
  };

  const handleEdit = (order, index) => {
    setEditedOrder(order);
    setEditedOrderIndex(index);
    setEditModalOpen(true);
  };

  const handleUpdateOrder = () => {
    axios
      .put(`http://localhost:4000/api/orders/${editedOrder._id}`, editedOrder)
      .then((response) => {
        const updatedOrders = [...orders];
        updatedOrders[editedOrderIndex] = response.data;
        setOrders(updatedOrders);
        setFilteredListings(updatedOrders);

        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (order) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmDeletion) {
      axios
        .delete(`http://localhost:4000/api/orders/${order._id}`)
        .then(() => {
          setOrders(orders.filter((o) => o._id !== order._id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = orders.filter((order) => {
        const buyerMatch = order.buyer.username
          .toLowerCase()
          .includes(term.toLowerCase());
        const shippingAddress = order.shippingAddress
          .toLowerCase()
          .includes(term.toLowerCase());
        const totalPrice = order.totalPrice.toString() === term;

        return buyerMatch || shippingAddress || totalPrice;
      });
      setFilteredListings(filtered);
    } else setFilteredListings(orders);
  };

  const handleApprovalToggle = (order, index) => {
   if(order.adminApprovalStatus!=="approved"){
    const updatedStatus =
    order.adminApprovalStatus === "approved" ? "pending" : "approved";

  const updatedOrder = { ...order, adminApprovalStatus: updatedStatus };

 
  axios
    .put(`http://localhost:4000/api/orders/approved/${updatedOrder._id}`, updatedOrder)
    .then((response) => {
      
      const updatedOrders = [...orders];
      updatedOrders[index]["adminApprovalStatus"] = "approved";
      setOrders(updatedOrders);
      setFilteredListings(updatedOrders);
    })
    .catch((error) => {
      console.error(error);
    });
   }
    
  };

  return (
    <div className="orders-container">
      <HeaderHome searchData={handleSearch} />
      <div className="content-container">
        <SidebarHome />
        <div className="table-container" style={{marginTop:'350px'}}>
          <div className="app-card app-card-orders-table mb-5">
            <div className="app-card-body">
              <div className="table-responsive">
                <table className="table mb-0 text-left custom-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Buyer</th>
                      <th>Shipping Address</th>
                      <th>Total Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredListings && filteredListings.length > 0 ? (
                      <>
                        {filteredListings.map((order, index) => (
                          <tr key={order._id}>
                            <td>#{order._id}</td>
                            <td>{order.buyer.username}</td>
                            <td>{order.shippingAddress}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={
                                  order.adminApprovalStatus === "approved"
                                }
                                onChange={() =>
                                  handleApprovalToggle(order, index)
                                }
                              />
                              {order.adminApprovalStatus}
                            </td>

                            <td>
                              {/* <button onClick={() => handleDelete(order)} className="order-button">
                                Delete
                              </button> */}
                              <button
                                onClick={() => handleView(order)}
                                className="order-button"
                              >
                                View
                              </button>
                              {/* <button onClick={() => handleEdit(order, index)} className="order-button">
                                Edit
                              </button> */}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <div class="center-div">
                        <div class="loader"></div>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1 style={{ textDecoration: "underline" }}>Order Details</h1>
            <p>
              <strong>Order ID:</strong> {viewedOrder._id}
            </p>
            <p>
              <strong>Buyer:</strong> {viewedOrder.buyer.username}
            </p>
            <p>
              <strong>Shipping Address:</strong> {viewedOrder.shippingAddress}
            </p>
            <br></br>
            <h2 style={{ textDecoration: "underline" }}>Order Items</h2>
            <ul>
              {viewedOrder.items.map((item) => (
                <li key={item.listing._id} className="order-item">
                  <div className="order-item-image-container">
                    <img
                      src={
                        item.listing &&
                        item.listing.images &&
                        item.listing.images[0]
                      }
                      alt={item.listing ? item.listing.title : "No Title"}
                      className="order-item-image"
                    />
                  </div>
                  <div className="order-item-details">
                    <p>
                      <strong>Product:</strong> {item.listing.title}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Item's Price:</strong> $
                      {item.pricePerLine.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p>
              <strong>Total Price:</strong> ${viewedOrder.totalPrice.toFixed(2)}
            </p>

            <button
              onClick={() => setViewModalOpen(false)}
              className="order-button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {}
      <EditModal
        editModalOpen={editModalOpen}
        editedOrder={editedOrder}
        setEditedOrder={setEditedOrder}
        handleUpdateOrder={handleUpdateOrder}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  );
};

export default Orders;
