'use client';

import { useEffect, useState } from 'react';

export default function ModulePage() {
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    moduleName: '',
    controllerName: '',
    iconName: '',
    operations: '',
    status: 'Active',
  });
  const [editId, setEditId] = useState(null);

  // ✅ Get token
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // ✅ Fetch modules
  const fetchModules = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/modules', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch modules');
      const data = await res.json();
      setModules(data.reverse()); // newest first
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // ✅ Add or Edit module
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      operations: formData.operations.split(',').map(op => op.trim()),
    };

    const url = editId
      ? `http://localhost:5000/api/modules/${editId}`
      : 'http://localhost:5000/api/modules';

    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submit failed');
      await fetchModules();
      setShowModal(false);
      setFormData({
        moduleName: '',
        controllerName: '',
        iconName: '',
        operations: '',
        status: 'Active',
      });
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete module
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this module?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/modules/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Delete failed');
      fetchModules();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Open modal for edit
  const openEdit = (mod) => {
    setEditId(mod._id);
    setFormData({
      moduleName: mod.moduleName,
      controllerName: mod.controllerName,
      iconName: mod.iconName,
      operations: mod.operations.join(', '),
      status: mod.status,
    });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Manage Modules</h2>
        <button
          onClick={() => {
            setFormData({
              moduleName: '',
              controllerName: '',
              iconName: '',
              operations: '',
              status: 'Active',
            });
            setEditId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Module
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 font-medium text-gray-700">
            <tr>
              <th className="px-4 py-2">Module Name</th>
              <th className="px-4 py-2">Controller</th>
              <th className="px-4 py-2">Icon</th>
              <th className="px-4 py-2">Operations</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod) => (
              <tr key={mod._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-black">{mod.moduleName}</td>
                <td className="px-4 py-2 text-black">{mod.controllerName}</td>
                <td className="px-4 py-2 text-black">{mod.iconName}</td>
                <td className="px-4 py-2 text-black">{mod.operations?.join(', ')}</td>
                <td className="px-4 py-2 text-black">{mod.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => openEdit(mod)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mod._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {modules.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                  No modules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editId ? 'Edit Module' : 'Add Module'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Module Name"
                value={formData.moduleName}
                onChange={(e) => setFormData({ ...formData, moduleName: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Controller Name"
                value={formData.controllerName}
                onChange={(e) => setFormData({ ...formData, controllerName: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Icon Name"
                value={formData.iconName}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Operations (comma separated)"
                value={formData.operations}
                onChange={(e) => setFormData({ ...formData, operations: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  {editId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
