import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import emailReducer from './slices/emailSlice';
import ticketReducer from './slices/ticketSlice';
import timesheetReducer from './slices/timesheetSlice';
import userReducer from './slices/userSlice';
import dashboardReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    email: emailReducer,
    ticket: ticketReducer,
    timesheet: timesheetReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
