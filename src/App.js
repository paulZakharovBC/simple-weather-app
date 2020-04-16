import React from 'react';
import './App.css';


const api = {
  key: '6b5eaf09b6d23acb71e8f02bfa067a66',
  base: 'https://api.openweathermap.org/data/2.5/'
}

class App extends React.Component {
  state = {
    query: '',
    idForNextCity: 0,
    currentShowingCityID: 0,
    weather: {},
    listOfCities: []

  }

  handleSearch = (event) => {
    this.setState({
      query: event.target.value,
      currentCity: event.target.value
    })

  }

  search = (event) => {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?q=${this.state.query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          let newCity = {
            cityId: this.state.idForNextCity,
            weatherInfo: result
          }
          let newArray = [
            ...this.state.listOfCities,
            newCity
          ]
          this.setState( prevState => ({
            query: '',
            weather: result,
            idForNextCity: prevState.idForNextCity + 1,
            listOfCities: newArray
          }))
        })

        


    }
  }

  // updateCurrentCityWeather = () => {
  //   fetch(`${api.base}weather?q=${this.state.currentCity}&units=metric&APPID=${api.key}`)
  //     .then(res => res.json())
  //     .then(result => {
  //       this.setState({
  //         weather: result
  //       })
  //     })

  // }



  dateBuilder = (d) => {

    let months = ['January', 'February', 'March', "April", 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  render() {
    return (
      <div className="app morning">
        <main>
          <div className='search-box'>
            <input
              type='text'
              className='search-input'
              placeholder='Search...'
              onChange={this.handleSearch}
              value={this.state.query}
              onKeyPress={this.search}

            />
          </div>

          {(typeof this.state.weather.main != 'undefined') ? (
            <div>
              <div className='location-container'>
                <div className='location'> {this.state.weather.name}, {this.state.weather.sys.country} </div>
                <div className='date'>{this.dateBuilder(new Date())}</div>
              </div>
              <div className='weather-container'>
                <div className='temp'>
                  {Math.round(this.state.weather.main.temp)}°c
            </div>
                <div className='weather'>
                  {this.state.weather.weather[0].main}
                </div>

              </div>
              {/* <button
                onClick={this.updateCurrentCityWeather}

              >Update</button> */}
            </div>
          ) : null}





        </main>

      </div>
    );

  }
}

export default App;
