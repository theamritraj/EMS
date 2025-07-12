// src/components/Dashboard.jsx
export default function Dashboard({ users }) {
  const total = users.length;
  const active = users.filter(u => u.status === 'Active').length;
  const inactive = total - active;

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="bg-white p-4 rounded shadow">Total Users: {total}</div>
      <div className="bg-white p-4 rounded shadow">Active: {active}</div>
      <div className="bg-white p-4 rounded shadow">Inactive: {inactive}</div>
    </div>
  );
}
