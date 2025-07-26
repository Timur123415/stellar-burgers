import { TBurgerConstructorState } from './slices/burger-constructor/burger-constructor-slice';
import { TFeedState } from './slices/feed/feed-slice';
import { TIngredientsState } from './slices/ingredients/ingredients-slice';
import { TOrderState } from './slices/order/order-slice';
import { TUserState } from './slices/user/user-slice';
import { rootReducer } from './store';

describe('Проверяет правильную инициализацию rootReducer', () => {
  const burgerConstructorInitialState: TBurgerConstructorState = {
    burger: {
      bun: null,
      ingredients: []
    },
    error: null
  };

  const feedInitialState: TFeedState = {
    order: null,
    orders: [],
    isFeedsLoading: false,
    isOrderLoading: false,
    total: 0,
    totalToday: 0,
    error: null
  };

  const ingredientsInitialState: TIngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const orderInitialState: TOrderState = {
    order: null,
    isLoading: false,
    error: null
  };

  const userInitialState: TUserState = {
    user: null,
    isAuth: false,
    isAuthChecked: false,
    orders: [],
    orderRequest: false,
    loginRequest: false,
    error: null
  };

  it('проверяет начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'unknow' });
    expect(initialState).toEqual({
      ingredients: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      user: userInitialState,
      feed: feedInitialState,
      order: orderInitialState
    });
  });
});
