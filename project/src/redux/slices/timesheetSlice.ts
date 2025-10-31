import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Timesheet } from '../../types';
import { timesheetService } from '../../services/timesheetService';

interface TimesheetState {
  timesheets: Timesheet[];
  loading: boolean;
  error: string | null;
}

const initialState: TimesheetState = {
  timesheets: [],
  loading: false,
  error: null,
};

export const fetchTimesheets = createAsyncThunk(
  'timesheet/fetchTimesheets',
  async (params?: { userId?: number; status?: string; startDate?: string; endDate?: string }) => {
    const response = await timesheetService.getTimesheets(params);
    return response;
  }
);

export const createTimesheet = createAsyncThunk(
  'timesheet/createTimesheet',
  async (timesheet: Partial<Timesheet>) => {
    const response = await timesheetService.createTimesheet(timesheet);
    return response;
  }
);

export const approveTimesheet = createAsyncThunk(
  'timesheet/approveTimesheet',
  async ({ id, comments }: { id: number; comments?: string }) => {
    const response = await timesheetService.approveTimesheet(id, comments);
    return response;
  }
);

export const rejectTimesheet = createAsyncThunk(
  'timesheet/rejectTimesheet',
  async ({ id, comments }: { id: number; comments: string }) => {
    const response = await timesheetService.rejectTimesheet(id, comments);
    return response;
  }
);

const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimesheets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimesheets.fulfilled, (state, action) => {
        state.loading = false;
        state.timesheets = action.payload;
      })
      .addCase(fetchTimesheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch timesheets';
      })
      .addCase(createTimesheet.fulfilled, (state, action) => {
        state.timesheets.unshift(action.payload);
      });
  },
});

export default timesheetSlice.reducer;
