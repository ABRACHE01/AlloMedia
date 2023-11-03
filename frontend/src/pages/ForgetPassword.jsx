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
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Please enter your email
              </h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="space-y-4 md:space-y-6" >
            <div className='form-group'>
              <Field type='email' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"id='email' name='email' placeholder='Enter your email' />
              <ErrorMessage name='email' component='div' className='error' />
            </div>

            <div className='form-group'>
              <button type='submit' className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        </div>
      </div>
  </div>
</section>
    </>
  );
}