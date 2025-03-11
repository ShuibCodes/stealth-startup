import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import supabase from "../supabaseClient";

const ProtectedRoute = ({ children, adminOnly }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch user role from Supabase
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching role:", error);
      return;
    }

    if (data) {
      setRole(data.role);
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
