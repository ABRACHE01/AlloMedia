import { FaSignInAlt , FaSignOutAlt, FaUser ,FaLockOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { logout , sendEmResetPass  } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Header() {

const { user } = useSelector((state) => state.auth);
const role = user?.userPayload.role.name
const profile = `user/${role}/me`

  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success('logged out successfuly')

  };
  
 const  handleSendemailForreset = () =>{

   dispatch(sendEmResetPass(role));

}


  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>alloMedia</Link>
      </div>
      <ul>
        {user ? (
          <>
           <li>
               <Link className='btn' to={profile}>
                <FaUser /> Profile 
              </Link>
          </li>
           <li>
            <button className='btn' onClick={handleSendemailForreset}  >
                 reset password
            </button>
          </li>
          <li>
            <button className='btn' onClick={handleLogout} >
              <FaSignOutAlt /> Logout
            </button>
          </li>
         
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
            <li>
              <Link to='/forgetPassword'>
                <FaLockOpen/> forgot Password
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
