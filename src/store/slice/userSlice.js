import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth, EmailAuthProvider } from "../../auth/firebase";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    againAuth: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
    },
    clearUser(state) {
      state.user = null;
      state.status = "failed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        state.againAuth = false;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "";
        if (action.payload === "再認証が必要です") {
          state.againAuth = true;
        }
      })
      .addCase(changePasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        state.againAuth = false;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "";
        if (action.payload === "再認証が必要です") {
          state.againAuth = true;
        }
      })
      .addCase(againAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(againAuthAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        state.againAuth = false;
      })
      .addCase(againAuthAsync.rejected, (state, action) => {
        state.status = "";
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const createUser = createAsyncThunk(
  "user/create",
  async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };

      console.log("アカウントの作成に成功しました。");
      return user;
    } catch (error) {
      console.error("アカウントの作成に失敗しました", error);
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };
      console.log("ログインに成功しました。");
      return user;
    } catch (error) {
      console.error("ログインに失敗しました", error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await signOut(auth);
    console.log("ログアウトに成功しました。");
  } catch (error) {
    console.error("ログアウトに失敗しました。", error);
    throw error;
  }
});

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUserAsync",
  async (_, { rejectWithValue }) => {
    const user = auth.currentUser;

    try {
      await user.delete();
      return "アカウントが削除されました。";
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        return rejectWithValue("再認証が必要です");
      }

      return rejectWithValue("アカウントの削除に失敗しました。");
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  "user/changePasswordAsync",
  async (newPassword, { rejectWithValue }) => {
    const user = auth.currentUser;
    try {
      await updatePassword(user, newPassword);
      return "パスワードが変更されました。";
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        return rejectWithValue("再認証が必要です");
      }

      return rejectWithValue("パスワードの変更に失敗しました。");
    }
  }
);

export const againAuthAsync = createAsyncThunk(
  "user/againAuthAsync",
  async (password, { rejectWithValue }) => {
    const user = auth.currentUser;

    if (user && password) {
      const credential = EmailAuthProvider.credential(
        user.email,
        password
      );

      try {
        await reauthenticateWithCredential(user ,credential);
        return "再認証に成功しました。";
      } catch (error) {
        console.error(error);
        return rejectWithValue("再認証に失敗しました。");
      }
    } else {
      console.error(error);
      return rejectWithValue("再認証でエラーが発生しました。");

    }
  }
);

export default userSlice.reducer;
