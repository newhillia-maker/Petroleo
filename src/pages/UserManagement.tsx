import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Trash2, 
  Edit2,
  X,
  Check,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';

type AccessLevel = 'Administrator' | 'Operator' | 'Auditor';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  accessLevel: AccessLevel;
  status: 'Active' | 'Suspended';
  lastLogin: string;
}

const initialUsers: SystemUser[] = [
  { id: 'USR-001', name: 'Nilton Furtado', email: 'nilton@industrial.com', role: 'Chief Auditor', accessLevel: 'Administrator', status: 'Active', lastLogin: '10m ago' },
  { id: 'USR-002', name: 'Sarah Chen', email: 's.chen@logistics.com', role: 'Node Operator', accessLevel: 'Operator', status: 'Active', lastLogin: '2h ago' },
  { id: 'USR-003', name: 'Marcus Vane', email: 'm.vane@security.com', role: 'Compliance Officer', accessLevel: 'Auditor', status: 'Active', lastLogin: '1d ago' },
  { id: 'USR-004', name: 'Elena Rossi', email: 'e.rossi@refinery.com', role: 'Terminal Manager', accessLevel: 'Operator', status: 'Suspended', lastLogin: '5d ago' },
];

export function UserManagement() {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    accessLevel: 'Operator' as AccessLevel,
    status: 'Active' as 'Active' | 'Suspended'
  });

  const handleOpenModal = (user?: SystemUser) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        accessLevel: user.accessLevel,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: '',
        accessLevel: 'Operator',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser: SystemUser = {
        id: `USR-00${users.length + 1}`,
        ...formData,
        lastLogin: 'Never'
      };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-2">System Administration</p>
          <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface uppercase">User Management</h2>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2"
        >
          <UserPlus size={18} />
          Provision New User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low border-none pl-12 pr-4 py-3 text-sm font-medium rounded-xl focus:ring-1 focus:ring-primary" 
              placeholder="Search by Name, Email or Operator ID..."
            />
          </div>
          <button className="p-3 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">
            <Filter size={20} className="text-zinc-600" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Operator</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">ID / Role</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Access Level</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Last Activity</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black font-headline text-on-surface">{user.name}</p>
                        <p className="text-xs text-zinc-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-mono font-bold text-primary">{user.id}</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{user.role}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
                      user.accessLevel === 'Administrator' ? "bg-primary/10 text-primary" : 
                      user.accessLevel === 'Operator' ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-600"
                    )}>
                      <Shield size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{user.accessLevel}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-1.5",
                      user.status === 'Active' ? "text-emerald-500" : "text-primary"
                    )}>
                      <div className={cn("w-2 h-2 rounded-full", user.status === 'Active' ? "bg-emerald-500" : "bg-primary")}></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-zinc-400 font-medium">{user.lastLogin}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-zinc-400 hover:text-primary"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-zinc-400 hover:text-primary"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-xl font-black font-headline tracking-tighter uppercase">
                {editingUser ? 'Update User Privileges' : 'Provision New Operator'}
              </h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <X size={20} className="text-zinc-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface-container-low border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary font-medium" 
                    placeholder="Enter operator name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-surface-container-low border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary font-medium" 
                    placeholder="operator@industrial.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">System Role</label>
                  <input 
                    type="text" 
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-surface-container-low border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary font-medium" 
                    placeholder="e.g. Node Validator"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Access Level</label>
                    <select 
                      value={formData.accessLevel}
                      onChange={(e) => setFormData({...formData, accessLevel: e.target.value as AccessLevel})}
                      className="w-full bg-surface-container-low border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary font-medium"
                    >
                      <option value="Administrator">Administrator</option>
                      <option value="Operator">Operator</option>
                      <option value="Auditor">Auditor</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Suspended'})}
                      className="w-full bg-surface-container-low border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary font-medium"
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-widest border border-outline-variant/20 hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white px-6 py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {editingUser ? <Check size={18} /> : <UserPlus size={18} />}
                  {editingUser ? 'Commit Changes' : 'Initialize User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20 animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert size={32} />
              </div>
              <h3 className="text-xl font-black font-headline tracking-tighter uppercase mb-2">
                Confirm Termination
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Are you sure you want to terminate this operator's access? This action is recorded on the immutable ledger.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-widest border border-outline-variant/20 hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-primary text-white px-4 py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  Terminate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
