import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { 
  Home, 
  Target, 
  FileText, 
  FolderOpen, 
  Mic, 
  Settings, 
  Search, 
  Bell, 
  LogOut, 
  User,
  ChevronDown,
  Sparkles,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const SidebarLink = ({ to, icon: Icon, label, external }) => {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-slate-600 hover:bg-slate-100/80 hover:text-indian-navy"
      >
        <Icon className="w-5 h-5 text-slate-400 group-hover:text-indian-saffron" />
        <span>{label}</span>
      </a>
    );
  }
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20' 
            : 'text-slate-600 hover:bg-slate-100/80 hover:text-indian-navy'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indian-saffron'}`} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
};

const DashboardLayout = ({ userProfile, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/dashboard/schemes", icon: Target, label: "Eligible Schemes" },
    { to: "/dashboard/applications", icon: FileText, label: "Applications" },
    { to: "/dashboard/documents", icon: FolderOpen, label: "Documents" },
    { to: "/dashboard/voice-assistant", icon: Mic, label: "Voice Assistant" },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row font-inter overflow-hidden">
      
      {/* Sidebar - Fixed Left */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed inset-y-0 left-0 z-20 top-[72px] md:top-0 transition-transform transform md:translate-x-0 -translate-x-full">
        {/* Mobile Header logic usually goes here if needed, keeping simple for desktop priority based on request */}

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 mt-4 custom-scrollbar">
          {navLinks.map((link) => (
            <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} external={link.external} />
          ))}
        </nav>

        {/* Sidebar Footer / Microcopy */}
        <div className="p-4 mx-4 mb-6 bg-blue-50 border border-blue-100 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
           <Sparkles className="w-5 h-5 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
           <p className="text-xs text-blue-800 font-medium leading-relaxed">
             "Your AI assistant is continuously scanning for new benefits."
           </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 relative min-h-screen">
        
        {/* Top Navbar - Sticky Global */}
        <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6 xl:px-10">
          
          {/* Global Logo linking to Landing Page */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group mr-6 md:mr-0 z-50">
            <img src={logo} alt="Akashvaani AI" className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* Center: Smart Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-auto items-center">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text"
                placeholder="Ask about schemes, benefits, or applications..."
                className="w-full bg-slate-100 border-none pl-12 pr-4 py-2.5 rounded-full text-sm font-medium focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-400"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-white rounded-full text-[10px] font-bold text-slate-400 shadow-sm border border-slate-100">
                AI
              </div>
            </div>
          </div>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-indian-navy transition-colors hover:bg-slate-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Dropdown relative parent */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition-all focus:ring-2 focus:ring-slate-100 outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                  {userProfile?.name ? userProfile.name.charAt(0) : 'U'}
                </div>
                <span className="hidden sm:block text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                  {userProfile?.name || 'User'}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 mr-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">{userProfile?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{userProfile?.isDemo ? 'Demo Mode' : 'Citizen Account'}</p>
                    </div>
                    
                    <Link 
                      to="/dashboard/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indian-navy flex items-center gap-2 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Profile
                    </Link>
                    <Link 
                      to="/dashboard/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indian-navy flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Settings
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-6 xl:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
