// src/state-managment/slices/ordersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersRepositoryImpl, Pedido } from "@/core/infrastructure/api/repositories/OrdersRepositoryImpl";

interface OrdersState {
  list: Pedido[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: OrdersState = { list: [], status: "idle" };
const repo = new OrdersRepositoryImpl();

export const fetchOrders = createAsyncThunk<
  Pedido[],
  void,
  { rejectValue: string }
>(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await repo.listAll();
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : String(e);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }),
});

export default ordersSlice.reducer;
