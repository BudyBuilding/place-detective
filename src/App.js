import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  useEffect(() => {
    // Load the list of available topics from topics.json
    fetch("../data/quizzes/topics.json") // Adjust the path as needed
      .then((response) => response.json())
      .then((data) => {
        setTopics(data.topics);
      })
      .catch((error) => {
        console.error("Error loading topics:", error);
      });
  }, []);

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
      <h1>Choose a Topic:</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic} onClick={() => onSelect(topic)}>
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Quiz({ topic, onBackToMenu }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Load questions and images for the selected topic
    fetch(`../data/${topic}/data.json`) // Adjust the path as needed
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.error("Error loading questions:", error);
      });
  }, [topic]);

  return (
    <div className="quiz">
      {/* Quiz content goes here */}
    </div>
  );
}

export default App;
