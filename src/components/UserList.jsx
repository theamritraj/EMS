export default function UserList({ users, query, onEdit, onDelete }) {
  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full bg-white shadow rounded">
        <thead>...</thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <span className={`px-2 py-1 rounded ${
                  u.role === 'Admin' ? 'bg-red-200' :
                  u.role === 'Editor' ? 'bg-blue-200' : 'bg-green-200'
                }`}>
                  {u.role}
                </span>
              </td>
              <td>{u.status}</td>
              <td>{new Date(u.createdDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(u)} className="text-blue-500">Edit</button>
                <button onClick={() => onDelete(u.id)} className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
