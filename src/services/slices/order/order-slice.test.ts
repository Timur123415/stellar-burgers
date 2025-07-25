import orderReducer, {
  fetchOrderBurgerThunk,
  initialState,
  resetOrder
} from './order-slice';

describe('проверяет редьюсер', () => {
  it('проверяет начальное состояние', () => {
    const state = orderReducer(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });

  it('проверяет состояние pending fetchOrderBurgerThunk', () => {
    const action = { type: fetchOrderBurgerThunk.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние fulfilled fetchOrderBurgerThunk', () => {
    const mockOrder = {
      ingredients: ['item1', 'item2'],
      _id: '67d3263c133acd001be57a4a',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-13T18:38:52.663Z',
      updatedAt: '2025-06-13T18:38:53.323Z',
      number: 70984,
      price: 2964
    };
    const action = {
      type: fetchOrderBurgerThunk.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.order).toBe(mockOrder);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние rejected fetchOrderBurgerThunk', () => {
    const action = {
      type: fetchOrderBurgerThunk.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });

  it('проверяет resetOrder', () => {
    const stateOrderInfo = {
      order: {
        ingredients: ['item1', 'item2'],
        _id: '67d3263c133acd001be57a4a',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-06-13T18:38:52.663Z',
        updatedAt: '2025-06-13T18:38:53.323Z',
        number: 70984,
        price: 2964
      },
      isLoading: false,
      error: null
    };
    const state = orderReducer(stateOrderInfo, resetOrder());

    expect(state.order).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
