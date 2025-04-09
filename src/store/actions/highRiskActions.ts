import { createAsyncThunk } from "@reduxjs/toolkit";
import { Employee } from "../slices/highRiskSlice";

// Fetch all employees
export const fetchHighRiskEmployees = createAsyncThunk<Employee[], void>(
  "highRisk/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/high-risk`
      );
      const data = await response.json();
      return data.data;
    } catch {
      return rejectWithValue("Failed to fetch employees");
    }
  }
);
