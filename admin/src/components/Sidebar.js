import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, Image as ImageIcon, MessageSquareQuote, 
  Mail, UserCheck, Shield 
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
      path: '/dashboard'
    },
    {
      title: 'Company Profile',
      icon: <Building2 size={18} />,
      path: '/company'
    },
    {
      title: 'Gallery Catalog',
      icon: <ImageIcon size={18} />,
      path: '/gallery'
    },
    {
      title: 'Quote Inquiries',
      icon: <MessageSquareQuote size={18} />,
      path: '/quotes'
    },
    {
      title: 'Contact Submissions',
      icon: <Mail size={18} />,
      path: '/contacts'
    },
    {
      title: 'Admin Profile',
      icon: <UserCheck size={18} />,
      path: '/profile'
    }
  ];

  return (
    <aside 
      className={`bg-dark text-light border-end border-secondary flex-shrink-0 transition-all ${
        isOpen ? 'd-block' : 'd-none d-md-block'
      }`}
      style={{ width: '240px', minHeight: 'calc(100vh - 56px)' }}
    >
      <div className="p-3">
        <div className="text-uppercase text-muted fs-8 font-weight-bold mb-3 px-2 tracking-widest">
          Management Portal
        </div>

        <nav className="nav nav-pills flex-column gap-1">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2.5 rounded-3 text-white transition-all ${
                  isActive
                    ? 'bg-warning text-dark font-weight-bold shadow-sm'
                    : 'hover-bg-secondary text-light'
                }`
              }
            >
              {item.icon}
              <span className="fs-7">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-5 p-3 rounded-3 bg-secondary bg-opacity-20 border border-secondary text-muted fs-8">
          <div className="d-flex align-items-center gap-1 text-warning font-weight-bold mb-1">
            <Shield size={14} />
            <span>Production Mode</span>
          </div>
          <div>Panchal Art Engine v1.0.0</div>
          <div>Thasara, Gujarat</div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
