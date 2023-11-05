import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {  reset } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Dashboard() {
  const dispatch = useDispatch();

  const {  isLoading, message } = useSelector((state) => state.auth);
  const   user  = useSelector((state) => state.auth?.user?.userPayload)

  if (message?.message ) {
    toast.success(message.message);
    dispatch(reset());
    }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col justify-center items-center h-[30rem] bg-gray-50 " >
      <h1>Welcome, {user.name}!</h1>
      <h2>you're, an {user.role.name}!</h2>
    </div>
  );
}