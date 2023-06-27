import { Route, createBrowserRouter, createRoutesFromElements,Outlet, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Offers } from './pages/Offers';
import { Profile } from './pages/Profile';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { ForgotPassword } from './pages/ForgotPassword';
import { Header } from './components/Header';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/auth';




export const Root = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user))
    })
  })

  return (
      <div className='main'>
          <Header/>
          <main>
              <Outlet />
          </main>

      </div>

  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path='offers' element = {<Offers/>} />
        <Route path='profile' element = {<Profile/>}/>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
      </Route>
      

    </>
  )
)





function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
