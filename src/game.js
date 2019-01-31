import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Board from './board';

function calculateMovesLeft(squares) {
  return _.reject(squares, (s) => s).length
}

class Game extends React.Component {
  reset() {
    this.props.dispatch({
      type: 'RESET',
    });
  }

  undo(n=1) {
    this.props.dispatch({
      type: 'UNDO',
      n: n,
    });
  }

  render() {
    let status = 'Next player: ' + this.props.currentPlayer;
    if(this.props.winner) {
      status = "WINNER: " + this.props.winner;
    } else if(calculateMovesLeft(this.props.history[0]) === 0) {
      status = "DRAW!";
    }

    const moves = _.map(this.props.history.slice(1), (move, index) => {
      return (
        <li key={move}>
          <button onClick={() => this.undo(this.props.history.length - index - 1)}>Go back to move {index}</button>
        </li>
      )
    });

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.props.history[0]}
              currentPlayer={this.props.currentPlayer}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ul>{ moves }</ul>
          </div>
        </div>
        <button onClick={() => this.reset()}>Reset</button>
        <button onClick={() => this.undo()}>Undo</button>
      </div>
    );
  }
}

// ========================================
function mapStateToProps(state) {
  return {
    history: state.history,
    currentPlayer: state.currentPlayer,
    winner: state.winner,
  };
}

export default connect(mapStateToProps)(Game)
