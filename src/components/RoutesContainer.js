import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CodepenApp from "./CodepenApp";
import NewProjectApp from "./NewProjectApp";
import { useAuth } from "../context/AuthContext";

// pages
import RootLayout from "./Layout";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import AiChat from "../pages/AiChat";
import Courses from "../pages/Courses";
import CoursePage from "../pages/CoursePage";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProjectsPage from "../pages/ProjectsPage";

export default function RoutesContainer() {
  const { user, loading } = useAuth();

  if (loading) return <div>loading...</div>;

  return (
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
            <ProtectedRoute adminOnly>
              <RootLayout>
                <Dashboard />
              </RootLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute adminOnly>
              <RootLayout>
                <Settings />
              </RootLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute adminOnly>
              <RootLayout>
                <Users />
              </RootLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/ai-chat"
          element={
            <ProtectedRoute adminOnly>
              <RootLayout>
                <AiChat />
              </RootLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses"
          element={
            <ProtectedRoute>
              <RootLayout>
                <Courses />
              </RootLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/courses/:courseId/:moduleId"
          element={
            <ProtectedRoute>
              <RootLayout>
                <CoursePage />
              </RootLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/projects"
          element={
            <ProtectedRoute>
              <RootLayout>
                <ProjectsPage />
              </RootLayout>
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
          path="/new-project/tic-tac-toe"
          element={
            <ProtectedRoute>
              <NewProjectApp gameType="tic-tac-toe" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
