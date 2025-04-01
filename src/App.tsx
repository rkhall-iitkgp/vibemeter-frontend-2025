import { Navigate, Route, Routes } from "react-router";
import { LandingPage, LoginPage, TestPage } from "./pages";
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
        <Route
          path="/morale"
          element={<TestPage />}
        />
      </Routes>
    </>
  );
}

export default App;
