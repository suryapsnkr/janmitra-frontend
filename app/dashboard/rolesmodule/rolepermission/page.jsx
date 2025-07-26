"use client";

import React, { useState } from "react";

export default function RolePermissionPage() {
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin", date: "28-Dec-2021" },
    { id: 2, name: "Admin", date: "28-Dec-2021" },
    { id: 3, name: "Employee", date: "28-Dec-2021" },
    { id: 4, name: "Warehouse", date: "28-Dec-2021" },
    { id: 5, name: "Consumers", date: "01-Feb-2022" },
    { id: 6, name: "Director Group", date: "14-Aug-2023" },
    { id: 7, name: "CEO", date: "07-May-2025" },
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAddRole = () => {
    if (!roleName.trim()) return alert("Role name is required");

    const newRole = {
      id: roles.length + 1,
      name: roleName,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setRoles([...roles, newRole]);
    setRoleName("");
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this role?");
    if (confirmDelete) {
      setRoles(roles.filter((role) => role.id !== id));
      setOpenMenuId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Role Setup</h1>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Role Name *"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddRole}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Role
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Sr. No.</th>
                <th className="p-2 border">Role Name</th>
                <th className="p-2 border">Permission</th>
                <th className="p-2 border">Create Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, idx) => (
                <tr key={role.id} className="text-sm relative">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{role.name}</td>
                  <td className="p-2 border text-center">
                    <span className="inline-block w-6 h-6 bg-blue-400 text-white rounded-full text-center leading-6">
                      P
                    </span>
                  </td>
                  <td className="p-2 border">{role.date}</td>
                  <td className="p-2 border">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-orange-300 peer-checked:bg-orange-400 rounded-full"></div>
                    </label>
                  </td>
                  <td className="p-2 border relative">
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 rounded"
                      onClick={() =>
                        setOpenMenuId(openMenuId === role.id ? null : role.id)
                      }
                    >
                      ...
                    </button>

                    {openMenuId === role.id && (
                      <div className="absolute right-2 top-10 z-10 w-28 bg-white border rounded shadow-md">
                        <ul className="text-sm text-gray-700">
                          <li>
                            <button
                              onClick={() => {
                                alert(`Edit clicked for "${role.name}"`);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(role.id)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span>
            Showing 1 to {roles.length} of {roles.length} entries
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-200 rounded">Previous</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 bg-gray-200 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
