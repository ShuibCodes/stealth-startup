import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CodepenApp from "./components/CodepenApp";
import NewProjectApp from "./components/NewProjectApp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>loading...</div>;

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <nav className="h-[50px] border flex items-center px-3 gap-2">
      {user ? (
        <>
          <Link to="/dashboard">
            <div className="border rounded p-1">Dashboard</div>
          </Link>
          <button className="border rounded p-1" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <div className="border rounded p-1">Login</div>
          </Link>
          <Link to="/signup">
            <div className="border rounded p-1">Sign Up</div>
          </Link>
        </>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <CodepenApp />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-project"
              element={
                <ProtectedRoute>
                  <NewProjectApp />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
