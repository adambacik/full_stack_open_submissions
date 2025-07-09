const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Total = (props) => {
  const initial = 0
  const total = props.parts.reduce((accumulator, part) => accumulator + part.exercises, initial)
  return (
    <div>
      <h3>total of {total} exercises</h3>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total parts={course.parts}/>
    </div>    
  )
}

export default Course