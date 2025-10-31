import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardMetrics, ChartData } from '../../types';
import { dashboardService } from '../../services/dashboardService';

interface DashboardState {
  metrics: DashboardMetrics | null;
  weeklyTimelogData: ChartData[];
  ticketProgressData: ChartData[];
  emailStatusData: ChartData[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: null,
  weeklyTimelogData: [],
  ticketProgressData: [],
  emailStatusData: [],
  loading: false,
  error: null,
};

export const fetchDashboardMetrics = createAsyncThunk(
  'dashboard/fetchMetrics',
  async () => {
    const response = await dashboardService.getMetrics();
    return response;
  }
);

export const fetchWeeklyTimelogData = createAsyncThunk(
  'dashboard/fetchWeeklyTimelogData',
  async () => {
    const response = await dashboardService.getWeeklyTimelogData();
    return response;
  }
);

export const fetchTicketProgressData = createAsyncThunk(
  'dashboard/fetchTicketProgressData',
  async () => {
    const response = await dashboardService.getTicketProgressData();
    return response;
  }
);

export const fetchEmailStatusData = createAsyncThunk(
  'dashboard/fetchEmailStatusData',
  async () => {
    const response = await dashboardService.getEmailStatusData();
    return response;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch metrics';
      })
      .addCase(fetchWeeklyTimelogData.fulfilled, (state, action) => {
        state.weeklyTimelogData = action.payload;
      })
      .addCase(fetchTicketProgressData.fulfilled, (state, action) => {
        state.ticketProgressData = action.payload;
      })
      .addCase(fetchEmailStatusData.fulfilled, (state, action) => {
        state.emailStatusData = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
