import { User } from "@/core/domain/interfaces";
import { createUserService } from "@/core/infraestructure/services/user-service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const createUserThunk = createAsyncThunk(
  "auth/createUser",
  async (userData: User) => createUserService(userData)
);

type InitialState = {
  loading: boolean;
  error: unknown | null;
};

const initialState: InitialState = {
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { createUserThunk };
export default userSlice.reducer;
