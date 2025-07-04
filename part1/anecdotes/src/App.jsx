import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Heading = (props) => {
  return <h1>{props.text}</h1>
}

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const Votes = (props) => {
  let index = 0
  for (let i = 0; i < 8; ++i) {
    if (props.votes[i] > props.votes[index])
      index = i
  }

  return (
    <div>
      <Anecdote text={props.anecdotes[index]} votes={props.votes[index]}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))

  const generateNumber = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const vote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Heading text="Anecdote of the day"/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={vote} text="vote"/>
      <Button onClick={generateNumber} text="next anecdote"/>
      <Heading text="Anecdote with most voted"/>
      <Votes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App