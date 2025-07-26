"use client";

import { useState } from "react";

export default function AddPincodePage() {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [pincodes, setPincodes] = useState([]);

    const [pincodeData, setPincodeData] = useState({
        pincode: "",
        deliveryTime: "",
        status: "Active",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPincodeData({
            ...pincodeData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            setPincodes(
                pincodes.map((pin) =>
                    pin.id === editingId ? { ...pincodeData, id: editingId } : pin
                )
            );
        } else {
            setPincodes([
                ...pincodes,
                { ...pincodeData, id: pincodes.length + 1 },
            ]);
        }

        setPincodeData({
            pincode: "",
            deliveryTime: "",
            status: "Active",
        });
        setOpen(false);
        setEditMode(false);
        setEditingId(null);
    };

    const openEditPopup = (pin) => {
        setPincodeData(pin);
        setOpen(true);
        setEditMode(true);
        setEditingId(pin.id);
    };

    const filteredPincodes = pincodes.filter((pin) =>
        pin.pincode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.deliveryTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">All Pincodes</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => {
                        setPincodeData({
                            pincode: "",
                            deliveryTime: "",
                            status: "Active",
                        });
                        setEditMode(false);
                        setOpen(true);
                    }}
                >
                    Add Pincode
                </button>
            </div>

            {/* Search bar with label */}
            <div className="flex justify-end items-center gap-2 mb-4">
                <label className="text-sm font-medium">Search:</label>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border px-3 py-1 rounded text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="overflow-auto border rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-3 py-2 border">Sr. No.</th>
                            <th className="px-3 py-2 border">Pincode</th>
                            <th className="px-3 py-2 border">Delivery Time</th>
                            <th className="px-3 py-2 border">Status</th>
                            <th className="px-3 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPincodes.length > 0 ? (
                            filteredPincodes.map((pin, idx) => (
                                <tr key={pin.id}>
                                    <td className="border px-3 py-2 text-center">{idx + 1}</td>
                                    <td className="border px-3 py-2">{pin.pincode}</td>
                                    <td className="border px-3 py-2">{pin.deliveryTime}</td>
                                    <td className="border px-3 py-2">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                            {pin.status}
                                        </span>
                                    </td>
                                    <td className="border px-3 py-2 space-x-1">
                                        <button
                                            onClick={() => openEditPopup(pin)}
                                            className="px-2 py-1 text-xs border border-blue-500 text-blue-500 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button className="px-2 py-1 text-xs border border-red-500 text-red-500 rounded">
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No matching pincodes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
                            onClick={() => setOpen(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                            {editMode ? "Update Pincode" : "Add New Pincode"}
                        </h2>
                        <form
                            className="grid grid-cols-1 gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label className="block text-sm font-medium">Pincode *</label>
                                <input
                                    name="pincode"
                                    value={pincodeData.pincode}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Delivery Time *</label>
                                <input
                                    name="deliveryTime"
                                    value={pincodeData.deliveryTime}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    name="status"
                                    value={pincodeData.status}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    {editMode ? "Update" : "Submit"}
                                </button>
                            </div>
                        </form>
                        <p className="text-red-500 text-sm mt-2">* Field is required</p>
                    </div>
                </div>
            )}
        </div>
    );
}
