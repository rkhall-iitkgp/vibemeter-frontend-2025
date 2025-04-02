import { Navigate, Route, Routes } from "react-router";
import { LandingPage, LoginPage } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import FocusGroupPage from "./pages/FocusGroupPage";
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
      <Route path="/focus-group" element={<FocusGroupPage />} />
      <Route path="/focus-group/:id" element={<FocusGroupPage />} />
      <Route path="/employee" element={<div>Employee Page (Empty for now)</div>} />
      <Route path="/overall" element={<div>Overall Page (Empty for now)</div>} />
      </Routes>
    </>
  );
}

export default App;
