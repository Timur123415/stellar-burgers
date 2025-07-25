import ingredientsReducer, {
  fetchIngredientsThunk,
  initialState
} from './ingredients-slice';

describe('проверяет редьюсер', () => {
  it('проверяет начальное состояние', () => {
    const state = ingredientsReducer(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });

  it('проверяет состояние pending fetchIngredientsThunk', () => {
    const action = { type: fetchIngredientsThunk.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние fulfilled fetchIngredientsThunk', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];
    const action = {
      type: fetchIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toBe(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('проверяет состояние rejected fetchIngredientsThunk', () => {
    const action = {
      type: fetchIngredientsThunk.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
