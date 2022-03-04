import { takeLatest, put, all, call, select } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

import UserActionTypes from "../user/user.types";
import { CartActionTypes } from "./cart.types";
import { clearCart, setCartFromFirebase } from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.error(error);
    }
  }
}

export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange() {
  yield takeLatest([
    CartActionTypes.ADD_ITEM,
    CartActionTypes.DECREASE_ITEM,
    CartActionTypes.CLEAR_ITEM
  ], updateCartInFirebase);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onCartChange), call(onUserSignIn)]);
}
