import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Binary } from 'mongodb';

interface User {
    _id: string;
    username: string;
    email: string;
    roleAccess: {
        role: string;
        access: number;
    };
    avatar?: {
        filename: string;
        type: string;
        data: Binary;
    };
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}


const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users', async () => {
    const response = await fetch('/api/users');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
});

export const addUser = createAsyncThunk('users/addUser', async (user: Omit<User, '_id'>) => {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Failed to add user');
    }
    return response.json();
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
    const response = await fetch(`/api/users?_id=${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    return id;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Загрузка пользователей
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
          state.users = action.payload;
          state.loading = false;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch users';
        })
        // Добавление пользователя
        .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
          state.users.push(action.payload);
        })
        // Удаление пользователя
        .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
          state.users = state.users.filter((user) => user._id !== action.payload);
        });
    },
  });
  
  export default userSlice.reducer;