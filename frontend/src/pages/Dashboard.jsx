import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import {  reset } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import {Card, CardBody} from "@nextui-org/react";

export default function Dashboard() {
  const dispatch = useDispatch();

  const {  isLoading, message } = useSelector((state) => state.auth);
  const   user  = useSelector((state) => state.auth?.user?.userPayload)

  if (message?.message ) {
    toast.success(message.message);
    dispatch(reset());
    }


  return (
    <>
    {isLoading && <Spinner />}
    <div className="flex flex-col justify-center items-center h-[30rem] bg-gray-50 " >

    <Card>
      <CardBody>
      <h1 className="font-bold text-large">Welcome, {user.name}!</h1>
      <h2 className="font-bold text-large">you're, a {user.role.name}!</h2>
      </CardBody>
    </Card>
    </div>
    </>  
  );
}