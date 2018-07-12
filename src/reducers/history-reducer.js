export default (state = {
  history: [{
    squares: Array(9).fill(null)
  }],
  stepNumber: 0,
  xIsNext: true,
  winner: false
}, action) => {
  let newState;
  const { squareId, currentStep } = action;
  switch(action.type) {
  case 'ADD_MOVE': {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    squares[action.squareId] = state.xIsNext ? 'X' : 'O';
    newState = Object.assign({}, state, {
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    });
    return newState;
  }
  case 'JUMP_TO': {
    newState = Object.assign({}, state, {
      stepNumber: action.currentStep,
      xIsNext: (action.currentStep % 2) === 0
    });
    return newState;
  }
  case 'WINNER': {
    let winState = Object.assign({}, state, {
      winner: true
    })
    return winState;
    if (state.winner === true || squares[squareId]) {
      return;
    }
  }
  default:
    return state;
  }
};
