import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Ticket, Comment } from '../../types';
import { ticketService } from '../../services/ticketService';

interface TicketState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
  totalElements: number;
}

const initialState: TicketState = {
  tickets: [],
  selectedTicket: null,
  comments: [],
  loading: false,
  error: null,
  totalElements: 0,
};

export const fetchTickets = createAsyncThunk(
  'ticket/fetchTickets',
  async (params?: { status?: string; assigneeId?: number; page?: number; size?: number }) => {
    const response = await ticketService.getTickets(params);
    return response;
  }
);

export const fetchTicketById = createAsyncThunk(
  'ticket/fetchTicketById',
  async (id: number) => {
    const response = await ticketService.getTicketById(id);
    return response;
  }
);

export const createTicket = createAsyncThunk(
  'ticket/createTicket',
  async (ticket: Partial<Ticket>) => {
    const response = await ticketService.createTicket(ticket);
    return response;
  }
);

export const fetchComments = createAsyncThunk(
  'ticket/fetchComments',
  async (ticketId: number) => {
    const response = await ticketService.getComments(ticketId);
    return response;
  }
);

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    clearSelectedTicket: (state) => {
      state.selectedTicket = null;
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.content;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets';
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.selectedTicket = action.payload;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.unshift(action.payload);
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export const { clearSelectedTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
