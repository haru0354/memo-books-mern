import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slice/booksSlice";
import chaptersReducer from "./slice/chaptersSlice";
import contentsReducer from "./slice/contentsSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    chapters: chaptersReducer,
    contents: contentsReducer,
    user: userReducer,
  },
});

export default store;
