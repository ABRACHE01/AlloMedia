import { useSelector  } from 'react-redux';
import Spinner from '../components/Spinner';

const UserProfile = () => {

  const {  isLoading } = useSelector((state) => state.auth);
  const   user  = useSelector((state) => state.auth?.user?.userPayload)
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col justify-center items-center h-[30rem] bg-gray-50 " >
      <h1>Full name : {user.name}</h1>
      <h1> {user.role.name} email : {user.email}</h1>
      <h2>Role : {user.role.name}</h2>
      <h2>email verification : Your email {user.isEmailVerified ? "is verified" : "is not verified" }</h2>
    </div>
  );
}

export default UserProfile