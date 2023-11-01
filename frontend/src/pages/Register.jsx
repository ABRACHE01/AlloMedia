import { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  role: Yup.string().required('Role is required'),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message?.error) {
      if (Array.isArray(message.error)) {
        message.error.forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      } else {
        toast.error(message.error);
      }
    }

    if (message?.message) {
      toast.success(message.message);
      navigate('/login')
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, dispatch]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    repeat_password: '',
    profileImage: null,
    role: '',
  };

  const onSubmit = (values) => {
    dispatch(register(values));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUserPlus /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <div className='form-group'>
              <Field type='text' className='form-control' id='name' name='name' placeholder='Enter your name' />
              <ErrorMessage name='name' component='div' className='error' />
            </div>

            <div className='form-group'>
              <Field type='email' className='form-control' id='email' name='email' placeholder='Enter your email' />
              <ErrorMessage name='email' component='div' className='error' />
            </div>

            <div className='form-group'>
              <Field type='password' className='form-control' id='password' name='password' placeholder='Enter password' />
              <ErrorMessage name='password' component='div' className='error' />
            </div>

            <div className='form-group'>
              <Field
                type='password'
                className='form-control'
                id='repeat_password'
                name='repeat_password'
                placeholder='Confirm password'
              />
              <ErrorMessage name='repeat_password' component='div' className='error' />
            </div>

            <div className='form-group'>
              <input type='file' className='form-control' id='profileImage' name='profileImage' onChange={(event) => {
                setFieldValue('profileImage', event.currentTarget.files[0]);
              }} />
              <ErrorMessage name='profileImage' component='div' className='error' />
            </div>

            <div className='form-group'>
              <Field as='select' className='form-control' id='role' name='role'>
                <option value=''>-- Choose a role --</option>
                <option value='Client'>Client</option>
                <option value='Deliver'>Deliver</option>
              </Field>
              <ErrorMessage name='role' component='div' className='error' />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
}

export default Register;