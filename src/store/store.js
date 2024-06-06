import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slice/booksSlice";
import chaptersReducer from "./slice/chaptersSlice"

const store = configureStore({
  reducer: {
    books: booksReducer,
    chapters: chaptersReducer,
  },
});

export default store;
