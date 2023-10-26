import {useState , useEffect} from "react"
import { toast } from 'react-toastify'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import {register , reset } from '../features/auth/authSlice'
import Spiner from '../components/Spinner' 




export default function Register(){

  const [formData , setFormData ] = useState({
    name:'',
    email: '',
    password:'',
    repeat_password:'',
    profileImage:null,
    role:'',
  })

const {name , email , password , repeat_password , role , profileImage } = formData

const navigate = useNavigate()
const dispatch = useDispatch()

const {user , isLoading , isError , isSuccess , message } = useSelector(
  (state)=> state.auth
)

//sideEffect

useEffect(()=>{
  if(isError){
    toast.error(message)
  }
  if(isSuccess || user ){
    navigate('/login')
  }
  dispatch(reset())

},[user , isLoading , isError , isSuccess , message , navigate ,dispatch ])

//methodes 
const onChange =(event)=> {

  setFormData((prevFormData)=>{
    
    return {
      ...prevFormData , 
      [event.target.name] : event.target.value
    }
  })

}

const onChangeFile = (event) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    [event.target.name]: event.target.files[0], 
  }));
};

const onSubmit=(event)=> {
  event.preventDefault()
  if(password !== repeat_password){
    toast.error('passwords do not match')
  }else{

    const userData = {
      name ,
      email,
      password,
      repeat_password,
      profileImage,
      role
    }
    console.log(userData)
      dispatch(register(userData))
  }
}

if(isLoading){
      return <Spiner/>
}
  return (
    <>
    <section className='heading'>
      <h1>
       Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form  onSubmit={onSubmit}>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='repeat_password'
            name='repeat_password'
            value={repeat_password}
            placeholder='Confirm password'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='file'
            className='form-control'
            id='profileImage'
            name='profileImage'
            onChange={onChangeFile}
          />
        </div>

        <div className='form-group'>
            <select 
                id="role"
                className='form-control'
                value={role}
                onChange={onChange}
                name="role"
            >
                <option value="">-- Choose a role --</option>
                <option value="Client">client</option>
                <option value="Deliver">deliver</option>
            </select>
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>

      </form>
    </section>
  </>
  )
}