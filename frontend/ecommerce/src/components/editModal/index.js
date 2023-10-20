import React from "react";
import "./index.css";

const EditModal = ({
  editModalOpen,
  setEditModalOpen,
  editedOrder,
  setEditedOrder,
  handleUpdateOrder,
}) => {
  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  return (
    editModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <h1 style={{ marginTop: "0", color: "#333" }}>Edit Order</h1>
          <form>
            <div className="form-group">
              <label htmlFor="buyer">Buyer:</label>
              <input
                type="text"
                name="buyer"
                value={editedOrder.buyer.username}
                onChange={(e) => {
                  setEditedOrder({
                    ...editedOrder,
                    buyer: { ...editedOrder.buyer, username: e.target.value }
                  });
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="shippingAddress">Shipping Address:</label>
              <input
                type="text"
                name="shippingAddress"
                value={editedOrder.shippingAddress}
                onChange={(e) =>
                  setEditedOrder({
                    ...editedOrder,
                    shippingAddress: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalPrice">Total Price:</label>
              <input
                type="number"
                name="totalPrice"
                className="priceInput"
                value={editedOrder.totalPrice}
                onChange={(e) =>
                  setEditedOrder({ ...editedOrder, totalPrice: e.target.value })
                }
              />
            </div>

            <div className="button-group">
              <button onClick={handleUpdateOrder} className="save-button">
                Save
              </button>
              <button onClick={handleCloseModal} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditModal;
