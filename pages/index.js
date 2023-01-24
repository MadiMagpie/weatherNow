import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
import { Flex } from '../components/Flex'
import { Button } from '../components/Button'

export default function Home() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  var apiKey = '8f27473615b4b96bf5c992ff65abb17b';
  var lang = 'en';
  var units = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;

  const searchLocation = (event) =>{
    if (event.key === 'Enter'){
      axios.get(url)
      .then((res) => {
        console.clear();
        setData(res.data);
        console.log(res.data);
        setWeather(res.data.weather);
        setLoaded(true);
      }).catch((err) => {
        console.log(err);
        setErrorMsg('Please enter another location');
        setData('');
        setWeather('');
      }) 
      setLocation('');
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.topTitle}>{data.name} weather. Right now.</span>
        <Flex padding = '2.5em 0 0 0' gap = '1rem' dir = 'row'>
          <input 
          className = {styles.input}
          value = {location}
          onChange = {event => setLocation(event.target.value)}
          placeholder = 'Enter a city'
          onKeyDown = {searchLocation}
          type = 'text'
        />
        <Button size = 'short' label = 'Submit'></Button>
        </Flex>
      </header>
      <main className={styles.main}>
        {errorMsg}
        
        <Flex dir = 'row'>
          <span className = {styles.temp}>{loaded ? data.main.temp : '-'}</span>
          <span className = {styles.tempUnits}>°C</span> 
        </Flex>
        {!loaded && <p className = {styles.error}> Enter a city to start.</p>}

        
        
        {weather && weather.map((w, index) => {
          return (
            <Flex dir = 'row'
            key = {index}>
              <span className = {styles.weather}>{w.main}</span>
              <span className = {styles.separator}>.</span>
              <span className = {styles.weather}>{w.description}</span>
            </Flex>
          )
        })}
        <Flex gap = '3rem' align = 'stretch' dir = 'row'>
          <div className = {styles.sketchy}>
            <p className = {styles.title}> Feels like </p>
            <Flex dir ='row'>
              {loaded ? <span className = {styles.description}>{data.main.feels_like}</span>  : <span className = {styles.description}>-</span>}
              <span className = {styles.units}>°C</span> 
            </Flex>
          </div>
          <div className = {styles.sketchy}>
            <p className = {styles.title}> Wind</p> 
            <Flex dir ='row'>
              {loaded ? <span className = {styles.description}>{data.wind.gust} </span> : <span className = {styles.description}>-</span>}
                <span className = {styles.units}> m/s</span> 
            </Flex>
          </div>
          <div className = {styles.sketchy}>
            <p className = {styles.title}> Humidity </p> 
            <Flex dir ='row'>
              {loaded ? <span className = {styles.description}>{data.main.humidity}</span> : <span className = {styles.description}>-</span>}
              <span className = {styles.units}>%</span> 
            </Flex>
          </div>
        </Flex>
      </main>
    </div>
  )
}