// src/state-managment/slices/ordersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  OrdersRepositoryImpl,
  Pedido,
} from "@/core/infrastructure/api/repositories/OrdersRepositoryImpl";
import { RouteOrder } from "@/core/domain/interfaces";

interface OrdersState {
  list: Pedido[];
  status: "idle" | "loading" | "succeeded" | "failed";
  suggestRouteStatus: "idle" | "loading" | "succeeded" | "failed";
  route: RouteOrder | null;
  error?: string;
  suggestRouteError?: string;
}

const initialState: OrdersState = {
  list: [],
  status: "idle",
  route: null,
  suggestRouteStatus: "idle",
};
const repo = new OrdersRepositoryImpl();

const fetchOrders = createAsyncThunk<Pedido[], void, { rejectValue: string }>(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await repo.listAll();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const suggestRoute = createAsyncThunk<
  RouteOrder,
  number,
  { rejectValue: string }
>("orders/suggestRoute", async (orderId, thunkAPI) => {
  try {
    return repo.getRoute(orderId);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return thunkAPI.rejectWithValue(message);
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearSuggestion(state) {
      state.route = null;
    },
  },
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
      })
      .addCase(suggestRoute.pending, (state) => {
        state.suggestRouteStatus = "loading";
        state.suggestRouteError = undefined;
      })
      .addCase(suggestRoute.fulfilled, (state, action) => {
        state.suggestRouteStatus = "succeeded";
        state.route = action.payload;
      })
      .addCase(suggestRoute.rejected, (state, action) => {
        state.suggestRouteStatus = "failed";
        state.suggestRouteError = action.payload;
      }),
});

export { fetchOrders, suggestRoute };
export const { clearSuggestion } = ordersSlice.actions;

export default ordersSlice.reducer;
