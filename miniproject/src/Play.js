import React, { useState, useEffect } from 'react';

function Play({ topic }) {
  const [places, setPlaces] = useState([]);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState('');
  const [wrong, setWrong] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Construct the URL with the topic
    const url = `${topic}.json`;

    // Fetch and set the places data from the constructed URL
    fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    setPlaces(data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error loading places data:', error);
    setLoading(false);
  });
  }, [topic]);

  const loadNextPlace = () => {
    // Check if there are more places to show
    if (currentPlaceIndex < places.length - 1) {
      setCurrentPlaceIndex(currentPlaceIndex + 1);
    } else {
      // Handle the end of the game or loop to the first place if desired
      setCurrentPlaceIndex(0);
    }
  };

  const checkAnswer = (selectedName) => {
    const currentPlace = places[currentPlaceIndex];

    if (currentPlace.name === selectedName) {
      setCorrect(currentPlace.name);
      setPoints(points + 1);
    } else {
      setWrong([...wrong, selectedName]);
    }

    // Load the next place
    loadNextPlace();
  };

  return (
    <div>
      <h1>Play</h1>
      <h2>{topic}</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {currentPlaceIndex < places.length && (
            <>
              <img src={places[currentPlaceIndex].url} alt={places[currentPlaceIndex].name} />
              <div>
                <p>Points: {points}</p>
                <button onClick={loadNextPlace}>Load Next Place</button>
              </div>
            </>
          )}

          <div>
            <p>Correct Answer: {correct}</p>
            <p>Wrong Answers: {wrong.join(', ')}</p>
          </div>

          <div>
            {places.map((place) => (
              <button key={place.id} onClick={() => checkAnswer(place.name)}>
                {place.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Play;
