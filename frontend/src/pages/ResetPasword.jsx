
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { resetLogedPass, reset } from "../features/auth/authSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('old password is required'),
  newPassword: Yup.string().required('New password is required'),
  repeat_newPassword: Yup.string()
    .required('Confirm new password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

export default function ResetPasword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user , isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

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
      navigate('/dashboard')
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    repeat_newPassword: '',
  };

  const onSubmit = (values) => {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      repeat_newPassword: values.repeat_newPassword,
      token: token,
      role: user?.userPayload.role.name
    };
    dispatch(resetLogedPass(data));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Set New Password</h1>
        <p>Please fill in the following fields</p>
      </section>

      <section className='form'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <div className='form-group'>
              <Field
                type='password'
                className='form-control'
                id='oldPassword'
                name='oldPassword'
                placeholder='Enter the old password'
              />
              <ErrorMessage name='oldPassword' component='div' className='error' />
            </div>

            <div className='form-group'>
              <Field
                type='password'
                className='form-control'
                id='newPassword'
                name='newPassword'
                placeholder='Enter new password'
              />
              <ErrorMessage name='newPassword' component='div' className='error' />
            </div>

            <div className='form-group'>
              <Field
                type='password'
                className='form-control'
                id='repeat_newPassword'
                name='repeat_newPassword'
                placeholder='Confirm new password'
              />
              <ErrorMessage name='repeat_newPassword' component='div' className='error' />
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