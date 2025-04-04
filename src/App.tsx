import { DashboardPage, LoginPage, Graph, AdminDashboard } from "./pages";
import UnderConstruction from "./pages/UnderConstruction";
import { Navigate, Route, Routes } from "react-router";
import FocusGroupPage from "./pages/FocusGroupPage";
import AdminLayout from "./components/AdminLayout";
import ActionPlan from "./pages/ActionPlan";
import Questions from "./pages/Questions";
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
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/graph" element={<Graph />} />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/questions"
          element={
            <AdminLayout>
              <Questions />
            </AdminLayout>
          }
        />
        <Route
          path="/focus-groups"
          element={
            <AdminLayout>
              <FocusGroupPage />
            </AdminLayout>
          }
        />
        <Route
          path="/focus-groups/:id"
          element={
            <AdminLayout>
              <FocusGroupPage />
            </AdminLayout>
          }
        />
        <Route
          path="/employees"
          element={
            <AdminLayout>
              <UnderConstruction />
            </AdminLayout>
          }
        />
        <Route
          path="/action-plan"
          element={
            <AdminLayout>
              <ActionPlan />
            </AdminLayout>
          }
        />
        <Route
          path="/initiatives"
          element={
            <AdminLayout>
              <UnderConstruction />
            </AdminLayout>
          }
        />
        <Route
          path="/surveys"
          element={
            <AdminLayout>
              <UnderConstruction />
            </AdminLayout>
          }
        />
        <Route
          path="/help-center"
          element={
            <AdminLayout>
              <UnderConstruction />
            </AdminLayout>
          }
        />
        <Route
          path="/hr-policies"
          element={
            <AdminLayout>
              <UnderConstruction />
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
