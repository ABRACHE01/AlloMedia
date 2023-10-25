import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
   {user.message}
    </>
  )
}

export default Dashboard