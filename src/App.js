import React from 'react';
import CitiesSearch from './Components/CitiesSearch'
import { DebounceInput } from 'react-debounce-input';
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
    chosenCityToShowWeather: '',
    idForNextCity: 0,
    lastCityInTheList: false,
    showSearchingListPopUp: false,
    currentShowingCityID: 0,
    weather: {},
    searchingCitiesList: [],
    listOfCities: []

  }

  handleSearch = (event) => {
    this.setState({
      query: event.target.value,
      // currentCity: event.target.value
    })

    if (this.state.query.length > 2) {
      this.setState({
        showSearchingListPopUp: true
      })
    } else {
      this.setState({
        showSearchingListPopUp: false
      })
    }

    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${this.state.query}&sort=-population`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "f94ea70c7amsh93941eb1918691ep15f1ecjsn783eefb2ee1f"
      }
    })
      .then(resp => resp.json())
      .then(result => {
        let list = result;
        this.setState({
          searchingCitiesList: list.data
        })
      })
      .catch(err => {
        console.log(err);
      });


  }

  search = (event, item) => {
    event.preventDefault();
    event.persist()
    
    // if (event.key === 'Enter') {
    fetch(`${api.base}weather?lat=${item.latitude}&lon=${item.longitude}&appid=${api.key}`)
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

        fetch(`${timeApi.base}${timeApi.key}&lat=${cityCoord.lat}&long=${cityCoord.long}`)
          .then(timeRes => timeRes.json())
          .then(timeResult => {
            let lastUpdateCityTime = timeResult.time_24
            let cityWithCord = {
              ...newCity,
              lastUpdateCityTime
            }
            // console.log(cityWithCord)
            let newArray = [
              ...this.state.listOfCities,
              cityWithCord
            ]
            // console.log(newArray)
            this.setState(prevState => ({
              query: '',
              weather: result,
              idForNextCity: prevState.idForNextCity + 1,
              currentShowingCityID: newCity.cityId,
              listOfCities: newArray,
              showSearchingListPopUp: false
            }))
          })
          .catch((error => {
            console.error('Error:', error);
          }))
      })
      .catch((error => {
        console.error('Error:', error);
      }))

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

  confirmCity = (item, event) => {
    this.setState({
      query: item.city,
      searchingCitiesList: []
    })
    this.search(event, item)
  }



  render() {

    let cityIdToShow = this.state.currentShowingCityID;
    let leftArrowClass = ["fas fa-angle-left arrowBtn"]
    let rightArrowClass = ["fas fa-angle-right arrowBtn"]
    let appBackgroundClass = ['app']
    if (this.state.listOfCities.length > 1) {
      leftArrowClass.push('activeBtn')
      rightArrowClass.push('activeBtn')
    }

    if (this.state.listOfCities.length > 0) {
      const cityTimeForBackground = this.state.listOfCities[cityIdToShow].lastUpdateCityTime;
      const morning = cityTimeForBackground > "06" && cityTimeForBackground < "12"
      const day = cityTimeForBackground > "12" && cityTimeForBackground < "19"
      const evening = cityTimeForBackground > "19" && cityTimeForBackground < "23"
      const night = cityTimeForBackground > "23" || cityTimeForBackground < "06"

      if (morning) {
        appBackgroundClass.push('morning')
      } else if (day) {
        appBackgroundClass.push('day')
      } else if (evening) {
        appBackgroundClass.push('evening')
      } else if (night) {
        appBackgroundClass.push('night')
      }

    }


    return (
      <div className='basic-lair'>
        <div className={appBackgroundClass.join(' ')}>
          <main>
            <div className='search-box'>
              <form onSubmit={this.search}>
                <DebounceInput
                  type='text'
                  className='search-input'
                  placeholder='Search...'
                  minLength={1}
                  debounceTimeout={800}
                  onChange={this.handleSearch}
                  // onKeyPress={this.search}
                  value={this.state.query} />
              </form>

              {/* <input
                onChange={this.handleSearch}
                value={this.state.query}
                onKeyPress={this.search}
              /> */}


            </div>
            {/* <CitiesSearch
              cities={this.state.searchingCitiesList}
              confirmCity={this.confirmCity}

            /> */}

            {this.state.showSearchingListPopUp ? 
            <CitiesSearch
            cities={this.state.searchingCitiesList}
            confirmCity={this.confirmCity}

          /> :
          null
            }



            {(typeof this.state.weather.main != 'undefined') ? (
              <div className='animated-container'>
                <div className='location-container'>
                  <i className={leftArrowClass.join(' ')} onClick={this.prevCityChangeHandler} />

                  <div>
                    <div className='location'> {this.state.listOfCities[cityIdToShow].weatherInfo.name}, {this.state.listOfCities[cityIdToShow].weatherInfo.sys.country} </div>
                    <div className='date'>{this.dateBuilder(new Date())}</div>
                    <p>Last Updated: {this.state.listOfCities[cityIdToShow].lastUpdateCityTime} (local)</p>
                  </div>
                  <i className={rightArrowClass.join(' ')} onClick={this.nextCityChangeHandler} />

                </div>
                <div className='weather-container'>
                  <div className='temp'>
                    {Math.round(this.state.listOfCities[cityIdToShow].weatherInfo.main.temp - 273.15)}°c
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
      </div>
    );


  }
}

export default App;
