import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contentApi from "../../api/content";

const contentsSlice = createSlice({
  name: "contents",
  initialState: {
    contents: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addContents(state, action) {
      state.contents.push(action.payload);
    },
    updateContents(state, action) {
      const { _id, heading_title, content } = action.payload;
      const updateContents = state.contents.find((content) => {
        content._id === _id;
      });
      if (updateContents) {
        updateContents.heading_title = heading_title;
        updateContents.content = content;
      }
    },
    deleteContent(state, action) {
      state.contents = state.contents.filter((content) => {
        content._id !== action.payload._id;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addContents, deleteContent, updateContents } =
  contentsSlice.actions;

export const fetchContents = createAsyncThunk(
  "contents/fetchContents",
  async ({ bookId, chapterId }) => {
    try {
      const data = await contentApi.getAll(bookId, chapterId);
      return data;
    } catch (error) {
      console.error("コンテンツのフェッチに失敗しました");
      throw error;
    }
  }
);

export default contentsSlice.reducer;
