import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_ITEM':
      return state.filter(item => item._id !== action.payload._id);
    case 'CHANGE_QUANTITY':
      return state.map(item => 
        item._id === action.payload._id 
        ? { ...item, quantity: action.payload.quantity } 
        : item
      );
    case 'EMPTY_CART':
        return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const emptyCart = () => {
    dispatch({ type: 'EMPTY_CART' });
  };
  
  return (
    <CartContext.Provider value={{ cart, emptyCart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
