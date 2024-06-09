import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slice/booksSlice";
import chaptersReducer from "./slice/chaptersSlice"
import contentsReducer from "./slice/contentsSlice"
import authReducer from "./slice/authSlice"

const store = configureStore({
  reducer: {
    books: booksReducer,
    chapters: chaptersReducer,
    contents: contentsReducer,
    auth: authReducer,
  },
});

export default store;
