import { BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import React from 'react';
import AppRoutes from './Routes';
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
        <AppRoutes/>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
