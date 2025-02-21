import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface IAuthSlice {
  user: IUser | null;
}

const initialState: IAuthSlice = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        id,
        first_name: firstName,
        last_name: lastName,
        email,
      } = action.payload;
      state.user = {
        id,
        firstName,
        lastName,
        email,
      };
      return state;
    },
  },
});

export const auth = (state: RootState) => state.auth;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
