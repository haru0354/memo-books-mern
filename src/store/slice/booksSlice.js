import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
    },
    deleteBook(state, action) {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
    },
    updateBook(state, action) {
      const { _id, title } = action.payload;
      const updateBook = state.books.find((book) => book._id === _id);
      if (updateBook) {
        updateBook.title = title;
      }
    },
  },
});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await bookApi.getAll();
  return response.data;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async () => {
    const response = await bookApi.get(bookId);
    return response.data;
  }
);

export default bookSlice.reducer;
