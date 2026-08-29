import React from 'react';
import { Menu, LogOut, User, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar navbar-expand bg-dark border-bottom border-secondary sticky-top px-3 py-2 text-white">
      <div className="container-fluid p-0">
        
        {/* Toggle Button */}
        <button 
          className="btn btn-outline-light btn-sm me-3 border-secondary"
          onClick={toggleSidebar}
          aria-label="Toggle Navigation"
        >
          <Menu size={18} />
        </button>

        {/* Brand Logo & Name */}
        <Link to="/dashboard" className="navbar-brand d-flex items-center text-white fw-bold me-auto">
          <div 
            className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center me-2 font-weight-black"
            style={{ width: '32px', height: '32px', fontWeight: '900' }}
          >
            P
          </div>
          <span className="fs-6 tracking-wide">PANCHAL <span className="text-warning">ART</span> ADMIN</span>
        </Link>

        {/* Action Controls */}
        <div className="d-flex align-items-center gap-3">
          
          <a 
            href="http://localhost:5173" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-warning text-warning d-none d-sm-inline-flex align-items-center gap-1"
          >
            <span>Public Website</span>
            <ExternalLink size={14} />
          </a>

          {/* User Profile Badge */}
          <div className="d-flex align-items-center gap-2 border-start border-secondary ps-3">
            <div className="rounded-circle bg-secondary d-flex align-items-center justify-center text-white" style={{ width: '32px', height: '32px' }}>
              <User size={16} />
            </div>
            <div className="d-none d-md-block text-start">
              <div className="fw-bold text-white fs-7 leading-tight">{user?.fullName || 'Administrator'}</div>
              <div className="text-muted fs-8 leading-tight">{user?.email || 'admin@panchalart.com'}</div>
            </div>

            <button 
              onClick={handleLogout}
              className="btn btn-sm btn-outline-danger ms-2"
              title="Logout System"
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;
