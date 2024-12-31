import React, { useState, useEffect } from "react";
import "./IntruderMatrix.css";

function IntruderMatrix({ rows = 6, cols = 6, timeLimit = 30, onTestComplete }) {
  const [matrix, setMatrix] = useState([]);
  const [intruder, setIntruder] = useState("");
  const [mainLetter, setMainLetter] = useState("");
  const [timer, setTimer] = useState(timeLimit);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Génération d'une matrice avec un intrus
  const generateMatrix = () => {
    const letters = ["p", "q", "d"];
    const chosenMainLetter = letters[Math.floor(Math.random() * letters.length)];
    let chosenIntruder;
    do {
      chosenIntruder = letters[Math.floor(Math.random() * letters.length)];
    } while (chosenIntruder === chosenMainLetter);

    const newMatrix = [];
    for (let i = 0; i < rows; i++) {
      const row = Array(cols).fill(chosenMainLetter);
      newMatrix.push(row);
    }

    // Ajouter l'intrus à une position aléatoire
    const intruderRow = Math.floor(Math.random() * rows);
    const intruderCol = Math.floor(Math.random() * cols);
    newMatrix[intruderRow][intruderCol] = chosenIntruder;

    setMainLetter(chosenMainLetter);
    setIntruder(chosenIntruder);
    return newMatrix;
  };

  // Initialiser le jeu
  useEffect(() => {
    setMatrix(generateMatrix());
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
          setGameOver(true);
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Gérer le clic sur une lettre
  const handleClick = (rowIdx, colIdx) => {
    const clickedLetter = matrix[rowIdx][colIdx];
    if (clickedLetter === intruder) {
      // Bonne réponse : ajouter un point et régénérer la matrice
      setScore((prevScore) => prevScore + 1);
    }
    else{
      if(score > 0)
        setScore((prevScore) => prevScore - 1);
    }
    // Générer une nouvelle matrice dans les deux cas (bonne ou mauvaise réponse)
    setMatrix(generateMatrix());
  };

  // Gérer la fin du jeu
  const handleEndGame = () => {
    console.log("score " + score);
    onTestComplete(score);
  };

  return (
    <div className="intruder-matrix-container">
      {gameOver ? (
        <div className="game-over">
          <h2>Temps écoulé !</h2>
          <button onClick={handleEndGame} className="restart-button">
            Suivant
          </button>
        </div>
      ) : (
        <div>
          <h2>Cliquez sur l'intrus (différent de "{mainLetter}")</h2>
          <div className="timer">Temps restant : {timer}s</div>
          <div className="matrix">
            {matrix.map((row, rowIdx) => (
              <div key={rowIdx} className="matrix-row">
                {row.map((letter, colIdx) => (
                  <button
                    key={`${rowIdx}-${colIdx}`}
                    className="matrix-cell"
                    onClick={() => handleClick(rowIdx, colIdx)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="score">Score : {score}</div>
        </div>
      )}
    </div>
  );
}

export default IntruderMatrix;
