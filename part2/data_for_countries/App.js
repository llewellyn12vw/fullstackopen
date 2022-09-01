import { useState, useEffect } from 'react'
import axios from 'axios'


const Box = ({text,val,change}) => {
  return(
        <div>
          {text}<input 
            value = {val}
            onChange = {change}/>
        </div>
  )
}
const Weather = ({city}) => {

  const api_key = process.env.REACT_APP_API_OPENWEATHER
  const [weather,setWeather] = useState([])
  console.log(weather)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then(response => {
         setWeather(response.data)

      })
  }, [])
  
  return(
    (weather.main?(<div>
      <h2>Weather in {city[0]}</h2>
      <h4>temperature: {weather.main.temp} *C</h4>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <h5>wind {weather.wind.speed} m/s</h5>

    </div>):null)
  )
}

const Filter = ({data,nam,select}) => {

  if (nam.length===0){
    return(
      <></>
    )
  }
  
  else{
    const filt = data.filter(n => {
      if(n.name.common.toLowerCase().includes(nam)){
        return n
      }
      else if(n.name.common.includes(nam)){
        return n
      }
    
    })
    console.log(filt)
    if(filt.length === 1){
      return(
        <>
          <Show country = {filt[0]}/>
        </>
      )
    }
    if(filt.length>10){
      return <p>Too many matches</p>
    }
    return filt.map(cnt => <li key = {cnt.name.common}>{cnt.name.common} <button onClick = {() => select(cnt.name.common)}>select</button></li>)
  }
}
const Show = ({country}) => {
    return(
      <div>
      <h1>{country.name.common}</h1>
      <h2>capitals</h2>
      <p>{Object.keys(country.capital).map(key => <li key = {country.capital[key]}>{country.capital[key]}</li>)}</p>
      <p>{country.area}</p>
      <h2>languages</h2>
      <p>{Object.keys(country.languages).map(key => <li key = {country.languages[key]}>{country.languages[key]}</li>)}</p>
      <img src = {country.flags["png"]}/>
      <Weather city = {country.capital}/>
      </div>

    )
}


const App = () => {
  
  const [data,setData] = useState([])
  const [name,setName] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
         setData(response.data)
      })
  }, [])
  console.log("D")
  const handleSearch = (event)=> {
    setName(event.target.value)
  } 

  return (
    <div>          
      <Box text = "search" val = {name} change = {handleSearch}/>
      <Filter data = {data} nam = {name} select = {setName}/>
    </div>

  )
}
export default App