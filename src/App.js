import React from 'react';
import TrueRange from './components/TrueRange'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-6 my-3">
              <h1>
                EV Range Calculator
              </h1>
            </div>
          </div>
        </div>
        <TrueRange />
      </header>
    </div>
  );
}

export default App;
