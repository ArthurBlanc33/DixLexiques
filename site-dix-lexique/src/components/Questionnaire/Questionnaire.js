import './Questionnaire.css';
import React, { useState } from 'react';

function Questionnaire({ onTestComplete }) {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const questions = [
    {
      question: "As-tu du mal à parler ou à dire des mots correctement ?",
      options: ["Oui", "Non", "Je ne sais pas"],
      points: [2, 0, 1], // Points correspondants aux options
    },
    {
      question: "Est-ce que ton écriture est souvent difficile à lire, même pour toi ?",
      options: ["Oui, souvent", "Parfois", "Non, jamais"],
      points: [2, 1, 0],
    },
    {
      question: "Écris-tu plus lentement que tes camarades de classe ?",
      options: ["Oui, souvent", "Parfois", "Non"],
      points: [2, 1, 0],
    },
    {
      question: "Comment te sens-tu en dictée ?",
      options: ["Super bien", "Ça va", "Bof", "Pas du tout bien"],
      points: [0, 1, 2, 3],
    },
    {
      question: "Est-ce difficile d’apprendre les tables de multiplication ?",
      options: ["Oui, c’est difficile", "Parfois", "Non"],
      points: [2, 1, 0],
    },
    {
      question: "As-tu du mal à te souvenir de l’ordre des jours ou des mois ?",
      options: ["Oui, c’est difficile", "Parfois", "Non"],
      points: [2, 1, 0],
    },
    {
      question: "Fais-tu des erreurs en écrivant la date ?",
      options: ["Oui, souvent", "Parfois", "Non, jamais"],
      points: [2, 1, 0],
    },
    {
      question: "Oublies-tu souvent des objets importants ?",
      options: ["Oui, souvent", "Parfois", "Non, jamais"],
      points: [2, 1, 0],
    },
    {
      question: "As-tu eu des difficultés à apprendre l’alphabet ?",
      options: ["Oui", "Un peu", "Non"],
      points: [2, 1, 0],
    },
  ];

  const questionsPerPage = 3;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handleAnswerChange = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleNextPage = (e) => {
    e.preventDefault(); // Prevent form submission when navigating to next page
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    // Check if all current page questions are answered
    const allAnswered = questions.slice(startIndex, endIndex).every((_, idx) =>
      answers[startIndex + idx] !== undefined
    );

    if (allAnswered) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("Veuillez répondre à toutes les questions avant de continuer.");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (Object.keys(answers).length === questions.length) {
      // Calculate the total score
      let totalPoints = 0;
      Object.entries(answers).forEach(([index, selectedOption]) => {
        const questionIndex = parseInt(index, 10);
        const selectedOptionIndex = questions[questionIndex].options.indexOf(selectedOption);
        totalPoints += questions[questionIndex].points[selectedOptionIndex];
      });

      console.log("totalPoints " + totalPoints)
      onTestComplete(totalPoints); // Return total points
    } else {
      alert("Veuillez répondre à toutes les questions avant de soumettre.");
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="questionnaire-container">
      <form onSubmit={handleSubmit} className="questionnaire-form">
        {currentQuestions.map((q, index) => {
          const questionIndex = startIndex + index;
          return (
            <div key={questionIndex} className="question-block">
              <h3 className="question-title">{q.question}</h3>
              <div className="options">
                {q.options.map((option, i) => (
                  <label key={i} className="option-label">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={option}
                      checked={answers[questionIndex] === option}
                      onChange={() => handleAnswerChange(questionIndex, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <hr />
            </div>
          );
        })}

        <div className="navigation-buttons">
          <button
            type="button"
            onClick={handlePreviousPage}
            className="nav-button"
            disabled={currentPage === 0}
          >
            Retour
          </button>

          {currentPage < totalPages - 1 ? (
            <button
              type="button" // Prevent form submission here
              onClick={handleNextPage}
              className="nav-button next-button"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit" // Only submit the form on this button
              className="submit-button"
            >
              Soumettre
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Questionnaire;
