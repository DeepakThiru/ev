import React from 'react';
import TrueRange from './components/TrueRange'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          How far can you go?
        </p>
        <TrueRange />
      </header>
    </div>
  );
}

export default App;
