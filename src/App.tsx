import { Navigate, Route, Routes } from "react-router";
import { DashboardPage, LoginPage } from "./pages";
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
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
      
    </>
  );
}

export default App;
