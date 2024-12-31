import React, { useState } from "react";
import "./TextQuizz.css";

function TextQuizz({ onTestComplete }) {
  const stories = [
    {
      text: `
        Thibault et Paul se promènent dans la forêt quand ils rencontrent Naomie.
        Ils décident de partir à l'aventure ensemble pour trouver des baies rares,
        mais un écureuil les fait sursauter en passant rapidement près d'eux.
      `,
      questions: [
        {
          question: "Qu'est-ce que Thibault et ses amis cherchent ?",
          options: ["Naomie", "Des baies rares", "Un écureuil"],
          correctAnswer: "Des baies rares",
        },
        {
          question: "Qu'est-ce qui fait sursauter Thibault, Paul et Naomie ?",
          options: ["La forêt", "Un loup", "Un écureuil"],
          correctAnswer: "Un écureuil",
        },
        {
          question: "Où se passe l'aventure ?",
          options: ["Dans une maison", "Dans la forêt", "Chez Naomie"],
          correctAnswer: "Dans la forêt",
        },
      ],
    },
    {
      text: `
        Le chat gris sauta sur le canapé et renversa un vase. Il courut vite pour 
        se cacher sous la table, effrayé par le bruit du verre qui se brisait.
      `,
      questions: [
        {
          question: "Qu'a renversé le chat ?",
          options: ["Le vase", "Le verre d'eau", "La table"],
          correctAnswer: "Le vase",
        },
        {
          question: "Pourquoi le chat s'est-il caché ?",
          options: [
            "Son maître est arrivé",
            "Il a eu peur",
            "Il était mouillé",
          ],
          correctAnswer: "Il a eu peur",
        },
        {
          question: "Que s'est-il passé avec le vase ?",
          options: [
            "Il est tombé sur le chat",
            "Il contenait des fleurs",
            "Le vase s'est cassé",
          ],
          correctAnswer: "Le vase s'est cassé",
        },
      ],
    },
    {
      text: `
      Sarah et Julie partent explorer une grotte mystérieuse. Elles y trouvent des dessins anciens, mais elles entendent un bruit étrange qui les fait paniquer.
      `,
      questions: [
        {
          question: "Que découvrent Sarah et Julie ?",
          options: ["Des dessins", "Des animaux", "Une rivière"],
          correctAnswer: "Des dessins",
        },
        {
          question: "Qu’est-ce qui les fait paniquer ?",
          options: ["Un bruit", "Un écho", "Une lumière"],
          correctAnswer: "Un bruit",
        },
        {
          question: "Où sont-elles ?",
          options: ["Dans une grotte", "Dans une forêt", "Sur une montagne"],
          correctAnswer: "Dans une grotte",
        },
      ],
    },
  ];

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentStory = stories[currentStoryIndex];
  const currentQuestion = currentStory.questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < currentStory.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else if (currentStoryIndex + 1 < stories.length) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleEndGame = () => {
    onTestComplete(score);
  };

  const handleRestart = () => {
    setCurrentStoryIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="quiz-game-container">
      {!isFinished ? (
        <>
          <div className="story-section">
            <h2>Histoire</h2>
            <p>{currentStory.text}</p>
          </div>
          <div className="question-section">
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.question}</p>
            <ul className="options">
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  className={`option ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Valider
            </button>
          </div>
        </>
      ) : (
        <div className="game-over">
         
          <button onClick={handleEndGame} className="restart-button">
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}

export default TextQuizz;
