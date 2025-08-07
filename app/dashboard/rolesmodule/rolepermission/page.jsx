"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function RolePermissionPage() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    roleId: '',
    modules: [{ moduleId: '', canAdd: false, canEdit: false, canDelete: false, canView: false }],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
    fetchModules();
  }, []);

  const fetchPermissions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/module-permissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPermissions(res.data);
    } catch (err) {
      console.error('Error fetching permissions', err);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data);
    } catch (err) {
      console.error('Error fetching roles', err);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/modules', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModules(res.data);
    } catch (err) {
      console.error('Error fetching modules', err);
    }
  };

  const handleAddModule = () => {
    setFormData({
      roleId: '',
      modules: [{ moduleId: '', canAdd: false, canEdit: false, canDelete: false, canView: false }],
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (perm) => {
    setFormData({
      roleId: perm.roleId._id,
      modules: perm.modules.map((m) => ({
        moduleId: m.moduleId._id,
        canAdd: m.canAdd,
        canEdit: m.canEdit,
        canDelete: m.canDelete,
        canView: m.canView,
      })),
    });
    setIsEdit(true);
    setEditId(perm._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this permission?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/module-permissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPermissions();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index][field] = value;
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleAddModuleRow = () => {
    setFormData({
      ...formData,
      modules: [...formData.modules, { moduleId: '', canAdd: false, canEdit: false, canDelete: false, canView: false }],
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/module-permissions/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/module-permissions', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowModal(false);
      fetchPermissions();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Role Module Permissions</h1>
        <button
          onClick={handleAddModule}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Permission
        </button>
      </div>

      {/* Permissions List */}
      <div className="grid gap-5">
        {permissions.map((perm) => (
          <div key={perm._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-gray-700">
                Role: <span className="text-blue-600">{perm.roleId.name}</span>
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(perm)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(perm._id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-2 border text-center">Module Name</th>
                    <th className="p-2 border text-center">Can View</th>
                    <th className="p-2 border text-center">Can Add</th>
                    <th className="p-2 border text-center">Can Edit</th>
                    <th className="p-2 border text-center">Can Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {perm.modules.map((mod) => (
                    <tr key={mod._id} className="hover:bg-gray-50">
                      <td className="p-2 border text-center text-black">{mod.moduleId.moduleName}</td>
                      <td className="p-2 border text-center text-black">{mod.canView ? '✅' : '❌'}</td>
                      <td className="p-2 border text-center text-black">{mod.canAdd ? '✅' : '❌'}</td>
                      <td className="p-2 border text-center text-black">{mod.canEdit ? '✅' : '❌'}</td>
                      <td className="p-2 border text-center text-black">{mod.canDelete ? '✅' : '❌'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full sm:max-w-3xl mx-4 rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {isEdit ? 'Edit' : 'Add'} Module Permission
            </h2>

            {/* Role Selection */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1 text-gray-700">Select Role</label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.roleId}
                onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
              >
                <option value="">-- Choose Role --</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Modules Form */}
            <div className="space-y-4">
              {formData.modules.map((mod, idx) => (
                <div key={idx} className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                  <select
                    className="col-span-2 border border-gray-300 px-2 py-2 rounded-md"
                    value={mod.moduleId}
                    onChange={(e) => handleChange(idx, 'moduleId', e.target.value)}
                  >
                    <option value="">Select Module</option>
                    {modules.map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.moduleName}
                      </option>
                    ))}
                  </select>
                  {['canView', 'canAdd', 'canEdit', 'canDelete'].map((perm) => (
                    <label key={perm} className="flex items-center space-x-2 text-gray-700 text-sm">
                      <input
                        type="checkbox"
                        checked={mod[perm]}
                        onChange={(e) => handleChange(idx, perm, e.target.checked)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span>{perm.replace('can', '')}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddModuleRow}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              + Add Another Module
            </button>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                {isEdit ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
