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
      state.chapters.chaptersWithoutContents.push(action.payload);
    },
    updateChapter(state, action) {
      const { _id, chapter_title } = action.payload;
      const updateChapter = state.chapters.chaptersWithoutContents.find(
        (chapter) => chapter._id === _id
      );
      if (updateChapter) {
        updateChapter.chapter_title = chapter_title;
      }
    },
    deleteChapter(state, action) {
      const deletedChapterId = action.payload;
      state.chapters.chaptersWithoutContents =
        state.chapters.chaptersWithoutContents.filter(
          (chapter) => chapter._id !== deletedChapterId
        );
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
      })
      .addCase(addChaptersAsync.fulfilled, (state, action) => {
        state.chapters.chaptersWithoutContents.push(action.payload);
      })
      .addCase(addChaptersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateChaptersAsync.fulfilled, (state, action) => {
        const { _id, chapter_title } = action.payload;
        const updateChapter = state.chapters.chaptersWithoutContents.find(
          (chapter) => chapter._id === _id
        );
        if (updateChapter) {
          updateChapter.chapter_title = chapter_title;
        }
      })
      .addCase(updateChaptersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteChaptersAsync.fulfilled, (state, action) => {
        const deletedChapterId = action.payload.deletedChapterId;
        state.chapters.chaptersWithoutContents =
          state.chapters.chaptersWithoutContents.filter(
            (chapter) => chapter._id !== deletedChapterId
          );
      })
      .addCase(deleteChaptersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addChapter, deleteChapter, updateChapter } =
  chaptersSlice.actions;

export const fetchChapters = createAsyncThunk(
  "chapters/fetchChapters",
  async ({ bookId }) => {
    try {
      const data = await chapterApi.getAll(bookId);
      return data;
    } catch (error) {
      console.error("チャプターのデータの取得に失敗しました。");
      throw error;
    }
  }
);

export const addChaptersAsync = createAsyncThunk(
  "chapters/addChaptersAsync",
  async ({ bookId, formData }) => {
    try {
      const data = await chapterApi.post(bookId, formData);
      return data;
    } catch (error) {
      console.error("チャプターの追加に失敗しました。");
      throw error;
    }
  }
);

export const updateChaptersAsync = createAsyncThunk(
  "chapters/updateChaptersAsync",
  async ({ bookId, chapterId, formData }) => {
    try {
      const data = await chapterApi.patch(bookId, chapterId, formData);
      return data;
    } catch (error) {
      console.error("チャプターの編集に失敗しました。");
      throw error;
    }
  }
);

export const deleteChaptersAsync = createAsyncThunk(
  "chapters/deleteChaptersAsync",
  async ({ userId, bookId, chapterId }) => {
    try {
      const data = await chapterApi.delete(userId, bookId, chapterId);
      return data;
    } catch (error) {
      console.error("チャプターの編集に失敗しました。");
      throw error;
    }
  }
);

export default chaptersSlice.reducer;
