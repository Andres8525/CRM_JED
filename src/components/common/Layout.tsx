import React, { useState } from 'react';
import { Menu, X, Home, Users, UserRound, Calendar, BarChart3, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: 'Panel Principal', path: '/', icon: <Home size={20} /> },
    { name: 'Pacientes', path: '/patients', icon: <Users size={20} /> },
    { name: 'Doctores', path: '/doctors', icon: <UserRound size={20} /> },
    { name: 'Agenda', path: '/schedule', icon: <Calendar size={20} /> },
    { name: 'Reportes', path: '/reports', icon: <BarChart3 size={20} /> },
    { name: 'Configuración', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-[#0A2463] text-white ${
          isSidebarOpen ? 'w-64' : 'w-0 md:w-20'
        } transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold">JED CRM</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white p-2 rounded-md hover:bg-[#0d2d7a] focus:outline-none"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-4 ${
                    isSidebarOpen ? 'px-6' : 'justify-center'
                  } hover:bg-[#0d2d7a] transition-colors ${
                    location.pathname === item.path ? 'bg-[#0d2d7a]' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full">
          <button
            className={`flex items-center p-4 ${
              isSidebarOpen ? 'px-6' : 'justify-center'
            } hover:bg-[#0d2d7a] w-full transition-colors border-t border-[#0d2d7a]`}
          >
            <span className="mr-3"><LogOut size={20} /></span>
            {isSidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md py-4 px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#0A2463]">
              {navItems.find(item => item.path === location.pathname)?.name || 'Panel Principal'}
            </h2>
            <div className="flex items-center">
              <div className="bg-[#4A90E2] text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span className="font-semibold">JD</span>
              </div>
              <span className="ml-2 text-gray-700 hidden md:inline">Juan Díaz</span>
            </div>
          </div>
        </header>
        
        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;