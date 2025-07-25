import userReducer, {
  fetchOrderThunk,
  fetchUserThunk,
  initialState,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  resetError,
  updateUserInfoThunk
} from './user-slice';

describe('проверяет редьюсер', () => {
  it('проверяет начальное состояние', () => {
    const state = userReducer(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });

  it('проверяет состояние pending registerUserThunk', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(false);
    expect(state.loginRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние fulfilled registerUserThunk', () => {
    const mockUser = { name: 'tim', email: 'tim@mail.com' };
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.loginRequest).toBe(false);
    expect(state.user).toBe(mockUser);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние rejected registerUserThunk', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(false);
    expect(state.loginRequest).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('проверяет состояние pending loginUserThunk', () => {
    const action = {
      type: loginUserThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние fulfilled loginUserThunk', () => {
    const mockUser = { name: 'tim', email: 'tim@mail.com' };
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(false);
    expect(state.isAuth).toBe(true);
    expect(state.user).toBe(mockUser);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние rejected loginUserThunk', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('проверяет состояние fulfilled logoutUserThunk', () => {
    const stateUser = {
      ...initialState,
      user: { name: 'tim', email: 'tim@mail.com' },
      isAuth: true
    };
    const action = {
      type: logoutUserThunk.fulfilled.type
    };
    const state = userReducer(stateUser, action);

    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние pending updateUserInfoThunk', () => {
    const action = {
      type: updateUserInfoThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(true);
  });

  it('проверяет состояние fulfilled updateUserInfoThunk', () => {
    const mockUpdateUser = { name: 'timur', email: 'timur@mail.com' };
    const action = {
      type: updateUserInfoThunk.fulfilled.type,
      payload: { user: mockUpdateUser }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toBe(mockUpdateUser);
    expect(state.loginRequest).toBe(false);
  });

  it('проверяет состояние rejected updateUserInfoThunk', () => {
    const action = {
      type: updateUserInfoThunk.rejected.type,
      error: { message: 'Ошибка обновления' }
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe('Ошибка обновления');
  });

  it('проверяет состояние pending fetchUserThunk', () => {
    const action = {
      type: fetchUserThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(false);
  });

  it('проверяет состояние fulfilled fetchUserThunk', () => {
    const mockUser = { name: 'tim', email: 'tim@mail.com' };
    const action = {
      type: fetchUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBe(mockUser);
  });

  it('проверяет состояние rejected fetchUserThunk', () => {
    const action = {
      type: fetchUserThunk.rejected.type,
      error: { message: 'Ошибка получения данных' }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
    expect(state.error).toBe('Ошибка получения данных');
  });

  it('проверяет состояние pending fetchOrderThunk', () => {
    const action = {
      type: fetchOrderThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
  });

  it('проверяет состояние fulfilled fetchOrderThunk', () => {
    const mockOrders = {
      _id: '1',
      ingridients: [],
      number: 1,
      status: 'done'
    };
    const action = {
      type: fetchOrderThunk.fulfilled.type,
      payload: mockOrders
    };
    const state = userReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orders).toBe(mockOrders);
  });

  it('проверяет состояние rejected fetchOrderThunk', () => {
    const action = {
      type: fetchOrderThunk.rejected.type,
      error: { message: 'Ошибка получения заказов' }
    };
    const state = userReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка получения заказов');
  });

  it('проверка resetError', () => {
    const stateError = { ...initialState, error: 'Произошла ошибка' };
    const state = userReducer(stateError, resetError());
    expect(state.error).toBeNull();
  });
});
