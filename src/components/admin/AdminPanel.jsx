import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { ProjectsPanel } from './ProjectsPanel'
import { SkillsPanel } from './SkillsPanel'
import { ExperiencePanel } from './ExperiencePanel'
import { SiteConfigPanel } from './SiteConfigPanel'

export function AdminPanel() {
  return (
    <div className="flex min-h-screen bg-mm-bg">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route index element={<Navigate to="config" replace />} />
          <Route path="config" element={<SiteConfigPanel />} />
          <Route path="projects" element={<ProjectsPanel />} />
          <Route path="skills" element={<SkillsPanel />} />
          <Route path="experience" element={<ExperiencePanel />} />
        </Routes>
      </main>
    </div>
  )
}
