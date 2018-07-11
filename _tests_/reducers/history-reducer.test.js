import historyReducer from './../../src/reducers/history-reducer';

describe('historyReducer', () => {

  let action;

  const sampleHistoryData = {
    history: [{
      squares: Array(9).fill(null)
    }]
  };

  test('Should return default state if no action type is recognized', () => {
    expect(historyReducer({}, { type: null })).toEqual({});
  });
  test('Should successfully add new array of squares', () => {
    const { history } = sampleHistoryData;
    action = {
      type: 'ADD_MOVE',
      history: history
    };
    expect(historyReducer({}, action)).toEqual({
      history: [{
        squares: [null,null,null,null,null,null,null,null,null]
      }]
    });
  });
});
