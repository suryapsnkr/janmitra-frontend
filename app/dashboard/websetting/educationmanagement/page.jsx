'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function EducationManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const [educationList, setEducationList] = useState([
        {
            id: 1,
            title: "कार्यालय प्रबंधक",
            name: "Aditi",
            image: "/images/1.png",
            date: "12-Aug-2024",
        },
        {
            id: 2,
            title: "प्रबंधक",
            name: "श्री अतुल कुमार ओझा",
            image: "/images/2.png",
            date: "04-Aug-2023",
        },
    ]);

    const filteredList = educationList.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetForm = () => {
        setTitle('');
        setName('');
        setImage(null);
    };

    const handleAdd = () => {
        const newEntry = {
            id: educationList.length + 1,
            title,
            name,
            image: image ? URL.createObjectURL(image) : '/images/default.png',
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        };
        setEducationList([...educationList, newEntry]);
        setShowAddModal(false);
        resetForm();
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        const data = educationList[index];
        setTitle(data.title);
        setName(data.name);
        setImage(null);
        setShowEditModal(true);
        setDropdownOpen(null);
    };

    const handleUpdate = () => {
        const updatedList = [...educationList];
        updatedList[editIndex] = {
            ...updatedList[editIndex],
            title,
            name,
            image: image ? URL.createObjectURL(image) : updatedList[editIndex].image,
        };
        setEducationList(updatedList);
        setShowEditModal(false);
        resetForm();
    };

    const handleDelete = (index) => {
        const confirmDelete = confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        const updatedList = educationList.filter((_, i) => i !== index);
        setEducationList(updatedList);
        setDropdownOpen(null);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Education Management List</h2>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Education Management
                </button>
            </div>

            {/* Search + Filter */}
            <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center space-x-2">
                    <label>Show</label>
                    <select className="border rounded px-2 py-1">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span>entries</span>
                </div>
                <div>
                    <label className="text-sm mr-2">Search:</label>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border px-3 py-1 rounded text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">Sr. No.</th>
                            <th className="border px-3 py-2">Title</th>
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2">Image</th>
                            <th className="border px-3 py-2">Create Date</th>
                            <th className="border px-3 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="border px-3 py-2">{index + 1}</td>
                                <td className="border px-3 py-2">{item.title}</td>
                                <td className="border px-3 py-2">{item.name}</td>
                                <td className="border px-3 py-2">
                                    <Image src={item.image} alt="User" width={50} height={50} className="rounded" />
                                </td>
                                <td className="border px-3 py-2">{item.date}</td>
                                <td className="border px-3 py-2 relative">
                                    <button
                                        onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        ...
                                    </button>

                                    {dropdownOpen === index && (
                                        <div className="absolute right-0 z-10 mt-2 w-28 bg-white border rounded shadow text-sm">
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                                onClick={() => handleDelete(index)}
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
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <p>Showing 1 to {filteredList.length} of {educationList.length} entries</p>
                <div className="flex space-x-2">
                    <button className="px-2 py-1 border rounded text-gray-500" disabled>Previous</button>
                    <button className="px-2 py-1 border rounded bg-blue-500 text-white">1</button>
                    <button className="px-2 py-1 border rounded text-gray-500" disabled>Next</button>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <Modal
                    title="Add Education Management"
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAdd}
                    buttonText="Add Management"
                    titleValue={title}
                    nameValue={name}
                    setTitle={setTitle}
                    setName={setName}
                    setImage={setImage}
                />
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <Modal
                    title="Update Education Management"
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleUpdate}
                    buttonText="Update Management"
                    titleValue={title}
                    nameValue={name}
                    setTitle={setTitle}
                    setName={setName}
                    setImage={setImage}
                />
            )}
        </div>
    );
}

// 🧩 Reusable Modal Component
function Modal({
    title,
    onClose,
    onSubmit,
    buttonText,
    titleValue,
    nameValue,
    setTitle,
    setName,
    setImage,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className="bg-white rounded shadow-md w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Management Title</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={titleValue}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Management Title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Management Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={nameValue}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Management Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="block-file-input mt-1"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
                        Close
                    </button>
                    <button onClick={onSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
