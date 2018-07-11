export default (state = {
  history: [{
    squares: Array(9).fill(null)
  }]
}, action) => {
  switch(action.type) {
  case 'ADD_MOVE':
    let newState = Object.assign({}, state, {

    });
    return newState;
  default:
    return state;
  }
};
