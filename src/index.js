import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Game from './game';
import './index.css';


const initialState = {
  history: [Array(9).fill(null)],
  currentPlayer: 'X',
  winner: null,
};

function calculateWinner(squares) {
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

  for(var i = 0; i < lines.length; i++) {
    const e = lines[i];
    if(squares[e[0]] && squares[e[0]] === squares[e[1]] && squares[e[1]] === squares[e[2]]) {
      return squares[e[0]];
    }
  };

  return null;
}

function handlePlay(state, action) {
  /* TODO */
  const new_squares = state.history[0].slice();

  if(calculateWinner(new_squares)) {
    alert("There is already a winner!");
    return state;
  } else if(new_squares[action.square]) {
    alert("There is already something in that square!");
    return state;
  }
  new_squares[action.square] = state.currentPlayer;
  console.log(new_squares);

  return {
    ...state,
    history: [new_squares, ...state.history],
    currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    winner: calculateWinner(new_squares),
  };
}

function handleUndo(state, action) {
  if(state.history.length < action.n + 1) {
    alert("Not enough history!");
    return state;
  }

  return {
    ...state,
    history: state.history.slice(action.n),
    currentPlayer: (state.history.length - action.n) % 2 ? 'X' : 'O',
    winner: calculateWinner(state.history.slice(action.n)[0]),
  };
}

function reducer(state = initialState, action) {
  console.log(action);

  switch(action.type) {
    case 'PLAY':
      return handlePlay(state, action);

    case 'UNDO':
      return handleUndo(state, action);

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

const store = createStore(reducer);
ReactDOM.render((
    <Provider store={store}>
      <Game />
    </Provider>
  ),
  document.getElementById('root')
);
