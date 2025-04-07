import { DashboardPage, Graph, AdminDashboard } from "./pages";
import ActionPlanDetails from "./pages/ActionPlanDetails";
import FocusGroupPage from "./pages/FocusGroupPage";
import ActionPlanPage from "./pages/ActionPlanPage";
import AdminLayout from "./components/AdminLayout";
import EmployeesPage from "./pages/EmployeesPages";
import SurveysPage from "./pages/SurveysPage";
import PersonaPage from "./pages/PersonaPage";
import { Route, Routes } from "react-router";
import Questions from "./pages/Questions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PersonaPage />} />
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
              <EmployeesPage />
            </AdminLayout>
          }
        />
        <Route
          path="/action-plan"
          element={
            <AdminLayout>
              <ActionPlanPage />
            </AdminLayout>
          }
        />
        <Route
          path="/action-plan/:actionId"
          element={
            <AdminLayout>
              <ActionPlanDetails />
            </AdminLayout>
          }
        />
        <Route
          path="/surveys"
          element={
            <AdminLayout>
              <SurveysPage />
            </AdminLayout>
          }
        />
        <Route
          path="/surveys/:survey_id"
          element={
            <AdminLayout>
              <SurveysPage />
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
