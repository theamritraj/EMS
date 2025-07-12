import React, { useState, useEffect, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import SearchFilter from './components/SearchFilter';
import Pagination from './components/Pagination';
import ThemeToggle from './components/ThemeToggle';
import { exportToCsv } from './utils/exportCsv';

function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filters, setFilters] = useState({ query:'', role:'All', status:'All', sortBy:'createdDate', sortDir:'desc' });
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users')||'[]');
    setUsers(stored);
  }, []);

  useEffect(() => localStorage.setItem('users', JSON.stringify(users)), [users]);

  const handleSave = u => {
    if (u.id) {
      setUsers(prev => prev.map(x => x.id === u.id ? u : x));
    } else {
      setUsers(prev => [...prev, { ...u, id: Date.now(), createdDate: new Date().toISOString() }]);
    }
    setEditing(null);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      setUsers(prev => prev.filter(x => x.id !== id));
      setSelectedIds(prev => { const z = new Set(prev); z.delete(id); return z; });
    }
  };

  const handleBulkDelete = () => {
    if (!selectedIds.size) return alert('Pick users first');
    if (window.confirm(`Delete ${selectedIds.size} users?`)) {
      setUsers(prev => prev.filter(x => !selectedIds.has(x.id)));
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = id => {
    setSelectedIds(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const filtered = useMemo(() => {
    return users
      .filter(u => (u.fullName + u.email).toLowerCase().includes(filters.query.toLowerCase()))
      .filter(u => filters.role==='All' || u.role===filters.role)
      .filter(u => filters.status==='All' || u.status===filters.status)
      .sort((a,b) => {
        const dir = filters.sortDir==='asc'?1:-1;
        return a[filters.sortBy] > b[filters.sortBy] ? dir : -dir;
      });
  }, [users, filters]);

  const paged = useMemo(() => {
    const start = (page-1)*perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Admin Panel</h1>
        <ThemeToggle />
      </div>
      <Dashboard users={users} />
      <SearchFilter filters={filters} setFilters={setFilters} />
      <div className="flex space-x-2 mb-2">
        <button onClick={() => exportToCsv(filtered)} className="btn">Export CSV</button>
        <button disabled={!selectedIds.size} onClick={handleBulkDelete} className="btn btn-danger">
          Delete Selected ({selectedIds.size})
        </button>
        <button onClick={() => setEditing({})} className="btn btn-primary">Add User</button>
      </div>
      <UserTable
        users={paged}
        filters={filters}
        setFilters={setFilters}
        onEdit={setEditing}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
      />
      <Pagination page={page} setPage={setPage} total={filtered.length} perPage={perPage} />
      {editing !== null && <UserForm user={editing} onSave={handleSave} onCancel={()=>setEditing(null)} />}
    </div>
  );
}

export default App;
