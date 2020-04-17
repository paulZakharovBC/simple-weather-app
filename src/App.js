import React from 'react';
import './App.css';


const api = {
  key: '6b5eaf09b6d23acb71e8f02bfa067a66',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const timeApi = {
  key: "cbbe33181e2b4c389ee8303db47d81b0",
  base: "https://api.ipgeolocation.io/timezone?apiKey="
}

class App extends React.Component {
  state = {
    query: '',
    idForNextCity: 0,
    lastCityInTheList: false,
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

          let cityCoord = {
            lat: newCity.weatherInfo.coord.lat,
            long: newCity.weatherInfo.coord.lon
          }

          fetch(`${timeApi.base}${timeApi.key}&lat=${cityCoord.lat}&long${cityCoord.long}`)
            .then(timeRes => timeRes.json())
            .then(timeResult => {
              let lastUpdateCityTime = timeResult.time_24
              let cityWithCord = {
                ...newCity,
                lastUpdateCityTime
              }
              let newArray = [
                ...this.state.listOfCities,
                cityWithCord
              ]
              this.setState(prevState => ({
                query: '',
                weather: result,
                idForNextCity: prevState.idForNextCity + 1,
                currentShowingCityID: newCity.cityId,
                listOfCities: newArray
              }))
            })
        })

    }


  }
  nextCityChangeHandler = () => {
    if (this.state.currentShowingCityID === this.state.listOfCities.length - 1) {
      this.setState({
        currentShowingCityID: 0
      })
    } else {
      this.setState(prevState => ({
        currentShowingCityID: prevState.currentShowingCityID + 1
      }))
    }
  }

  prevCityChangeHandler = () => {
    if (this.state.currentShowingCityID === 0) {
      this.setState(prevState => ({
        currentShowingCityID: prevState.listOfCities.length - 1
      }))
    } else {
      this.setState(prevState => ({
        currentShowingCityID: prevState.currentShowingCityID - 1
      }))
    }

  }

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

    let cityIdToShow = this.state.currentShowingCityID;
    let leftArrowClass = ["fas fa-angle-left arrowBtn"]
    let rightArrowClass = ["fas fa-angle-right arrowBtn"]
    let appBackgroundClass = ['app morning']
    if (this.state.listOfCities.length > 1) {
      leftArrowClass.push('activeBtn')
      rightArrowClass.push('activeBtn')
    }

    return (
      <div className={appBackgroundClass.join(' ')}>
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
            <div className='animated-container'>
              <div className='location-container'>
                <i className={leftArrowClass.join(' ')} onClick={this.prevCityChangeHandler} />

                <div>
                  <div className='location'> {this.state.listOfCities[cityIdToShow].weatherInfo.name}, {this.state.listOfCities[cityIdToShow].weatherInfo.sys.country} </div>
                  <div className='date'>{this.dateBuilder(new Date())}</div>
                  <div>Time:</div>
                </div>
                <i className={rightArrowClass.join(' ')} onClick={this.nextCityChangeHandler} />

              </div>
              <div className='weather-container'>
                <div className='temp'>
                  {Math.round(this.state.listOfCities[cityIdToShow].weatherInfo.main.temp)}°c
            </div>
                <div className='weather'>
                  {this.state.listOfCities[cityIdToShow].weatherInfo.weather[0].main}
                  <div className='icon-box'>
                    <img src={`http://openweathermap.org/img/wn/${this.state.listOfCities[cityIdToShow].weatherInfo.weather[0].icon}@2x.png`} />
                  </div>
                </div>

              </div>
              {/* <button
                onClick={() => this.setLocalTime(cityIdToShow)}

              >Update</button> */}


            </div>
          )
            :
            null}





        </main>

      </div>
    );

  }
}

export default App;
