import React from 'react';
import './App.css';


const api = {
  key: '6b5eaf09b6d23acb71e8f02bfa067a66',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const dateBuilder = (d) => {

    let months = ['January', 'February', 'March', "April", 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



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
        <div className='location-container'>
          <div className='location'> Vancouver, Canada </div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-container'>
          <div className='temp'>
            15° c
          </div>
          <div className='weather'>
            Sunny
          </div>

        </div>
        
      </main>

    </div>
  );
}

export default App;
