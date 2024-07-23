import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, handleClick, version }) {
  const winner = calculateWinner(squares);
  let currentMove = "Current Moves: " + version;
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="status">{currentMove}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Button({ id, jumpTo }) {
  const message = id === 0 ? "Go to game start" : `Go to move #${id}`;
  return (
    <li>
      <button onClick={() => jumpTo(id)} key={id}>{message}</button>  
    </li>
  )
}

function Steps({jumpTo, history}) {
  return (
    <ol>
      {history.map((_, index,arr) => {
        return index === arr.length-1 ? <></> : <Button id={index} jumpTo={jumpTo}/>;
      })}
    </ol>
  )
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [version, setVersion] = useState(0);

  function handleClick(i) {
    const squares = history[version];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
    setVersion(version+1);
  }

  function jumpTo(key) {
    setHistory(history.slice(0,key+1));
    setXIsNext(key%2 === 0);
    setVersion(key);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={history[version]} handleClick={handleClick} version={version}/>
      </div>
      <div className="game-info">
        <Steps history={history} jumpTo={jumpTo}/>
      </div>
    </div>
  )
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
