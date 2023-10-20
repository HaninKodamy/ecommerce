import React, {useState} from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

function OrderModal({user, cart = [], onClose, emptyCart, openOrderDone }) {

  const [shippingAddress, setShippingAddress] = useState('');
 

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    // Add logic to handle order submission
    console.log("carttttt", cart);
    let totalPrice = 0;
    const items = cart.map((item, index)=>{
      let pricePerLine = item.quantity * item.price;
      totalPrice = totalPrice + pricePerLine;
      return {
        listing: item._id,
        quantity: item.quantity,
        pricePerLine: pricePerLine
      }
    })

    console.log("items", items)
    console.log("totalPrice", totalPrice)
    const order ={
      buyer: user._id,
      items: items,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice
    }
    try {
        const response = await fetch('http://localhost:4000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("response order", data);
          openOrderDone();
          emptyCart();
          

        } else {
          console.error('Save order failed:', response.status);
        }
      } catch (error) {
        console.error('Order failed:', error);
      }
  }


  return (
    <div className="order-modal">
      <FontAwesomeIcon
        icon={faTimes}
        onClick={onClose}
        className="close-icon1"
      />
      <form onSubmit={handleSubmitOrder}>
        <div className="card-header">Order Confirmation</div>
        <label htmlFor="customerAddress">Shipping Address:</label>
        <input
          type="text"
          id="customerAddress"
          name="customerAddress"
          className="form-control"
          value = {shippingAddress}
          onChange={(e)=>setShippingAddress(e.target.value)}
          required
        />
        <br />
        <br />
        <div className="order-details">
          <h1 style={{ fontSize: "20px" }}>Order Details</h1>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="order-item1">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="cart-image1"
                />
                <div className="item-details1">
                  <div className="detail-box">
                    <div className="cart-product-title">{item.description}</div>
                    <div className="cart-price">Price: ${item.price}</div>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
          <h1 style={{ fontSize: "20px", marginBottom: "5px" }}>
            Total: ${getTotalPrice()}
          </h1>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default OrderModal;
