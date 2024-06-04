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
      state.contents.contents.push(action.payload);
    },
    updateContents(state, action) {
      const { _id, heading_title, content } = action.payload;
      const existingContent = state.contents.contents.find((content) => {
        content._id === _id;
      });
      if (existingContent) {
        updateContents.heading_title = heading_title;
        updateContents.content = content;
      }
    },
    deleteContent(state, action) {
      const contentId  = action.payload;
      state.contents.contents = state.contents.contents.filter(
        (content) => content._id !== contentId
      );
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
      })
      .addCase(fetchContentById.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedContent = action.payload;
        const existingContentIndex = state.contents.contents.findIndex(
          (content) => content._id === updatedContent._id
        );
        if (existingContentIndex !== -1) {
          state.contents.contents[existingContentIndex] = updatedContent;
        }
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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

export const fetchContentById = createAsyncThunk(
  "contents/fetchById",
  async ({ bookId, chapterId, contentId }) => {
    try {
      const data = await contentApi.get(bookId, chapterId, contentId);
      return data;
    } catch (error) {
      console.error("指定したIDのコンテンツのフェッチに失敗しました");
      throw error;
    }
  }
);


export default contentsSlice.reducer;
