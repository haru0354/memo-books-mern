import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "../../api/book";

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
      const deletedBookId = action.payload;
      state.books = state.books.filter(
        (book) => book._id !== deletedBookId
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const existingBook = state.books.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (existingBook !== -1) {
          state.books[existingBook] = updatedBook;
        } else {
          state.books.push(updatedBook);
        }
        state.status = "succeeded";
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const data = await bookApi.getAll();
    return data;
  } catch (error) {
    console.error("本のデータの取得に失敗しました。");
    throw error;
  }
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId) => {
    try {
      const data = await bookApi.get(bookId);
      return data;
    } catch (error) {
      console.error("本のデータの取得に失敗しました。");
      throw error;
    }
  }
);




export default bookSlice.reducer;
