import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/authContext/index';

function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/orders/user/${user._id}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order._id}>
          {}
          {}
          <p>Order ID: {order._id}</p>
          <p>Total Price: ${order.totalPrice}</p>
          {}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
