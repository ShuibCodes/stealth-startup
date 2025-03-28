import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CodepenApp from "./components/CodepenApp";
import NewProjectApp from "./components/NewProjectApp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";
import "./App.css";
import supabase from "./supabaseClient";
import RootLayout from "./components/Layout";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AiChat from "./pages/AiChat";
import SessionDurationTracker from "./components/SessionDurationTracker";

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>loading...</div>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
        {/* Mount SessionDurationTracker so it can track the user's session */}
        <SessionDurationTracker />
        <div className="h-screen flex flex-col">
          {/* <Navbar /> */}
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
                  <RootLayout>
                    <Dashboard />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <RootLayout>
                    <Settings />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute>
                  <RootLayout>
                    <Users />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/ai-chat"
              element={
                <ProtectedRoute>
                  <RootLayout>
                    <AiChat />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            {/* Game routes */}
            <Route
              path="/new-project/js/tic-tac-toe"
              element={
                <ProtectedRoute>
                  <NewProjectApp gameType="tic-tac-toe" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-project/rock-paper-scissors"
              element={
                <ProtectedRoute>
                  <NewProjectApp gameType="rock-paper-scissors" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-project/py/pokemon-battle"
              element={
                <ProtectedRoute>
                  <NewProjectApp gameType="pokemon-battle" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-project/js/memory-game"
              element={
                <ProtectedRoute>
                  <NewProjectApp gameType="memory-game" />
                </ProtectedRoute>
              }
            />
            {/* Catch-all redirect for old URLs */}
            <Route
              path="/new-project/:game"
              element={
                <ProtectedRoute>
                  <Navigate to="/new-project/js/:game" replace />
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
