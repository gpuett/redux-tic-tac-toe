import React from 'react';
import Board from './Board';
import './styles.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  handleClick(i) {
    const { dispatch } = this.props;
    const action = {
      type: 'ADD_MOVE',
      squareId: i
    };


    dispatch(action);
  }
  jumpTo(step) {
    const { dispatch } = this.props;
    const action = {
      type: 'JUMP_TO',
      currentStep: step
    };
    dispatch(action);
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] &&  squares[a] === squares[b] && squares[a] === squares[c]) {
        const action = {
          type: 'WINNER',
          winner: this.props.winner
        };
        this.props.dispatch(action);
        return squares[a];
      }
    }
    return null;
  }
  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if(winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}



Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.array,
  stepNumber: PropTypes.number,
  xIsNext: PropTypes.bool,
  winner: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    winner: state.winner
  };
};

export default connect(mapStateToProps)(Game);
