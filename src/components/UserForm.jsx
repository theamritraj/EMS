import React, {  useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function UserForm({ user, onSave, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: user || {
      fullName: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active'
    }
  });

  useEffect(() => {
    reset(user || {});
  }, [user, reset]);

  const submit = data => {
    onSave({
      ...user,
      ...data,
      createdDate: user?.createdDate || new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">{user?.id ? 'Edit User' : 'Add User'}</h2>

        {[
          { label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone', type: 'text' }
        ].map(field => (
          <div key={field.name} className="mb-4">
            <label className="block mb-1">{field.label}</label>
            <input
              {...register(field.name, { required: true })}
              type={field.type}
              className="w-full p-2 border rounded"
              placeholder={field.label}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Role</label>
            <select {...register('role')} className="w-full p-2 border rounded">
              {['Admin', 'User', 'Editor'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <select {...register('status')} className="w-full p-2 border rounded">
              {['Active', 'Inactive'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {user?.id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
