import { useState } from 'react'

const Heading = (props) => {
  return <h1>{props.text}</h1>
}

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {all}</p>
      <p>average {(props.good + -1 * props.bad) / all}</p>
      <p>positive {100 / all * props.good} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
  }
  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Heading text="give feedback"/>
      <Button onClick={addGood} text="good"/>
      <Button onClick={addNeutral} text="neutral"/>
      <Button onClick={addBad} text="bad"/>
      <Heading text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App