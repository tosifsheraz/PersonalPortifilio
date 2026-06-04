import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FolderKanban, Cpu, Briefcase, LogOut, LayoutDashboard, Settings } from 'lucide-react'

const navItems = [
  { to: '/admin/dashboard/config', label: 'Site Config', icon: Settings },
  { to: '/admin/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/dashboard/skills', label: 'Skills', icon: Cpu },
  { to: '/admin/dashboard/experience', label: 'Experience', icon: Briefcase },
]

export function AdminSidebar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <aside className="w-60 min-h-screen border-r border-mm-border bg-mm-surface flex flex-col">
      <div className="p-6 border-b border-mm-border">
        <div className="flex items-center gap-2 mb-1">
          <LayoutDashboard size={16} className="text-mm-orange" />
          <p className="font-mono text-xs text-mm-muted uppercase tracking-widest">Portfolio</p>
        </div>
        <p className="font-display font-black text-mm-white text-lg">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 font-mono text-sm border transition-all duration-150 ${
                isActive
                  ? 'border-mm-orange bg-mm-orange/10 text-mm-orange'
                  : 'border-transparent text-mm-muted hover:border-mm-border hover:text-mm-white'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-mm-border">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2.5 font-mono text-sm text-mm-muted hover:text-mm-red border border-transparent hover:border-mm-red/30 w-full transition-all duration-150"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
