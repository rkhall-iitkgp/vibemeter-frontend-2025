import { Navigate, Route, Routes } from "react-router";
import { LandingPage, LoginPage } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import ChatPage from "./components/Chat";


function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <>
      <Routes>
         {/* <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
        /> */}
		<Route
          path="/"
          element={<ChatPage />}
        />
      </Routes>
    </>
  );
}

export default App;
