import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import CodeIn from "./pages/CodeIn.jsx";
import Home from "./pages/Home.jsx";
import HomePage from "./pages/Insights.jsx";
import Login from "./pages/Login";
import ReviewPage from "./pages/ReviewPage.jsx";
import Signup from "./pages/signUp.jsx";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home/review"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/review/:reviewId"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/codein"
          element={
            <ProtectedRoute>
              <CodeIn />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;