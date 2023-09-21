import React, { useState, useEffect } from "react";
import "./App.css";

import hudata from "./data/quizzes/dummy/img/data.json";


//The app function contains the main logic of the app.
//if we have a selected topic then we have to load all the questions for that topic.
//if we do not then we have to load the menu
function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topics = ["dummy", 
                  "Topic 2", 
                  "Topic 3", 
                  "Topic 4"];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="App">
      {
      !selectedTopic ? 
      (
        <TopicMenu topics={topics} 
        onSelect={handleTopicSelect} />
      ) : 
      (
        <Quiz topic={selectedTopic} onBackToMenu=
        {
          () => setSelectedTopic(null)
        } />
      )}
    </div>
  );
}

//the topicmenu contains the logic of the topic menu
//all the topics are saved in the topics array.
//the "topics" parameter contains all the topics.
//the "onSelect" parameter contains the function that is called when a topic is selected.
function TopicMenu({ topics, onSelect }) {
  return (
    <div className="menu">
      <h1>Place Detective</h1>
      <h2>Choose a Topic:</h2>
      <div className="topics">
        {
        topics.map(
          (topic) => (
            <div className="topic-choose btn" 
                  key={topic} 
                  onClick={
                    () => onSelect(topic)
                  }>
              {topic}
            </div>
          )
        )
        }
      </div>
    </div>
  );
}


//the quiz contains the logic of the quiz
//firstly we have to load all the questions for that topic.
//the "topic" parameter contains the selected topic.
//the "onBackToMenu" parameter contains the function that is called when the Main Menu button is clicked and this sets the topic to null.
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
    }
    ));

    setQuestions(shuffleArray(loadedQuestions));
  }, [topic]);

  //this function handles the answers and sets the scores
  const handleAnswerClick = (answerIndex) => 
  {
    if (questions[currentQuestion].correct === answerIndex) {
      setScore(score + 1);
    }

    setSelectedAnswer(answerIndex);

    //this if statement checks if the quiz is finished
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  //in the currentQuestionData we are saving the information about the randomly choosen question.
  const currentQuestionData = questions[currentQuestion];

  //the resetQuiz function is called when the user clicks on the reset button, and this function is called to reset the quiz.
  //this resets the current question to 0 and sets the selected answer to null. the quiz will became unfinished, the score is set to 0.
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setScore(0);
    // Shuffle the questions and answer choices again
    const loadedQuestions = hudata.questions.map((question) => (
      {
      ...question,
      answers: shuffleArray(question.answers), //here are the answers shuffled.
      }
    ));
    setQuestions(shuffleArray(loadedQuestions));
  };

  return (
    <div className="play">
      {/* if we reached the 10 points then the quiz is finished and we have to show the result page. */}
      {quizFinished ? (
        <div className="result">
          <h1>Quiz Finished!</h1>
          <p>Your Score: {score}/{questions.length}</p>
          <div className="result-buttons">
            {/*the resetquiz resets the quiz to the last starting statement, so starts an another qiuz with the same topic */}
            <button className="btn" 
                    onClick={resetQuiz}>Retry</button> 
            {/*the onbacktomenu sets the topic to null which opens the topicmenu because in the app the statement chooses that result */}
            <button className="btn" 
                    onClick={() => onBackToMenu()}>Main Menu</button>
          </div>
        </div>
      ) : (

        <div>
          <div className="header">
            <h1>{topic} quiz</h1>
            <p className="question-number">
                Question {currentQuestion + 1}
                /{questions.length}</p>
          </div>
          {currentQuestionData && (
            <div>
              {/*the path of the image came from the data.json from the topic's folder */}
              <img className="pic" 
                   src={`./data/quizzes/dummy/${currentQuestionData.image}`} 
                   alt={`Question ${currentQuestion + 1}`} />
              <div className="options">
                {currentQuestionData.answers.map((answer, ansIndex) => (
                  //the handleanswerclick function is called when the user clicks on an answer and returns the index of the selected answer.
                  <button
                    className="btn"
                    key={ansIndex}
                    disabled={selectedAnswer !== null}
                    onClick={
                      () => handleAnswerClick(ansIndex)
                    }
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

//the shuffleArray function is used to shuffle an array, it is used at shuffling the questions and answer choices.
function shuffleArray(array) {
  //this makes a copy of the array.
  const shuffledArray = [...array]; 
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = 
    [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default App;
