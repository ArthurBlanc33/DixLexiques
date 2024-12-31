import React, { useState, useEffect } from "react";
import "./MemoryLettersTest.css";

function MemoryLettersTest({ onTestComplete }) {
  const [level, setLevel] = useState(1); // Current level
  const [letters, setLetters] = useState([]); // Letters to memorize
  const [input, setInput] = useState(""); // User's input
  const [showLetters, setShowLetters] = useState(false); // Display letters
  const [turns, setTurns] = useState(0); // Track number of turns
  const [correctAnswers, setCorrectAnswers] = useState(0); // Correct answers count
  const [isGameStarted, setIsGameStarted] = useState(false); // Game start state
  const [isGameOver, setIsGameOver] = useState(false); // Game over state

  const totalTime = 3000 + level * 500; // Time to display letters
  const nTurns = 5;

  // Generate random letters based on the level
  useEffect(() => {
    if (isGameStarted && turns < nTurns) {
      const generateLetters = (length) => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return Array.from({ length }, () =>
          alphabet[Math.floor(Math.random() * alphabet.length)]
        );
      };

      setLetters(generateLetters(level + 2));
      setShowLetters(true);

      // Hide letters after the display duration
      setTimeout(() => {
        setShowLetters(false);
      }, totalTime);
    }
  }, [level, isGameStarted, turns, totalTime]);

  // Check user's input
  const handleSubmit = () => {
    setTurns((prevTurns) => prevTurns + 1); // Increment turn count

    if (input.toUpperCase() === letters.join("")) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1); // Increment correct answers
      setLevel((prevLevel) => prevLevel + 1); // Advance to next level
    }

    setInput("");

    // End game after nTurns turns
    if (turns + 1 === nTurns) {
      setIsGameOver(true);
    }
  };

  const handleEndGame = (correctAnswers) => {
    console.log("corrcetAsnwers" + correctAnswers);
    onTestComplete(correctAnswers);
  };

  // Start the game
  const handleStartGame = () => {
    setIsGameStarted(true);
    setTurns(0);
    setCorrectAnswers(0);
    setLevel(1);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.length === level + 2) {
      handleSubmit();
    }
  };

  return (
    <div className="memory-game-container">
      {!isGameStarted ? (
        <div className="start-screen">
          <h1>Test de Mémoire : </h1>
          <p>Mermorise les lettres qui vont apparaitre a l'écran !</p>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : !isGameOver ? (
        <>
          <h2>
            {turns + 1} / {nTurns}
          </h2>
          <div className="letters-display">
            {showLetters ? (
              <>
                <p className="letters">{letters.join(" ")}</p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      animation: `fillProgress ${totalTime}ms linear forwards`,
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="instruction">Entre les lettres que tu as mémorisé</p>
            )}
          </div>
          {!showLetters && (
            <div className="input-section">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                maxLength={level + 2}
                autoFocus
              />
              <div className="button-container">
                <button
                  onClick={handleSubmit}
                  disabled={input.length !== level + 2}
                >
                  Envoyer
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="game-over-screen">
          
          <button onClick={() => handleEndGame(correctAnswers)}>Suivant</button>
        </div>
      )}
    </div>
  );
}

export default MemoryLettersTest;
