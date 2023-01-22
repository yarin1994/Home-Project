import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationFrom from "./components/RegistrationFrom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import NavBar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/main" element={<HomePage />} />
        <Route path="/signup" element={<RegistrationFrom />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
