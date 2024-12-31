import React, { useState } from "react";
import "./SynonymeAntonyme.css"; // Ajouter un fichier CSS similaire pour ce composant

function SynonymAntonymTest({ onTestComplete }) {
  const questions = [
    {
      question: "Quel mot est synonyme de 'heureux' ?",
      options: ["Joyeux", "Triste", "Méchant"],
      correct: "Joyeux",
    },
    {
      question: "Quel mot est un antonyme de 'grand' ?",
      options: ["Petit", "Géant", "Immense"],
      correct: "Petit",
    },
    {
      question: "Quel mot est un synonyme de 'rapide' ?",
      options: ["Lent", "Vif", "Fatigué"],
      correct: "Vif",
    },
    {
      question: "Quel mot est un antonyme de 'chaud' ?",
      options: ["Froid", "Brûlant", "Tiède"],
      correct: "Froid",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle answer selection
  const handleOptionClick = (option) => setSelectedOption(option);

  // Check answer and move to the next question
  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correct) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleEndGame = () => {
    onTestComplete(score);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <div className="text-game-container">
      {showResult ? (
        <div className="result-screen">
x
          <button onClick={handleEndGame} className="restart-button">
            Suivant
          </button>
        </div>
      ) : (
        <div className="question-screen">
          <h2>Choisissez la bonne réponse :</h2>
          <p className="question">{currentQuestion.question}</p>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
                aria-pressed={selectedOption === option}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            {currentQuestionIndex + 1 === questions.length
              ? "Suivant"
              : "Suivant"}
          </button>
        </div>
      )}
    </div>
  );
}

export default SynonymAntonymTest;
