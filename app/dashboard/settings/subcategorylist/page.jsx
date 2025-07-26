'use client';

import { useState } from 'react';

const initialData = [
    { id: 1, category: 'Home Care', subCategory: 'Pooja Needs' },
    { id: 2, category: 'Health Wellness', subCategory: 'Herbal Tea' },
    { id: 3, category: 'Health Wellness', subCategory: 'Herbal Hawan Dhoop' },
    { id: 4, category: 'Home Care', subCategory: 'Dish Washes' },
    { id: 5, category: 'Home Care', subCategory: 'Detergents' },
    { id: 6, category: 'Personal Care', subCategory: 'Body Wash & Bathing Accessories' },
    { id: 7, category: 'Personal Care', subCategory: 'Bath & Hand Wash' },
    { id: 8, category: 'Personal Care', subCategory: 'Skin Care' },
    { id: 9, category: 'Personal Care', subCategory: 'Hair Care' },
    { id: 10, category: 'Grocery & Staples', subCategory: 'Chips' },
];

const categoryOptions = [
    'Home Care',
    'Health Wellness',
    'Personal Care',
    'Grocery & Staples',
];

export default function SubCategoryList() {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');

    const [editId, setEditId] = useState(null);

    // Filtered Search
    const filteredData = data.filter(
        (item) =>
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            item.subCategory.toLowerCase().includes(search.toLowerCase())
    );

    // Add new subcategory
    const handleAdd = () => {
        if (newCategory && newSubCategory) {
            const newItem = {
                id: data.length + 1,
                category: newCategory,
                subCategory: newSubCategory,
            };
            setData([...data, newItem]);
            setShowAddModal(false);
            setNewCategory('');
            setNewSubCategory('');
        } else {
            alert('Please fill all fields.');
        }
    };

    // Start editing
    const openEditModal = (item) => {
        setEditId(item.id);
        setNewCategory(item.category);
        setNewSubCategory(item.subCategory);
        setShowEditModal(true);
        setOpenDropdown(null);
    };

    // Update subcategory
    const handleUpdate = () => {
        const updated = data.map((item) =>
            item.id === editId
                ? { ...item, category: newCategory, subCategory: newSubCategory }
                : item
        );
        setData(updated);
        setShowEditModal(false);
        setEditId(null);
        setNewCategory('');
        setNewSubCategory('');
    };

    // Delete subcategory
    const handleDelete = (id) => {
        const filtered = data.filter((item) => item.id !== id);
        setData(filtered);
        setOpenDropdown(null);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Sub Category List</h2>
                <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Sub Category
                </button>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Add Sub Category</h3>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Select Category</label>
                            <select
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Category</option>
                                {categoryOptions.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Add Sub Category</label>
                            <input
                                type="text"
                                value={newSubCategory}
                                onChange={(e) => setNewSubCategory(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Sub Category"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleAdd}
                                className="bg-indigo-500 text-white px-4 py-2 rounded"
                            >
                                Add Sub Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Update Sub Category</h3>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Select Category</label>
                            <select
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Category</option>
                                {categoryOptions.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Sub Category</label>
                            <input
                                type="text"
                                value={newSubCategory}
                                onChange={(e) => setNewSubCategory(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-indigo-500 text-white px-4 py-2 rounded"
                            >
                                Update Category
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white shadow rounded">
                <div className="p-4 flex justify-between items-center">
                    <div className="text-sm">
                        Show
                        <select className="mx-2 border rounded px-2 py-1 text-sm">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        entries
                    </div>
                    <div>
                        <label className="text-sm mr-2">Search:</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded px-2 py-1 text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left border-t">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Sr. No.</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Sub Category</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, idx) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2 border">{idx + 1}.</td>
                                <td className="px-4 py-2 border">{item.category}</td>
                                <td className="px-4 py-2 border">{item.subCategory}</td>
                                <td className="px-4 py-2 border relative">
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            setOpenDropdown(openDropdown === item.id ? null : item.id)
                                        }
                                    >
                                        ...
                                    </button>
                                    {openDropdown === item.id && (
                                        <div className="absolute right-0 mt-2 w-24 bg-white shadow border rounded z-10">
                                            <button
                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                onClick={() => openEditModal(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                                                onClick={() => handleDelete(item.id)}
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

                <div className="p-4 flex justify-between items-center text-sm">
                    <div>Showing 1 to 10 of {data.length} entries</div>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border rounded bg-gray-100">Previous</button>
                        <button className="px-3 py-1 border rounded bg-indigo-500 text-white">1</button>
                        <button className="px-3 py-1 border rounded bg-gray-100">2</button>
                        <button className="px-3 py-1 border rounded bg-gray-100">3</button>
                        <button className="px-3 py-1 border rounded bg-gray-100">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
