import { NavLink, Outlet } from 'react-router-dom'
import { StopwatchBar } from './StopwatchBar'
import { useTheme } from '../contexts/ThemeContext'

export function AppLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          Tempo<span>.</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/">
            Kho bài tập
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/saved">
            Đã lưu
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-nav' : '')}
            to="/routines"
          >
            Giáo án
          </NavLink>
        </nav>
        <div className="topbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
          >
            {theme === 'dark' ? '☀ Sáng' : '☾ Tối'}
          </button>
          <span className="topbar-caption">Bấm giờ tập luyện</span>
        </div>
      </header>
      <Outlet />
      <StopwatchBar />
    </div>
  )
}
