import Photo from './Photo'
import Weather from './Weather'

const Extended = ({country}) => {
  if (country === null)
    return

  return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>{Object.values(country.languages).map(lang => <li>{lang}</li>)}</ul>
        <Photo source={country.flags.png}/>
        <Weather city={country.capital}/>
      </div>
    )
}

export default Extended