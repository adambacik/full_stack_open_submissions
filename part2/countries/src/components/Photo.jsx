const Photo = ({source}) => {
  if (source !== '')
    return <img src={source} width={150}></img>
}

export default Photo