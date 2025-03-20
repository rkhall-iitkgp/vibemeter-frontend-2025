import { Navigate, Route, Routes } from "react-router";
import { LandingPage, LoginPage } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
        />
        <Route path="/calender" element={<LoginPage />} />
        <Route path="/task" element={<LoginPage />} />
        <Route path="/profile" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
