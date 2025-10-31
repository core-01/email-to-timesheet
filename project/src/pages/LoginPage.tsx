import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../redux/slices/authSlice';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { UserRole } from '../types';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await dispatch(login({ username, password })).unwrap();

      if (result.user.role === UserRole.ADMIN) {
        navigate('/');
      } else if (result.user.role === UserRole.MANAGER) {
        navigate('/timesheets');
      } else {
        navigate('/emails');
      }
    } catch (err: any) {
      setError(err || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Email Timesheet System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Demo credentials:</p>
          <p className="mt-1">Admin: admin / password</p>
        </div>
      </div>
    </div>
  );
};
