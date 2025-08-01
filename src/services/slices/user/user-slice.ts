import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const fetchUserThunk = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUserInfoThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) =>
    await loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', () => {
  logoutApi().then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
});

export const fetchOrderThunk = createAsyncThunk(
  'user/getUserOrders',
  async () => getOrdersApi()
);

export type TUserState = {
  user: TUser | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  orders: TOrder[];
  orderRequest: boolean;
  loginRequest: boolean;
  error: string | null;
};

export const initialState: TUserState = {
  user: null,
  isAuth: false,
  isAuthChecked: false,
  orders: [],
  orderRequest: false,
  loginRequest: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userSelector: (state) => state.user,
    nameSelector: (state) => state.user?.name || '',
    emailSelector: (state) => state.user?.email || '',
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthSelector: (state) => state.isAuth,
    loginRequestSelector: (state) => state.loginRequest,
    ordersSelector: (state) => state.orders,
    ordersRequestSelector: (state) => state.orderRequest,
    errorSelector: (state) => state.error
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuth = false;
        state.loginRequest = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.loginRequest = false;
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.loginRequest = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loginRequest = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginRequest = false;
        state.error = action.error.message!;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isAuth = false;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(updateUserInfoThunk.pending, (state) => {
        state.loginRequest = true;
      })
      .addCase(updateUserInfoThunk.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(updateUserInfoThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.isAuthChecked = true;
        state.user = null;
        state.error = action.error.message!;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(fetchOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message!;
      })
      .addCase(fetchOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      });
  }
});

export const {
  userSelector,
  nameSelector,
  emailSelector,
  isAuthSelector,
  ordersSelector,
  ordersRequestSelector,
  errorSelector,
  isAuthCheckedSelector
} = userSlice.selectors;
export const { resetError } = userSlice.actions;
export default userSlice.reducer;
