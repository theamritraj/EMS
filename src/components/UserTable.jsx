import React from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const roleColors = {
  Admin: 'bg-red-200',
  Editor: 'bg-blue-200',
  User: 'bg-green-200'
};

export default function UserTable({
  users, filters, setFilters, onEdit, onDelete, selectedIds, toggleSelect
}) {
  const sortBy = filters.sortBy;
  const dir = filters.sortDir;

  const header = (key, label) => (
    <th
      className="px-4 py-2 cursor-pointer select-none"
      onClick={() => {
        const newDir = sortBy === key && dir === 'asc' ? 'desc' : 'asc';
        setFilters(f => ({ ...f, sortBy: key, sortDir: newDir }));
      }}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortBy === key && (dir === 'asc' ? <FaSortUp /> : <FaSortDown />)}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4"><input type="checkbox" onChange={e => {
              users.forEach(u => toggleSelect(u.id));
              if (!e.target.checked) selectedIds.clear();
            }} /></th>
            {header('fullName', 'Name')}
            {header('email', 'Email')}
            {header('phone', 'Phone')}
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            {header('createdDate', 'Created')}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="px-4 text-center">
                <input type="checkbox" checked={selectedIds.has(u.id)} onChange={() => toggleSelect(u.id)} />
              </td>
              <td className="px-4 py-2">{u.fullName}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.phone}</td>
              <td className={`px-4 py-2 rounded ${roleColors[u.role]}`}>{u.role}</td>
              <td className="px-4 py-2">{u.status}</td>
              <td className="px-4 py-2">{new Date(u.createdDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => onEdit(u)} className="text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={() => onDelete(u.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
