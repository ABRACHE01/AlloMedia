import { useState, useEffect } from 'react';
import { FaLockOpen } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendEmforgetPass, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

export default function ForgetPassword() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [isError, isSuccess, message, dispatch]);

  const initialValues = {
    email: '',
  };

  const onSubmit = (values) => {
    const userData = {
      email: values.email,
    };
    dispatch(sendEmforgetPass(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaLockOpen /> Forget Password
        </h1>
        <p>Write your email</p>
      </section>

      <section className='form'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <div className='form-group'>
              <Field type='email' className='form-control' id='email' name='email' placeholder='Enter your email' />
              <ErrorMessage name='email' component='div' className='error' />
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