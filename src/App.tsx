import { Navigate, Route, Routes } from "react-router";
import { LandingPage, LoginPage, Register } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
