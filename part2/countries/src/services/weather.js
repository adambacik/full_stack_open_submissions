import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (city) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
  )
}

export default {
  getWeather
}
