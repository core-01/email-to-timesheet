import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Email } from '../../types';
import { emailService } from '../../services/emailService';

interface EmailState {
  emails: Email[];
  selectedEmail: Email | null;
  loading: boolean;
  error: string | null;
  totalElements: number;
}

const initialState: EmailState = {
  emails: [],
  selectedEmail: null,
  loading: false,
  error: null,
  totalElements: 0,
};

export const fetchEmails = createAsyncThunk(
  'email/fetchEmails',
  async (params?: { status?: string; page?: number; size?: number }) => {
    const response = await emailService.getEmails(params);
    return response;
  }
);

export const fetchEmailById = createAsyncThunk(
  'email/fetchEmailById',
  async (id: number) => {
    const response = await emailService.getEmailById(id);
    return response;
  }
);

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    clearSelectedEmail: (state) => {
      state.selectedEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emails = action.payload.content;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch emails';
      })
      .addCase(fetchEmailById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmailById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmail = action.payload;
      })
      .addCase(fetchEmailById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch email';
      });
  },
});

export const { clearSelectedEmail } = emailSlice.actions;
export default emailSlice.reducer;
