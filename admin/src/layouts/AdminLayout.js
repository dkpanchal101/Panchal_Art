import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-vh-100 bg-dark text-light d-flex flex-column">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="d-flex flex-grow-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-grow-1 p-4 bg-dark text-light overflow-auto">
          <div className="container-fluid max-w-7xl mx-auto p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
