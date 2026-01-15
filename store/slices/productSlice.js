import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getFilter, getProductsById } from "../action/productAction";
import { STATUS } from "../../constants/Status";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUS.IDLE,
        filters: {},
    },

    reducers: {},
    extraReducers: (builder) => {
      //getAllProducts
        builder
          .addCase(getAllProducts.pending, (state, action) => {
            state.status = STATUS.LOADING;
          })
          .addCase(getAllProducts.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.IDLE;
          })
          .addCase(getAllProducts.rejected, (state, action) => {
            state.status = STATUS.ERROR;
          });

          //getProductsById
          builder
          .addCase(getProductsById.pending, (state, action) => {
            state.status = STATUS.LOADING;
          })
          .addCase(getProductsById.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.IDLE;
          })
          .addCase(getProductsById.rejected, (state, action) => {
            state.status = STATUS.ERROR;
          });

          //getProductsById
          builder
          .addCase(getFilter.pending, (state, action) => {
            state.status = STATUS.LOADING;
          })
          .addCase(getFilter.fulfilled, (state, action) => {
            state.status = STATUS.IDLE;
            state.filters.category = action.payload.category;
            state.filters.color = action.payload.color;
            state.filters.size = action.payload.size;
            state.filters.minPrice = action.payload.minPrice;
            state.filters.maxPrice = action.payload.maxPrice;
          })
          .addCase(getFilter.rejected, (state, action) => {
            state.status = STATUS.ERROR;
          });
   
      },

})
//console.log(productSlice);
export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;