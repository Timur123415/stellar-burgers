import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredients from './slices/ingredients/ingredients-slice';
import burgerConstructor from './slices/burger-constructor/burger-constructor-slice';
import user from './slices/user/user-slice';
import feed from './slices/feed/feed-slice';
import order from './slices/order/order-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  user,
  feed,
  order
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
