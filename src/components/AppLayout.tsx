import { NavLink, Outlet } from 'react-router-dom'
import { StopwatchBar } from './StopwatchBar'

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          Tempo<span>.</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/">
            Library
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to="/saved">
            Saved
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-nav' : '')}
            to="/routines"
          >
            Routines
          </NavLink>
        </nav>
        <span className="topbar-caption">Workout timer</span>
      </header>
      <Outlet />
      <StopwatchBar />
    </div>
  )
}
