import rootReducer from './../../src/reducers/root-reducer';

describe('rootReducer', () => {
  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({});
  });
})
