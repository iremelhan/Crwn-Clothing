import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const decreaseItem = (item) => ({
  type: CartActionTypes.DECREASE_ITEM,
  payload: item,
});

export const clearItem = (item) => ({
  type: CartActionTypes.CLEAR_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});

export const setCartFromFirebase = (cartItems) => ({
  type: CartActionTypes.SET_CART_FROM_FIREBASE,
  payload: cartItems,
});

export const updateCartInFirebase = () => ({
  type: CartActionTypes.UPDATE_CART_FROM_FIREBASE,
});
