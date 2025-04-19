import React from "react";
import { Routes, Route } from "react-router-dom";
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


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/collaborators" element={<Collaborators />} />
      <Route path="/files" element={<Files />} />
      <Route path="/starred" element={<Starred />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/support" element={<Support />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/community" element={<Community />} />
      <Route path="/:id" element={<GroupDetails />} />
      
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<LogIn/>} />
    </Routes>
  );
}
export default AppRoutes;
