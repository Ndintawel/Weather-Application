import React, { useState } from 'react'
import './WeatherApp.css'

import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import snow from '../Assets/snow.png';
import storm from '../Assets/storm.png';
import sun from '../Assets/sun.png';
import wind from '../Assets/wind.png';
import cloud from '../Assets/cloudy.png';

const WeatherApp = () => {

   let api_key="87a5076f013373370e5b265967e697e3";
   
   const[wicon,setWicon]=useState(cloud);

   const search = async () =>{
    const element=document.getElementsByClassName("cityInput")
    if(element[0].value===""){
      return 0;
    }
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

  let response=await fetch(url); 
  let data=await response.json();
  const humidity=document.getElementsByClassName("humidity-percent");
  const wind=document.getElementsByClassName("wind-rate");
  const temperature=document.getElementsByClassName("weather-temp");
  const location=document.getElementsByClassName("weather-location");

  humidity[0].innerHTML=data.main.humidity+" %";
  wind[0].innerHTML=data.wind.speed+" km/h";
  temperature[0].innerHTML=data.main.temp+"°C";
  location[0].innerHTML=data.name;

  if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
    setWicon(sun);
  }
  else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
    setWicon(cloud);
  }
  else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
    setWicon(drizzle);
  }
  else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
    setWicon(drizzle);
  }
  else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
    setWicon(storm);
  }
  else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
    setWicon(storm);
  }
  else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
    setWicon(snow);
  }
  else{
    setWicon(sun);
  }
   }

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search'/>
        <button class="top-bar-button" onClick={()=>{search()}}>Submit</button>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" className="mainIcon"/>
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
       <div className="element">
         <img src={humidity} alt="" className="icon"/>
         <div className="data">
          <div className="humidity-percent">64%</div>
          <div className="text">Humidity</div>
         </div>
      </div>
      <div className="element">
         <img src={wind} alt="" className="icon"/>
         <div className="data">
          <div className="wind-rate">18 km/h</div>
          <div className="text">Wind Speed</div>
         </div>
      </div>
      </div>
    </div>
  )
}

export default WeatherApp
