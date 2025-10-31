import { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Loading } from '../components/common/Loading';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchUsers, createUser, updateUser, deleteUser } from '../redux/slices/userSlice';
import { User, UserRole } from '../types';
import { formatDate } from '../utils/formatters';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mockUsers } from '../utils/mockData';

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: UserRole.EMPLOYEE,
    department: '',
  });

  useEffect(() => {
    dispatch(fetchUsers()).catch(() => {});
  }, [dispatch]);

  const displayUsers = users.length > 0 ? users : mockUsers;

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        department: user.department || '',
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: UserRole.EMPLOYEE,
        department: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await dispatch(updateUser({ id: editingUser.id, user: formData }));
    } else {
      await dispatch(createUser(formData));
    }
    setShowModal(false);
    dispatch(fetchUsers());
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(id));
      dispatch(fetchUsers());
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    const colors = {
      [UserRole.ADMIN]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      [UserRole.MANAGER]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      [UserRole.EMPLOYEE]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return colors[role];
  };

  const columns = [
    {
      header: 'Username',
      accessor: (row: User) => (
        <span className="font-medium text-gray-900 dark:text-white">{row.username}</span>
      ),
    },
    {
      header: 'Name',
      accessor: (row: User) => `${row.firstName} ${row.lastName}`,
    },
    {
      header: 'Email',
      accessor: 'email' as keyof User,
    },
    {
      header: 'Role',
      accessor: (row: User) => (
        <Badge className={getRoleBadgeColor(row.role)}>
          {row.role}
        </Badge>
      ),
    },
    {
      header: 'Department',
      accessor: (row: User) => row.department || 'N/A',
    },
    {
      header: 'Status',
      accessor: (row: User) => (
        <Badge className={row.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Created',
      accessor: (row: User) => formatDate(row.createdAt),
    },
    {
      header: 'Actions',
      accessor: (row: User) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(row);
            }}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            className="text-red-600 hover:text-red-700 dark:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading && displayUsers.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus className="h-5 w-5 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <Table data={displayUsers} columns={columns} />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              options={[
                { value: UserRole.EMPLOYEE, label: 'Employee' },
                { value: UserRole.MANAGER, label: 'Manager' },
                { value: UserRole.ADMIN, label: 'Admin' },
              ]}
              required
            />
            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>

          {!editingUser && (
            <Input
              label="Password"
              type="password"
              placeholder="Enter initial password"
              required
            />
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingUser ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
