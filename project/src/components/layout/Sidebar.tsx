import { NavLink } from 'react-router-dom';
import {
  Home, Mail, Ticket, Clock, Users, Settings,
  FileText, ChevronLeft, ChevronRight
} from 'lucide-react';
import { UserRole } from '../../types';
import { useAppSelector } from '../../hooks/useAppSelector';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Emails', path: '/emails', icon: Mail },
  { name: 'Tickets', path: '/tickets', icon: Ticket },
  { name: 'Timesheets', path: '/timesheets', icon: Clock },
  { name: 'Users', path: '/users', icon: Users, roles: [UserRole.ADMIN] },
  { name: 'Integrations', path: '/integrations', icon: Settings, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { name: 'Logs', path: '/logs', icon: FileText, roles: [UserRole.ADMIN] },
];

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const canAccessRoute = (roles?: UserRole[]) => {
    if (!roles || !user) return true;
    return roles.includes(user.role);
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {isOpen && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              ETS
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            if (!canAccessRoute(item.roles)) return null;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};
