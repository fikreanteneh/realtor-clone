import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Spinner } from "./Spinner"

export const PrivateRoute = ({routeType}) => {

  const {currentUser, authStatus, authError} = useSelector(state => state.auth)
  
  const location = useLocation()
  if (authStatus === 'loading') {
    return <Spinner/>
  }
  
  const routeTypes = {
    "private" : currentUser ? <Outlet/> : <Navigate to="signin" state={{from: location}} replace/>,
    "public": !currentUser ? <Outlet/> : <Navigate to="/profile" state={{from: location}} replace/>
  }

   return routeTypes[routeType]

}