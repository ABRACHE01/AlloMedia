import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgetPassword from './pages/ForgetPassword';
import Setpassword from './pages/SetPassword';
import Resetpassword from './pages/ResetPasword';
import LandingPage from './pages/LandingPage.jsx';
import Page404 from './pages/Page404.jsx';
import UserProfile from './pages/UserProfile.jsx';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.userPayload?.role?.name;

  const isRoleAllowed = allowedRoles.includes(userRole);

  return isRoleAllowed ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

const publicRoutes = [
  {
    path: '/',
    element: <LandingPage />,
    restricted: false,
  },
  {
    path: '/login',
    element: <Login />,
    restricted: true,
  },
  {
    path: '/register',
    element: <Register />,
    restricted: true,
  },
  {
    path: '/forgetPassword',
    element: <ForgetPassword />,
    restricted: true,
  },
  {
    path: '/setpassword',
    element: <Setpassword />,
    restricted: true,
  },
  {
    path: '/resetpassword',
    element: <Resetpassword />,
    restricted: true,
  },
];

function AppRoutes() {
  const {  user , isAuth } = useSelector((state) => state.auth);
  const userDashboard = `/user/${user?.userPayload.role.name}/dashboard`
  return (
    <Routes>
      
     {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.restricted  && isAuth ? (
              <Navigate to={userDashboard} />
            ) : (
              route.element
            )
          }
        />
      ))}

      <Route
        path="/user/Admin/dashboard"
        element={
          <PrivateRoute allowedRoles={['Admin']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/Deliver/dashboard"
        element={
          <PrivateRoute allowedRoles={['Deliver']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/Client/dashboard"
        element={
          <PrivateRoute allowedRoles={['Client']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      
       <Route
        path="/user/Admin/me"
        element={
          <PrivateRoute allowedRoles={['Admin']}>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/Deliver/me"
        element={
          <PrivateRoute allowedRoles={['Deliver']}>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/Client/me"
        element={
          <PrivateRoute allowedRoles={['Client']}>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRoutes;