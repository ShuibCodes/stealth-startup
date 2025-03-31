import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Track the session
  const [sessionId, setSessionId] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  // Track the last user activity time
  const lastActivityRef = useRef(Date.now());


  // 1. Listen for Supabase Auth changes & initialize user
  //
  useEffect(() => {
    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // If user is logged in, start or resume an in-app session
      if (session?.user) {
        startOrResumeSession();
      }
    });

    // Subscribe to auth state changes (login, logout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        // User just logged in
        startOrResumeSession();
      } else {
        // User logged out
        endSession();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  //
  // 2. Start or Resume Session
  //    - Use sessionStorage so session ends on tab/browser close.
  //
  const startOrResumeSession = () => {
    const existingId = sessionStorage.getItem("sessionId");
    if (existingId) {
      // We already have a session in this tab
      setSessionId(existingId);
      setSessionActive(true);
      lastActivityRef.current = Date.now();
      console.log("Resumed existing session:", existingId);
    } else {
      // Create a brand-new session
      const newId = uuidv4();
      sessionStorage.setItem("sessionId", newId);
      setSessionId(newId);
      setSessionActive(true);
      lastActivityRef.current = Date.now();
      console.log("New session started:", newId);
    }
  };

  //
  // 3. End Session
  //    - Does NOT log the user out from Supabase, only ends the in-app session.
  //
  const endSession = () => {
    setSessionId(null);
    setSessionActive(false);
    sessionStorage.removeItem("sessionId");
    console.log("Session ended.");
  };

  //
  // 4. Inactivity Checker (30 min)
  //    - Every minute, check if last activity is older than 30 min.
  //    - If so, end the session (but keep user logged in).
  //
  useEffect(() => {
    if (!user || !sessionActive) return;

    const checkInactivity = () => {
      const now = Date.now();
      const diff = now - lastActivityRef.current;
      const thirtyMinutes = 30 * 60 * 1000; 

      if (diff >= thirtyMinutes) {
        endSession();
      }
    };

    const intervalId = setInterval(checkInactivity, 60 * 1000); // check every minute
    return () => clearInterval(intervalId);
  }, [user, sessionActive]);

  //
  // 5. Activity Listener
  //    - If session is active, update lastActivityRef on any user action.
  //    - If session ended, start a new session on next user action.
  //
  useEffect(() => {
    if (!user) return;

    const handleActivity = () => {
      if (!sessionActive) {
        // If the session ended due to inactivity, start a new session
        startOrResumeSession();
      } else {
        // If session is active, just update the activity timestamp
        lastActivityRef.current = Date.now();
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [user, sessionActive]);

  //
  // Provide user, loading, and session info to the rest of the app
  //
  const value = {
    user,
    loading,
    sessionId,
    sessionActive,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
