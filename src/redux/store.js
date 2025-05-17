import { configureStore } from "@reduxjs/toolkit";
import {
  booksApiMiddleware,
  booksApiReducer,
  booksApiReducerPath,
} from "./features/books/booksApi";
import { cartReducer } from "./features/cart/cartSlice";
import {
  ordersApiMiddleware,
  ordersApiReducer,
  ordersApiReducerPath,
} from "./features/orders/ordersApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApiReducerPath]: booksApiReducer,
    [ordersApiReducerPath]: ordersApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApiMiddleware)
      .concat(ordersApiMiddleware),
});
