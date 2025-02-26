import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const ProtectedRoute = ({ children, adminOnly }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setRole(userData.role);
      }
    }
  };

  const { user, loading } = useAuth();
  if (loading) return null; // Prevent flashing redirect during Firebase auth check

  return user ? (
    role !== "admin" && adminOnly ? (
      <Navigate to="/dashboard/courses" />
    ) : (
      children
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
