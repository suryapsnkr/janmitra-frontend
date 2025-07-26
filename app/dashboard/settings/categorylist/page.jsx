'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreVertical, X } from 'lucide-react';

export default function CategoryListPage() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'HEALTH CARE',
      image: '/images/category2.png',
    },
    {
      id: 2,
      name: 'मुख्यमंत्री वर्ग फ़ॉर्म होम (महिला एवं बाल विकास रा)',
      image: '/images/category1.png',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!categoryName || !imageFile) return alert('Please fill all fields.');
    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
      image: URL.createObjectURL(imageFile),
    };
    setCategories([...categories, newCategory]);
    setCategoryName('');
    setImageFile(null);
    setShowAddModal(false);
  };

  const handleEditCategory = () => {
    if (!categoryName) return alert('Name is required.');
    const updated = [...categories];
    updated[editIndex] = {
      ...updated[editIndex],
      name: categoryName,
      image: imageFile ? URL.createObjectURL(imageFile) : updated[editIndex].image,
    };
    setCategories(updated);
    setCategoryName('');
    setImageFile(null);
    setEditIndex(null);
    setShowEditModal(false);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setCategoryName(categories[index].name);
    setImageFile(null);
    setShowEditModal(true);
  };

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const updated = [...categories];
      updated.splice(index, 1);
      setCategories(updated);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Category List</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Add Category
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="text-sm">Show</label>
          <select className="border mx-2 px-2 py-1 rounded text-sm">
            <option>10</option>
          </select>
          <span className="text-sm">entries</span>
        </div>
        <div>
            <label className="text-sm mr-2">Search:</label>
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Sr. No.</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat, index) => (
              <tr key={cat.id}>
                <td className="border px-4 py-2">{index + 1}.</td>
                <td className="border px-4 py-2">{cat.name}</td>
                <td className="border px-4 py-2">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                </td>
                <td className="border px-4 py-2 relative">
                  <button
                    onClick={() =>
                      setDropdownOpenId(dropdownOpenId === cat.id ? null : cat.id)
                    }
                    className="p-2 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {dropdownOpenId === cat.id && (
                    <div className="absolute z-10 right-2 mt-2 w-28 bg-white border rounded shadow text-sm">
                      <button
                        onClick={() => {
                          openEditModal(index);
                          setDropdownOpenId(null);
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(index);
                          setDropdownOpenId(null);
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing 1 to {filteredCategories.length} of {categories.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 border rounded text-gray-500">Previous</button>
          <button className="px-3 py-1 border rounded bg-indigo-500 text-white">1</button>
          <button className="px-2 py-1 border rounded text-gray-500">Next</button>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          title="Add Category"
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          setImageFile={setImageFile}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCategory}
          submitText="Add Category"
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          title="Update Category"
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          setImageFile={setImageFile}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditCategory}
          submitText="Update Category"
        />
      )}
    </div>
  );
}

function Modal({
  title,
  categoryName,
  setCategoryName,
  setImageFile,
  onClose,
  onSubmit,
  submitText,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Update Category</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="Category Name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Update Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            {submitText}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
