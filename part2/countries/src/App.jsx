import { useEffect, useState } from 'react'
import Note from './components/Note'
import Extended from './components/Extended'
import noteServices from './services/countries'

const Search = ({value, onChange}) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange}/>
    </div>
  )
}

const Countries = ({countriesToShow, showCountry}) => {
  if (countriesToShow.length > 10) {
    return <div><p>Too many matches, specify another filter</p></div>
  }
  else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
    return (
    <div>
      <ul>
        {countriesToShow.map(country => <Note key={country.tld} value={country.name.common} showExtended={() => showCountry(country)}/>)}
      </ul>
    </div>
    )
  }
  else if (countriesToShow.length === 1){
    return (
      <div><Extended country={countriesToShow[0]}/></div>
    )
  }
  else {
    return <p>No mathces found</p>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [newShow, setNewShow] = useState(null)

  let countriesToShow = []
  useEffect(() => {
    noteServices
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handNoteChangeSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  if (newSearch === '')
  {
    countriesToShow = countries
  }
  else
  {
    countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    console.log(countries)
  }

  return (
    <div>
      <Search value={newSearch} onChange={handNoteChangeSearch} />
      <Countries countriesToShow={countriesToShow} showCountry={(country) => setNewShow(country)}/>
      <Extended country={newShow}/>
    </div>
  )
}

export default App