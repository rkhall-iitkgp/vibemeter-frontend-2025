import { Navigate, Route, Routes } from "react-router";
import { DashboardPage, LoginPage,Graph, AdminDashboard  } from "./pages";
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
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/graph" element= {<Graph/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/focus-group" element={<FocusGroupPage />} />
        <Route path="/focus-group/:id" element={<FocusGroupPage />} />
      </Routes>
      
    </>
  );
}

export default App;
