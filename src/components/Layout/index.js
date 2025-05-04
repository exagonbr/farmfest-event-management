import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/map', label: 'Map View' },
    { path: '/create-event', label: 'Create Event' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <nav className="bg-green-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <svg
                  className="w-8 h-8 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span className="text-2xl font-extrabold tracking-wide">AgriHub</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 font-medium ${
                    location.pathname === item.path
                      ? 'bg-green-900 text-green-100'
                      : 'hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-green-900 text-green-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm">
          © 2024 FarmFest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
