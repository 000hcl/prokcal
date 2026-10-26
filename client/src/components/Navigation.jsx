import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { useContext } from "react"

const Navigation = () => {
  const { user } = useContext(UserContext)
  return (
    <div>
      <Link to={'/'}>home </Link> | 
      {!user &&
        <>
          <Link to={'/login'}>log in </Link> | 
          <Link to={'register'}>register</Link> | 
        </>
      }
      <Link to={'/foods'}>foods </Link> | 
      {user &&
        <>
        <Link to={'/newgoal'}>new goal </Link> | 
        <Link to={'/addfood'}>add new food</Link> | 
        <Link to={'/addpreset'}>add preset</Link> | 
        </>
      }
    </div>
  )
}

export default Navigation