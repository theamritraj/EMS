// src/components/UserCards.jsx
import React from 'react';

const roleColors = {
  Admin: 'bg-red-200 text-red-800',
  Editor: 'bg-blue-200 text-blue-800',
  User: 'bg-green-200 text-green-800',
};

export default function UserCards({ users, onEdit, onDelete }) {
  if (!users.length) {
    return <p className="text-center p-4">No users found.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {users.map(u => (
        <div key={u.id} className="bg-white dark:bg-gray-800 shadow rounded p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{u.fullName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{u.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{u.phone}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`px-2 py-1 rounded ${roleColors[u.role]}`}>
              {u.role}
            </span>
            <span className={`px-2 py-1 rounded text-sm ${u.status === 'Active' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
              {u.status}
            </span>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            {new Date(u.createdDate).toLocaleDateString()}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(u)}
              className="text-blue-500 hover:text-blue-700"
            >Edit</button>
            <button
              onClick={() => onDelete(u.id)}
              className="text-red-500 hover:text-red-700"
            >Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
