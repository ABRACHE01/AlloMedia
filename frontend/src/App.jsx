import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import React from "react";
import AppRoutes from "./Routes";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
