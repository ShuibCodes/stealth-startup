import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

// context
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import RoutesContainer from "./components/RoutesContainer";

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
      <CourseProvider>
        <BrowserRouter>
          <RoutesContainer />
        </BrowserRouter>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
