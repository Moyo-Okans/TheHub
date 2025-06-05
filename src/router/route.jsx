import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Groups from "../pages/groups";
import Collaborators from "../pages/collaborators";
import Files from "../pages/files";
import Starred from "../pages/starred";
import Notifications from "../pages/notifications";
import Settings from "../pages/settings";
import Support from "../pages/support";
import Trash from "../pages/trash";
import NotFound from "../pages/NotFound";
import Register from '../pages/register';
import LogIn from '../pages/login';
import Community from "../pages/community";
import GroupDetails from "../pages/GroupDetails";
import NewUser from "../components/newUser"
import SignedIn from "../components/signedin"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />

      {/* Protected routes */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/folders" element={<Groups />} />
              <Route path="/collaborators" element={<Collaborators />} />
              <Route path="/files" element={<Files />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Support />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/community" element={<Community />} />
              <Route path="/folder/:id" element={<GroupDetails />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/signedIn" element={<SignedIn />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default AppRoutes;
