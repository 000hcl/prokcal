import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <div>
      <Link to={'/'}>home </Link> | 
      <Link to={'/login'}>log in </Link> | 
      <Link to={'register'}>register</Link> | 
      <Link to={'/newgoal'}>new goal </Link> | 
      <Link to={'/foods'}>foods </Link> | 
      <Link to={'/addfood'}>add new food</Link> | 
      <Link to={'/addpreset'}>add preset</Link> | 
    </div>
  )
}

export default Navigation