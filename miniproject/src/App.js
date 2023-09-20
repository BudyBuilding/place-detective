import React, { useState, useEffect } from "react";
import "./App.css";
import hudata from "./data/quizzes/dummy/img/data.json";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topics = ["dummy", "Topic 2", "Topic 3", "Topic 4"];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="App">
      {!selectedTopic ? (
        <TopicMenu topics={topics} onSelect={handleTopicSelect} />
      ) : (
        <Quiz topic={selectedTopic} onBackToMenu={() => setSelectedTopic(null)} />
      )}
    </div>
  );
}

function TopicMenu({ topics, onSelect }) {
  return (
    <div className="menu">
      <h1>Place Detective</h1>
      <h2>Choose a Topic:</h2>
      <div className="topics">
        {topics.map((topic) => (
          <div className="topic-choose btn" key={topic} onClick={() => onSelect(topic)}>
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}

function Quiz({ topic, onBackToMenu }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load questions from the JSON data
    const loadedQuestions = hudata.questions.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));

    setQuestions(shuffleArray(loadedQuestions));
  }, [topic]);

  const handleAnswerClick = (answerIndex) => {
    if (questions[currentQuestion].correct === answerIndex) {
      setScore(score + 1);
    }

    setSelectedAnswer(answerIndex);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const currentQuestionData = questions[currentQuestion];

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setScore(0);
    // Shuffle the questions and answer choices again
    const loadedQuestions = hudata.questions.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));
    setQuestions(shuffleArray(loadedQuestions));
  };

  return (
    <div className="play">
      {quizFinished ? (
        <div className="result">
          <h1>Quiz Finished!</h1>
          <p>Your Score: {score}/{questions.length}</p>
          <div className="result-buttons">
            <button className="btn" onClick={resetQuiz}>Retry</button>
            <button className="btn" onClick={() => onBackToMenu()}>Main Menu</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="header">
            <h1>{topic} quiz</h1>
            <p className="question-number">Question {currentQuestion + 1}/{questions.length}</p>
          </div>
          {currentQuestionData && (
            <div>
              <img className="pic" src={`./data/quizzes/dummy/${currentQuestionData.image}`} alt={`Question ${currentQuestion + 1}`} />
              <div className="options">
                {currentQuestionData.answers.map((answer, ansIndex) => (
                  <button
                    className="btn"
                    key={ansIndex}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswerClick(ansIndex)}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default App;
