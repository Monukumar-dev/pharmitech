import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/Url";
const base_url = "https://63cec9f4fdfe2764c72a860a.mockapi.io/api/";


//getProducts
export const getAllProducts = createAsyncThunk(
  'fetch/getProducts',
  async (requestBody, { rejectWithValue }) => {
      try {
          const response = await axios.post(`${BASE_URL}/products`, requestBody);
          //console.log("requestBody action", response.data);
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || "Something went wrong");
      }
  }
);

//getProducts
export const getFilter = createAsyncThunk(
  "fetch/getFilter",
  async (req, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, req);
      const products = response.data.products || [];

      const category = [...new Set(products.map(item => item.category))];
      const color = [...new Set(products.map(item => item.color))];
      const size = [...new Set(products.map(item => item.size))];
      const prices = products.map(item => item.price);
      
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      return { category, color, size, minPrice, maxPrice };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//getProductsById
  export const getProductsById = createAsyncThunk(
    'fetch/getProductsById',
    async (id) => {
      
    const data = await axios.get(`${BASE_URL}/products/${id}`).then((res) => res.data);
    //console.log(data, "fetch Product data");
    return data;
  });

  

  