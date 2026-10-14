import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicPortfolio from './pages/PublicPortfolio';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProjectsManager from './pages/admin/ProjectsManager';
import ResumeManager from './pages/admin/ResumeManager';
import CertificatesManager from './pages/admin/CertificatesManager';
import ProfileManager from './pages/admin/ProfileManager';
import SkillsManager from './pages/admin/SkillsManager';
import EducationManager from './pages/admin/EducationManager';
import ExperienceManager from './pages/admin/ExperienceManager';
import SettingsStatus from './pages/admin/SettingsStatus';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PublicPortfolio />} />

          {/* Unlinked Admin Login Portal */}
          <Route path="/admin-portal" element={<AdminLogin />} />

          {/* Protected Admin Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin-portal" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="resume" element={<ResumeManager />} />
              <Route path="certificates" element={<CertificatesManager />} />
              <Route path="profile" element={<ProfileManager />} />
              <Route path="skills" element={<SkillsManager />} />
              <Route path="education" element={<EducationManager />} />
              <Route path="experience" element={<ExperienceManager />} />
              <Route path="settings" element={<SettingsStatus />} />
            </Route>
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
