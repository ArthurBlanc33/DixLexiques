import React, { useState } from "react";
import "./LetterMatrix.css";

function LetterMatrix({ targetLetter = "p", rows = 6, cols = 6 }) {
  // Generate the matrix of letters
  function generateMatrix() {
    const letters = ["p", "q", "d"];
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        row.push(randomLetter);
      }
      matrix.push(row);
    }
    return matrix;
  }

  const [matrix, setMatrix] = useState(generateMatrix());
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  // Handle letter click
  function handleClick(rowIdx, colIdx) {
    const clickedLetter = matrix[rowIdx][colIdx];
    const alreadySelected = selected.some(
      (pos) => pos.row === rowIdx && pos.col === colIdx
    );

    if (!alreadySelected) {
      setSelected((prev) => [...prev, { row: rowIdx, col: colIdx }]);
      if (clickedLetter === targetLetter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        setScore((prevScore) => prevScore - 1);
      }
    }
  }

  // Restart the game
  function restartGame() {
    setMatrix(generateMatrix());
    setSelected([]);
    setScore(0);
  }

  return (
    <div className="letter-matrix-container">
      <h2>Clique sur tout les "{targetLetter}"</h2>
      <div className="matrix">
        {matrix.map((row, rowIdx) => (
          <div key={rowIdx} className="matrix-row">
            {row.map((letter, colIdx) => {
              const isSelected = selected.some(
                (pos) => pos.row === rowIdx && pos.col === colIdx
              );
              return (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  className={`matrix-cell ${isSelected ? "selected" : ""}`}
                  onClick={() => handleClick(rowIdx, colIdx)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="score">
        <p>Score: {score}</p>
        <button onClick={restartGame} className="restart-button">
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default LetterMatrix;
