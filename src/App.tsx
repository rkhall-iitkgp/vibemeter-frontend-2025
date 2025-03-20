import { Navigate, Route, Routes } from "react-router";
import { LandingPage, LoginPage, SkeletonPage} from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
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
          path="/skeleton"
          element={<SkeletonPage />} 
        />
      </Routes>
    </>
  );
}

export default App;
