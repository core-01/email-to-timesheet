import { Menu, Moon, Sun, LogOut, User } from 'lucide-react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { mode } = useAppSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
              Email Timesheet Automation
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {mode === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
