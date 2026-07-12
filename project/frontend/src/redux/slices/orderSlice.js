import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

export const placeOrder = createAsyncThunk(
  "orders/place",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/orders/place", orderData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "error while placing the order",
      );
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "orders/cancel",
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/orders/${orderId}/cancel`, { reason });
      return data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "error while canceling the order",
      );
    }
  },
);
