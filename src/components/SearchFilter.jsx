import React from 'react';

export default function SearchFilter({ filters, setFilters }) {
  const update = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
      <input
        type="text"
        name="query"
        placeholder="Search by name or email..."
        className="col-span-2 p-2 border rounded"
        value={filters.query}
        onChange={update}
      />
      <select name="role" className="p-2 border rounded" value={filters.role} onChange={update}>
        {['All', 'Admin', 'User', 'Editor'].map(r => <option key={r}>{r}</option>)}
      </select>
      <select name="status" className="p-2 border rounded" value={filters.status} onChange={update}>
        {['All', 'Active', 'Inactive'].map(s => <option key={s}>{s}</option>)}
      </select>
    </div>
  );
}
