import React from 'react';
import './App.css';


const api = {
  key: '6b5eaf09b6d23acb71e8f02bfa067a66',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  return (
    <div className="app morning">
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-input'
            placeholder='Search...'

          />

        </div>
      </main>

    </div>
  );
}

export default App;
