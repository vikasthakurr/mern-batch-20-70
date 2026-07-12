import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

export const loginUser = createAsyncThunk(
  "/auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      const profile = await api.get("/auth/profile");
      return profile.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "error while logging in",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "error while logging in",
      );
    }
  },
);
