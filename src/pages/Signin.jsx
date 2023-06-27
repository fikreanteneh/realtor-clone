import { useState } from 'react'
import AuthBackground from '../assets/images/AuthBackground.png'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { signinWithEmail, signinWithGoogle, signup } from '../redux/auth'


export const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.auth)
    if (currentUser) navigate('/')

    const [formData, setFormData] = useState({email: "", password: ""})
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) =>{
        const {id, value} = e.target
        setFormData((oldData) => ({...oldData, [id]: value }))
    }

    const handleSubmit = (e, kind) =>{
        e.preventDefault()
        if(kind === 'email') dispatch(signinWithEmail(formData))  
        else dispatch(signinWithGoogle())  
    }


  return (
    <section>
        <h1 className='font-bold text-6xl text-center my-[0.5em]'>Sign In</h1>
        <div className='p-3 flex justify-center flex-wrap items-center max-w-6xl mx-auto'>
            <div className='md:w-[67%] lg:w-[50%]'>
                <img src={AuthBackground} className='w-full rounded-2xl'></img>
            </div>
            <div className='md:w-[67%] lg:w-[50%] '>
                <form className='lg:ml-10'>
                    <input className='w-full px-2 py-2 rounded text-l my-2' type='email' placeholder='E - mail' id='email' value={formData.email} onChange={handleChange}></input>
                    <input className='w-full px-2 py-2 rounded text-l my-2' type={showPassword ? 'text': 'password'} placeholder='Password' id='password' value={formData.password} onChange={handleChange}></input>
                    <div className='flex justify-between items-center my-2'>
                        <p>Don't have an account? <Link to='/signup' className='text-blue-500 hover:text-blue-800'>Register</Link></p>
                        <p><Link to="/forgotpassword" className='text-blue-500 hover:text-blue-800'> Forgot Password?</Link></p>
                    </div>
                    <button className='rounded w-full bg-blue-600 text-white py-3 px-3 my-2 hover:bg-blue-700' type='submit' onClick={(e) => handleSubmit(e, "email")}>Sign In</button>
                    <div>
                        <p className='text-center font-semibold'>OR</p>
                    </div>
                    <button className='rounded w-full bg-red-600 text-white py-3 px-3 my-2 hover:bg-red-700 flex justify-center items-center' onClick={handleSubmit(e, "google")}><FcGoogle className='bg-white text-2xl rounded-full mr-2'/>Countinue with Google</button>

                </form>

            </div>
        </div>
    </section>
  )
}
