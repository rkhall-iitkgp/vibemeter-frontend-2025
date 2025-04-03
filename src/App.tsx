import { Navigate, Route, Routes } from "react-router";
import { DashboardPage, LoginPage,Graph, AdminDashboard  } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import FocusGroupPage from "./pages/FocusGroupPage";
import AdminLayout from "./components/AdminLayout";
import EmployeeList from "./pages/employeeList";
import Questions from "./pages/Questions";

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
        <Route path="/questions" element={<AdminLayout><Questions /></AdminLayout>} />
        <Route path="/focus-groups" element={<AdminLayout><FocusGroupPage /></AdminLayout>} />
        <Route path="/focus-groups/:id" element={<AdminLayout><FocusGroupPage /></AdminLayout>} />
        <Route path="/employees" element={<AdminLayout><EmployeeList /></AdminLayout>} />
      </Routes>
      
    </>
  );
}

export default App;
