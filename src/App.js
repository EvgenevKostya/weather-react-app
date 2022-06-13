import React, {useState} from "react";
import axios from "axios";

import './App.css';



function App() {
  const dateBuilder = (d) => {
    let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b349720727d85e8e0c63ef1cd9ebf9a3&units=metric&lang=ru`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={event => setLocation(event.target.value)}
            value={location}
            onKeyDown={searchLocation}
          />
        </div>
        <div className="location-box">
          <div className="location">{data.name? data.name : undefined}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{data.main? data.main.temp.toFixed(0) : undefined} °C</div>
          <div className="weather">{data.weather? data.weather[0].description : undefined} </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main? data.main.feels_like.toFixed(0) : null}
            <p>Ощущается как</p>
          </div>
          <div className="humidity">
            {data.main? data.main.humidity : null}
            <p>Влажность %</p>
          </div>
          <div className="wind">
            {data.wind? data.wind.speed.toFixed() : null}
            <p>Скорость ветра км/ч</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
