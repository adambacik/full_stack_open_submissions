const Note = ({ person, deletePerson }) => {
  return <p>{person.name} {person.number}
            <button onClick={deletePerson}>delete</button>
          </p>
}

export default Note