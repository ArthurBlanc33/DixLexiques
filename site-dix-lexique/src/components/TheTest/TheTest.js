import React, { useState } from "react";
import LetterMatrix from "../LetterMatrix/LetterMatrix";
import Questionnaire from "../Questionnaire/Questionnaire";
import MemoryLettersTest from "../MemoryTest/MemoryLettersTest";
import FillTheBlanck from "../FillTheBlanck/FillTheBlanck";
import TextQuizz from "../TextQuizz/TextQuizz";
import IntruderMatrix from "../IntruderMatrix/IntruderMatrix";
import SynonymeAntonyme from "../SynonymeAntonyme/SynonymeAntonyme"; // Import du nouveau test
import "./TheTest.css";

function TheTest() {
  const [currentTestIndex, setCurrentTestIndex] = useState(-1); // Start at -1 for the "Click to Start" button
  const [results, setResults] = useState([]); // Store results of each test

  // Define all tests except the Questionnaire
  const otherTests = [
    {
      name: "Memory Letters Test",
      component: (
        <MemoryLettersTest
          onTestComplete={(result) => handleTestComplete(result)}
        />
      ),
    },
    {
      name: "Fill The Blank",
      component: (
        <FillTheBlanck
          onTestComplete={(result) => handleTestComplete(result)}
        />
      ),
    },
    {
      name: "Text Quizz",
      component: (
        <TextQuizz
          onTestComplete={(result) => handleTestComplete(result)}
        />
      ),
    },
    {
      name: "Intruder Matrix",
      component: (
        <IntruderMatrix
          targetLetter="p"
          rows={6}
          cols={6}
          onTestComplete={(result) => handleTestComplete(result)}
        />
      ),
    },
    {
      name: "Synonym Antonym",
      component: (
        <SynonymeAntonyme
          onTestComplete={(result) => handleTestComplete(result)}
        />
      ),
    },
  ];

  // Shuffle the other tests randomly
  const shuffledTests = React.useMemo(() => {
    const shuffled = [...otherTests];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []); // Shuffle only once when the component mounts

  // Combine the Questionnaire and the shuffled tests
  const tests = [
    {
      name: "Questionnaire",
      component: (
        <Questionnaire
          onTestComplete={(result) => handleTestComplete(result)}
        />
      ),
    },
    ...shuffledTests,
  ];

  // Handle test completion
  const handleTestComplete = (result) => {
    setResults((prevResults) => [...prevResults, result]);
    setCurrentTestIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="test-wrapper">
      {currentTestIndex === -1 ? (
        <div className="start-screen">
          <h1>Bienvenue sur notre jeu</h1>
          <button onClick={() => setCurrentTestIndex(0)} className="start-button">
            Cliquer pour commencer
          </button>
        </div>
      ) : currentTestIndex < tests.length ? (
        <div className="test-frame">{tests[currentTestIndex].component}</div>
      ) : (
        <div className="results-screen">
          <h1>Résultats des Tests</h1>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                {tests[index].name}: {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TheTest;
