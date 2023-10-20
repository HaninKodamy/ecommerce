import React, { useState } from 'react';
import { useCart } from '../cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import CartSidebar from '../cartSidebar/index';
import OrderModal from '../orderModal'; // Ensure the path is correct
import './index.css';
import { Link } from "react-router-dom";
import { AuthContext } from '../authContext';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import OrderDone from '../orderDone';

function Cart() {
  const { cart, emptyCart } = useCart();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [orderDone, setOrderDone] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  const showOrderModal = () => {
    
    if(user){
      console.log("showOrderModal", user)
      setIsOrderModalVisible(true);
      setIsSidebarVisible(false);
    }
    else{
      navigate('/login')
    }
  };

  const hideOrderModal = () => {
    setIsOrderModalVisible(false);
  };

  const openOrderDone = ()=>{
    setOrderDone(true)
  }
  
  const orderDoneClose =()=>{
    setOrderDone(false);
  }

  return (
    <>
        <div>
      <FontAwesomeIcon icon={faShoppingCart}  onClick={toggleSidebar} className='cart-icon' />
      <span className='cart-length'>{cart.length}</span>
      
      {isSidebarVisible && <CartSidebar onCheckout={showOrderModal} onClose={toggleSidebar} />}
      
        {isOrderModalVisible && cart && cart.length > 0 && (
          <>
            <div className="overlay" onClick={hideOrderModal}></div>
              <OrderModal cart={cart} emptyCart={emptyCart} user={user} onClose={hideOrderModal} openOrderDone={openOrderDone} />
          </>
        )}
        <>
          {
            user
            ?
            <>
              <Link to="/" onClick={()=> logout()}>
                  <FontAwesomeIcon icon={faPowerOff} className='poweroff'/>
              </Link>
            </>
            :
            <Link to="/login" className='loginButton'>Login</Link>
          }
        </>
    </div>
     {
      orderDone &&
      <OrderDone orderDoneClose = {orderDoneClose} />
    }
    </>
  );
}

export default Cart;
