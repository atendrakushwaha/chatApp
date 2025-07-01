import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('chat/fetchUsers', async (_, thunkAPI) => {
  try {
    const res = await axios.get('http://localhost:3000/api/users', { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch users');
  }
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (receiverId, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/messages/${receiverId}`, { withCredentials: true });
    return res.data.messages;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch messages');
  }
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ receiverId, message }, thunkAPI) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/messages/${receiverId}`, { message }, { withCredentials: true });
    return res.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Failed to send message');
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [],
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearChat: (state) => {
      state.messages = [];
    },
    addSocketMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { clearChat, addSocketMessage } = chatSlice.actions;
export default chatSlice.reducer;
