import React, { useState } from "react";
import "./FillTheBlanck.css"; // Style for the component

function FillTheBlanck({ onTestComplete }) {
  // Questions and answers
  const questions = [
    {
      sentence: "Pour aller à l'\u00e9cole, Emma prend ___ avec elle.",
      options: ["son cartable", "son chien", "son bus"],
      correct: "son cartable",
    },
    {
      sentence: "Le verre est ___ parce qu’il est tombé par terre.",
      options: ["rempli", "froid", "cassé"],
      correct: "cassé",
    },
    {
      sentence: "Quand il pleut, Lucas utilise ___ pour ne pas se mouiller :",
      options: ["son paraplufle", "son parapluide", "son parapluie"],
      correct: "son parapluie",
    },
    {
      sentence: "Pour écrire, Clara utilise ___ sur son cahier :",
      options: ["un stulo", "un stylo", "un slylo"],
      correct: "un stylo",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle answer selection
  function handleOptionClick(option) {
    setSelectedOption(option);
  }

  // Check answer and move to the next question
  function handleNextQuestion() {
    if (selectedOption === currentQuestion.correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  }

  const handleEndGame = () => {
    console.log("score " + score);
    onTestComplete(score);
  };

  // Restart the game
  function restartGame() {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setSelectedOption(null);
  }

  return (
    <div className="text-game-container">
      {showResult ? (
        <div className="result-screen">
          <div className="game-over">
          <button onClick={handleEndGame} className="restart-button">
            Suivant
          </button>
        </div>
        </div>
      ) : (
        <div className="question-screen">
          <h2>Complète la phrase :</h2>
          <p className="sentence">{currentQuestion.sentence}</p>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
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
              ? "Voir Résultat"
              : "Suivant"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FillTheBlanck;
