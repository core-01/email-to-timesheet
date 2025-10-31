import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import { userService } from '../../services/userService';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await userService.getUsers();
    return response;
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: Partial<User>) => {
    const response = await userService.createUser(user);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, user }: { id: number; user: Partial<User> }) => {
    const response = await userService.updateUser(id, user);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number) => {
    await userService.deleteUser(id);
    return id;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
