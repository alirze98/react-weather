import React, { useState } from 'react';
import './index.css';

const api = {
  key:"bcfa29858f6573b7d807f073ded53547",
  base:"http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({})

  const dateBuilder = (d)=>{
    var mos=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     
    const year = d.getFullYear();
    const day = days[d.getDay()];
    const month = mos[d.getMonth()];
    const date = d.getDate()

    return `${day} ${date} ${month} , ${year} ` 
  }
  

  const search = (evt)=>{
   if(evt.key === "Enter"){
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(res=>res.json())
     .then(result=>{
       setWeather(result);
       setQuery('');
       console.log(result)
       
     });
      
     
   }
   
  }

  

  return (
    <div className={(typeof weather.main !="undefined")?((weather.main.temp>15)?'app warm':'app'):'app'} >
      <main className='main'>
      <div className="search-box">
        <input type="text" placeholder="search..." className='search-bar' value={query} onChange={(e)=>setQuery(e.target.value)} onKeyPress={search} />
      </div>
      {(typeof weather.main != "undefined")?(
        <div>
      <div className='location-box'>
        <div className='location'>{weather.name}, {weather.sys.country}</div>
        <div className='date'>{dateBuilder(new Date())}</div>
      </div>

      <div className='weather-box'>
        <div className='temp'>{Math.round(weather.main.temp)}°C </div>
        <div className='feel'>feels like  {Math.round(weather.main.feels_like)}°C</div>
        <div className='weather'>{weather.weather[0].main}</div>
        <div className='humidity'>humidity index {weather.main.humidity}</div>

      </div>
      </div>
      ):('')}
      </main>
    </div>
  );
}

export default App;
