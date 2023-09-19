import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="App">
      {!selectedTopic ? (
        <TopicMenu topics={topics} onSelect={handleTopicSelect} />
      ) : (
        <Quiz topic={selectedTopic} data={huData} />
      )}
    </div>
  );
}

function TopicMenu({ topics, onSelect }) {
  return (
    <div>
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

function Quiz({ topic, data }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(data).map((item) => ({
      imageSrc: item.url,
      options: shuffleArray([
        `Option 1 for ${item.name}`,
        `Option 2 for ${item.name}`,
        `Option 3 for ${item.name}`,
        `Option 4 for ${item.name}`
      ]),
      correctOption: 0 // You can set the correct option index here
    }));
    setQuestions(shuffledQuestions);
  }, [data]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion]?.correctOption) {
      // Added ?. to safely access correctOption
      setScore(score + 1);
    }

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz Finished! Your Score: ${score}/10`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <div>
      <h1>{topic} Quiz</h1>
      <p>Question {currentQuestion + 1}/10</p>
      {questions[currentQuestion] && ( // Added check to ensure questions[currentQuestion] exists
        <>
          <img
            src={questions[currentQuestion].imageSrc}
            alt={`Question ${currentQuestion + 1}`}
          />
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={option} onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
        </>
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

const topics = ["Topic 1", "Topic 2", "Topic 3", "Topic 4"];

const huData = [
  {
    id: 1,
    name: "Parliament",
    place: "Budapest",
    url: "https://lh5.googleusercontent.com/p/AF1QipN_UAW-UgP0oVgU69VcntZ1W05H-5lKSicqh-CG=w548-h318-n-k-no"
  },
  {
    id: 2,
    name: "Town Hall",
    place: "Tihany",
    url: "https://www.udvarhely.ro/wp-content/uploads/2018/06/tihany-civertan-750x400.jpg"
  },
  {
    id: 3,
    name: "Fire Tower",
    place: "Sopron",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/2012-ben_meg%C3%BAjult_T%C5%B1ztorony.JPG/250px-2012-ben_meg%C3%BAjult_T%C5%B1ztorony.JPG"
  },
  {
    id: 4,
    name: "Castle",
    place: "Keszthely",
    url: "https://csodalatosmagyarorszag.hu/wp-content/uploads/2018/02/keszthely-festetics-kastely-helikon-kastelymuzeum-csodalatosbalaton.hu_-1024x576.jpg"
  }
];

export default App;
