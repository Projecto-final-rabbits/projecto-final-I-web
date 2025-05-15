// src/state-managment/slices/dashboardSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardRepositoryImpl } from "@/core/infrastructure/api/repositories/DashboardRepositoryImpl";
import { SalesSummary } from "@/core/domain/interfaces/dashboard";

interface DashboardState {
  data?: SalesSummary;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: DashboardState = {
  data: undefined,
  status: "idle",
  error: undefined,
};

const repo = new DashboardRepositoryImpl();

export const fetchSalesSummary = createAsyncThunk<
  SalesSummary,                                      
  { startDate?: string; endDate?: string } | undefined, 
  { rejectValue: string }                           
>(
  "dashboard/fetchSalesSummary",
  async (params, thunkAPI) => {
    try {
      return await repo.getSalesSummary(params);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.data = undefined;
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesSummary.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchSalesSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as SalesSummary;
      })
      .addCase(fetchSalesSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
