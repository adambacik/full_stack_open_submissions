const Note = ({value, showExtended}) => {
  return (
    <li>
      {value}
      <button onClick={showExtended}>Show</button>  
    </li>
  )
}

export default Note