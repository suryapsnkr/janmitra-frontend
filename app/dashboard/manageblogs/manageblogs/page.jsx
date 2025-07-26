'use client';
import { useState } from 'react';
import Image from 'next/image';

const initialBlogs = [
    {
        id: 1,
        title: 'शुद्ध लाएं , स्वाबलि प्रकाशं , स्वदेशी अपनाएं',
        image: '/images/blog1.jpg',
        description: 'शुद्ध सात्विक प्राकृतिक स्वदेशी उत्पाद ही जीवन के लिए उपयोगी और स्वास्थ्य वर्धक है |',
        date: '05-Aug-2023',
        status: true,
    },
    {
        id: 2,
        title: 'प्राकृतिक जीवन',
        image: '/images/blog2.jpg',
        description: 'प्रकृति की सुरम्य वादियों में आत्मानुभव होने और परमात्मा की निकटता का आभास होता है |',
        date: '05-Aug-2023',
        status: true,
    },
    {
        id: 3,
        title: 'जनमित्रम का शुभारम्भ',
        image: '/images/blog3.jpg',
        description: 'वर्क फ्रॉम होम के द्वारा महिला सशक्तिकरण हेतु कार्य योजना का शुभारम्भ जनमित्रम उद्योग द्वारा किया गया है | मुख्यमंत्री वर्क फ्रॉम होम योजना के तहत राजस्थान सरकार के पोर्टल पर आवेदन आमंत्रित है |',
        date: '05-Aug-2023',
        status: true,
    }
];

export default function ManageBlogsPage() {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [search, setSearch] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleDelete = (id) => {
        const filtered = blogs.filter(blog => blog.id !== id);
        setBlogs(filtered);
        setOpenDropdown(null);
    };

    const handleEditOpen = (blog) => {
        setEditData(blog);
        setIsEditModalOpen(true);
        setOpenDropdown(null);
    };

    const handleEditChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdateBlog = () => {
        setBlogs(blogs.map(b => (b.id === editData.id ? editData : b)));
        setIsEditModalOpen(false);
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Blog Manage</h2>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <label className="text-sm mr-2">Show</label>
                    <select className="border px-2 py-1 rounded text-sm">
                        <option>10</option>
                    </select>
                    <span className="ml-2 text-sm">entries</span>
                </div>
                <div>
                    <label className="text-sm mr-2">Search:</label>
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-1 text-sm rounded"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border rounded">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Sr. No.</th>
                            <th className="p-2 border">Blog Title</th>
                            <th className="p-2 border">Blog Image</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Create Date</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlogs.map((blog, idx) => (
                            <tr key={blog.id} className="border-t">
                                <td className="p-2 border">{idx + 1}</td>
                                <td className="p-2 border">{blog.title}</td>
                                <td className="p-2 border">
                                    <Image src={blog.image} alt="Blog" width={60} height={40} className="rounded" />
                                </td>
                                <td className="p-2 border">{blog.description}</td>
                                <td className="p-2 border">{blog.date}</td>
                                <td className="p-2 border">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={blog.status} readOnly />
                                        <div className="w-11 h-6 bg-gray-200 peer-checked:bg-yellow-400 rounded-full transition-all duration-300"></div>
                                    </label>
                                </td>
                                <td className="p-2 border relative">
                                    <button
                                        className="bg-orange-400 text-white px-2 py-1 rounded hover:bg-orange-500"
                                        onClick={() => toggleDropdown(blog.id)}
                                    >
                                        ...
                                    </button>
                                    {openDropdown === blog.id && (
                                        <div className="absolute right-0 mt-2 w-24 bg-white shadow border rounded z-10">
                                            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                                                onClick={() => handleEditOpen(blog)}>Edit</button>
                                            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-red-600"
                                                onClick={() => handleDelete(blog.id)}>Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
                    <div className="bg-white w-[90%] md:w-2/3 lg:w-1/2 rounded shadow-lg p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Update Blogs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Blog Title</label>
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => handleEditChange('title', e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Blog Image</label>
                                <input
                                    type="file"
                                    className="w-full border rounded px-3 py-2"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            handleEditChange('image', url);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Blog Description</label>
                            <textarea
                                value={editData.description}
                                onChange={(e) => handleEditChange('description', e.target.value)}
                                rows={6}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateBlog}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Update Blogs
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 flex justify-between items-center text-sm">
                <span>Showing 1 to {filteredBlogs.length} of {blogs.length} entries</span>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded bg-gray-100 text-gray-600" disabled>
                        Previous
                    </button>
                    <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
                    <button className="px-3 py-1 border rounded bg-gray-100 text-gray-600" disabled>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
