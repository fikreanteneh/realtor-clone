import { useState, useEffect } from 'react'
import AuthBackground from '../assets/images/AuthBackground.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../redux/auth'


export const ForgotPassword = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.auth)
    useEffect(() => {
      if (currentUser) navigate('/profile')
  }, [currentUser])


    const [formData, setFormData] = useState({email: ""})

    const handleChange = (e) =>{
        const {id, value} = e.target
        setFormData((oldData) => ({...oldData, [id]: value }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(resetPassword(formData))
        navigate('/signin')
    }


  return (
    <section>
        <h1 className='font-bold text-6xl text-center my-[0.5em]'>Forgot Password</h1>
        <div className='p-3 flex justify-center flex-wrap items-center max-w-6xl mx-auto'>
            <div className='md:w-[67%] lg:w-[50%]'>
                <img src={AuthBackground} className='w-full rounded-2xl'></img>
            </div>
            <div className='md:w-[67%] lg:w-[50%] '>
                <form className='lg:ml-10'>
                    <input className='w-full px-2 py-2 rounded text-l my-2' type='email' placeholder='E - mail' id='email' value={formData.email} onChange={handleChange}></input>
                    <div className='flex justify-between items-center my-2'>
                        <p>Don't have an account? <Link to='/signup' className='text-blue-500 hover:text-blue-800'>Register</Link></p>
                        <p><Link to="/signin" className='text-blue-500 hover:text-blue-800'> Signin</Link></p>
                    </div>
                    <button className='rounded w-full bg-blue-600 text-white py-3 px-3 my-2 hover:bg-blue-700' type='submit' onClick={handleSubmit}>Send Verification</button>
                   
                </form>

            </div>
        </div>
    </section>
  )
}
