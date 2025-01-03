import { Outlet, NavLink } from 'react-router-dom';
import { Book, ListPlus, BarChart3 } from 'lucide-react';
import { Navbar } from '../layout/Navbar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/admin/topics"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-md transition ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    <ListPlus className="w-5 h-5 mr-3" />
                    Topics & Words
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/lessons"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-md transition ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Book className="w-5 h-5 mr-3" />
                    Lessons
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/stats"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-md transition ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    <BarChart3 className="w-5 h-5 mr-3" />
                    Statistics
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}