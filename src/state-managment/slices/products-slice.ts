import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@core/domain/entities";
import { getProducts } from "@core/domain/use-cases/products/get-products";
import { ProductRepositoryImpl } from "@core/infrastructure/api/repositories/ProductRepositoryImpl";

interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk using domain useCase
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const repo = new ProductRepositoryImpl();
  return getProducts(repo);
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
