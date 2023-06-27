import { NavLink, useLocation } from 'react-router-dom';
import RealtorIcon from '../assets/images/realtor-icon.svg';
import { useSelector } from 'react-redux';


export const Header = () => {
    
    const currentUser = useSelector(state => state.auth.currentUser)
    const location = useLocation();
    const activeStyle = {true: 'py-3 text-black-500 border-b-[3px] border-red-500 font-semibold', false: 'py-3 text-gray-500 hover:text-red-500'}


  return (
    <div className='bg-white border-b shadow-sm sticky z-10'>
        <header className='flex justify-between items-center px-4 max-w-3xl mx-auto'>
            <div>
                <img src={RealtorIcon} className='h-5 cursor-pointer'></img>
            </div> 
            <div>
                <nav className='flex space-x-6'>
                    <NavLink to="/"  className={activeStyle[location.pathname == "/"]}>Home</NavLink>
                    <NavLink to="/offers"  className={activeStyle[location.pathname == "/offers"]}>Offers</NavLink>
                    {currentUser && <NavLink to="/profile"  className={activeStyle[location.pathname == "/profile"]}>Profile</NavLink>}
                    {!currentUser && <NavLink to="/signin"  className={activeStyle[location.pathname == "/signin"]}>Sign In</NavLink>}
                </nav>
            </div>            
        </header>
    </div>
  )
}
