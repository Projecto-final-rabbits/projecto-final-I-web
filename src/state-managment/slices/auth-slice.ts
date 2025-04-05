import { User } from "@/core/domain/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const storedUser = sessionStorage.getItem("user");
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;

      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
    removeLoading: (state) => {
      state.loading = false;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
