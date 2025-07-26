"use client";

import React, { useState } from "react";

export default function ModuleSettingPage() {
    const [form, setForm] = useState({
        moduleName: "",
        controllerName: "",
        iconName: "",
        operations: "",
    });

    const [modules, setModules] = useState([
        {
            id: 1,
            moduleName: "Dashboard",
            controllerName: "Index",
            iconName: "fas fa-home",
            operations: "access",
            createdAt: "28-Dec-2021",
        },
        {
            id: 2,
            moduleName: "Role & Module",
            controllerName: "RoleController",
            iconName: "fas fa-truck",
            operations: "access|view|add|edit",
            createdAt: "28-Dec-2021",
        },
        {
            id: 3,
            moduleName: "Orders",
            controllerName: "Order",
            iconName: "fas fa-truck",
            operations: "access|dispatch|reject|delivered",
            createdAt: "28-Dec-2021",
        },
    ]);

    const [openMenuId, setOpenMenuId] = useState(null);
    const [editingModule, setEditingModule] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this module?")) {
            setModules(modules.filter((mod) => mod.id !== id));
            setOpenMenuId(null);
        }
    };

    const handleEdit = (mod) => {
        setEditingModule(mod);
        setIsEditModalOpen(true);
        setOpenMenuId(null);
    };

    const handleUpdate = () => {
        setModules((prev) =>
            prev.map((m) =>
                m.id === editingModule.id ? editingModule : m
            )
        );
        setIsEditModalOpen(false);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingModule((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold">Module Setup</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    name="moduleName"
                    value={form.moduleName}
                    onChange={handleChange}
                    placeholder="Modules Name Menu/Nav bar Name"
                    className="border p-2 rounded"
                />
                <input
                    name="controllerName"
                    value={form.controllerName}
                    onChange={handleChange}
                    placeholder="Controller Name"
                    className="border p-2 rounded"
                />
                <input
                    name="iconName"
                    value={form.iconName}
                    onChange={handleChange}
                    placeholder="Icon Name"
                    className="border p-2 rounded"
                />
                <input
                    name="operations"
                    value={form.operations}
                    onChange={handleChange}
                    placeholder="Operations Access for view,edit,delete,add"
                    className="border p-2 rounded"
                />
            </div>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                onClick={() => {
                    const { moduleName, controllerName, iconName, operations } = form;
                    if (!moduleName || !controllerName || !operations) {
                        alert("Module Name, Controller Name, and Operations are required.");
                        return;
                    }

                    const newModule = {
                        id: modules.length + 1,
                        moduleName,
                        controllerName,
                        iconName,
                        operations,
                        createdAt: new Date().toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }),
                    };

                    setModules([...modules, newModule]);
                    setForm({
                        moduleName: "",
                        controllerName: "",
                        iconName: "",
                        operations: "",
                    });
                }}
            >
                Add Module
            </button>


            <div className="mt-6 border rounded shadow overflow-x-auto">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Sr. No.</th>
                            <th className="p-2 border">Module Name</th>
                            <th className="p-2 border">Controller Name</th>
                            <th className="p-2 border">Icon Name</th>
                            <th className="p-2 border">Operation</th>
                            <th className="p-2 border">Create Date</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.map((mod, index) => (
                            <tr key={mod.id} className="text-center relative">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{mod.moduleName}</td>
                                <td className="border p-2">{mod.controllerName}</td>
                                <td className="border p-2">{mod.iconName}</td>
                                <td className="border p-2">{mod.operations}</td>
                                <td className="border p-2">{mod.createdAt}</td>
                                <td className="border p-2">
                                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                </td>
                                <td className="border p-2">
                                    <button
                                        onClick={() =>
                                            setOpenMenuId(openMenuId === mod.id ? null : mod.id)
                                        }
                                        className="bg-yellow-400 text-white px-2 py-1 rounded"
                                    >
                                        ...
                                    </button>

                                    {openMenuId === mod.id && (
                                        <div className="absolute z-10 right-0 mt-1 bg-white border shadow-md rounded w-28">
                                            <button
                                                onClick={() => handleEdit(mod)}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(mod.id)}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-2 text-sm text-gray-600">
                    Showing 1 to {modules.length} of {modules.length} entries
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingModule && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Update Module</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Modules Name Manu/Nav bar Name
                                </label>
                                <input
                                    name="moduleName"
                                    value={editingModule.moduleName}
                                    onChange={handleEditInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Controller Name *
                                </label>
                                <input
                                    name="controllerName"
                                    value={editingModule.controllerName}
                                    onChange={handleEditInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Icon</label>
                                <input
                                    name="iconName"
                                    value={editingModule.iconName}
                                    onChange={handleEditInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Operations Access
                                </label>
                                <input
                                    name="operations"
                                    value={editingModule.operations}
                                    onChange={handleEditInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6 gap-2">
                            <button
                                className="px-4 py-2 border rounded"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
