export function exportToCsv(users) {
  const header = ['Full Name','Email','Phone','Role','Status','Created Date'];
  const rows = users.map(u => [u.fullName,u.email,u.phone,u.role,u.status,new Date(u.createdDate).toLocaleString()]);
  let csv = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `users_${Date.now()}.csv`;
  a.click();
}
