import { useSelector  } from 'react-redux';
import Spinner from '../components/Spinner';
import {Card, CardBody} from "@nextui-org/react";


const UserProfile = () => {

  const {  isLoading } = useSelector((state) => state.auth);
  const   user  = useSelector((state) => state.auth?.user?.userPayload)

  return (
    <>
    {isLoading && <Spinner />}
    <div className="flex flex-col justify-center items-center h-[30rem] bg-gray-50 " >
    <Card>
      <CardBody>
      <h1><span className="font-bold text-large">User Name :</span>  {user.name} .</h1>
      <h1> <span className="font-bold text-large">User Email :</span> {user.email} .</h1>
      <h2> <span className="font-bold text-large">User Role :</span> {user.role.name} .</h2>
      <h2> <span className="font-bold text-large">Email verification :</span> Your email {user.isEmailVerified ? "is verified" : "is not verified" } .</h2>
      </CardBody>
    </Card>
    </div>
    </>
  );
}

export default UserProfile