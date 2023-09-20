import React, { useState } from 'react';
import './App.css';
import huData from './hu.json';

function App() {
  const [play, setPlay] = useState(false);

  const Play = function () {
    let correct;
    let wrond;
    
    const randomIndex = Math.floor(Math.random() * huData.length);
  const randomPlace = huData[randomIndex];
  console.log(randomIndex);

  }

  const Menu = function () {
    return (
      <div>
        <h1>Place detective</h1>
        <h2>Select a topic</h2>
        <button onClick={() => setPlay(true)}>Play</button>
      </div>
    );
  }

  return (
    <>
      {play ? <Play /> : <Menu />}
    </>
  );
}

export default App;
