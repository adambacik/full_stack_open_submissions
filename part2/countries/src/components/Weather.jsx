import { useEffect, useState } from 'react'
import Photo from './Photo'
import weatherServices from '../services/weather'

const Weather = ({city}) => {
    const [temp, setTemp] = useState('')
    const [icon, setIcon] = useState('')
    const [wind, setWind] = useState('')

    weatherServices
        .getWeather(city)
        .then(response => {
            setTemp(response.data.main.temp)
            setIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
            setWind(response.data.wind.speed)
        })

    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>Temperature {temp} Celsius</p>
        <Photo source={icon}/>
        <p>Wind {wind} m/s</p>
      </div>
    )
}

export default Weather