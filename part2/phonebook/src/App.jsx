import { useEffect, useState } from 'react'
import Note from './componenst/Note'
import axios from 'axios'
import personServices from './services/persons'
import './index.css'

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({addPerson, newName, newNumber, onChangeName, onChangeNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={onChangeName}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={onChangeNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <div>
      {personsToShow.map((person) => <Note key={person.name} person={person} deletePerson={() => deletePerson(person.id)}/>)}
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null)
    return null

  const messageStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null)
    return null

  const messageStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newNotification, setNotification] = useState(null)
  const [newErrorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personServices
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  let personsToShow = []

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.find(item => (item.name === newName) || (item.number === newNumber)))
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personUpdate = persons.find(person => person.name == newName)
        personServices
          .update(personUpdate.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== personUpdate.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setNotification(`Successfully updated ${newName}`)
            setTimeout(() => {
              setNotification(null)
            }, 4000)
          }
          )
      }
    }
    else
    {
      personServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNotification(`Successfully added ${newName}`)
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
    }
  }

  const handNoteChangeName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handNoteChangeNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handNoteChangeSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete person with id: ${id}`)) {
      personServices
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(`Information of person with id ${id} has already been removed from server`)
        setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
      })
    }
  }

  if (newSearch === '')
  {
    personsToShow = persons
  }
  else
  {
    personsToShow = persons.filter(person => person.name === newSearch)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification}/>
      <Error message={newErrorMessage}/>
      <Filter value={newSearch} onChange={handNoteChangeSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} onChangeName={handNoteChangeName} onChangeNumber={handNoteChangeNumber}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App