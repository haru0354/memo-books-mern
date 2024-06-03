import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapterApi from "../../api/chapter";

const chaptersSlice = createSlice({
  name: "chapters",
  initialState: {
    chapters: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addChapter(state, action) {
      state.chapters.push(action.payload);
    },
    deleteChapter(state, action) {
      const deletedChapterId = action.payload;
      state.chapters = state.chapters.filter(
        (chapter) => chapter._id !== deletedChapterId
      );
    },
    updateChapter(state, action) {
      const { _id, chapter_title } = action.payload;
      const updateChapter = state.chapters.find(
        (chapter) => chapter._id === _id
      );
      if (updateChapter) {
        updateChapter.chapter_title = chapter_title;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chapters = action.payload;
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addChapter, deleteChapter, updateChapter } =
  chaptersSlice.actions;

export const fetchChapters = createAsyncThunk(
  "chapters/fetchChapters",
  async (bookId) => {
    try {
      const data = await chapterApi.getAll(bookId);
      return data;
    } catch (error) {
      console.error("チャプターのデータの取得に失敗しました。");
      throw error;
    }
  }
);

export default chaptersSlice.reducer;
