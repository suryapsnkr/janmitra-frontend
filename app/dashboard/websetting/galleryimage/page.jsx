'use client';

import { useState } from 'react';

export default function GalleryImagePage() {
  const [gallery, setGallery] = useState([
    { id: 1, image: '/gallery/1.png', date: '05-Aug-2023' },
    { id: 2, image: '/gallery/2.png', date: '05-Aug-2023' },
    { id: 3, image: '/gallery/3.png', date: '05-Aug-2023' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingImage, setEditingImage] = useState(null); // null for add, object for edit
  const [actionDropdownId, setActionDropdownId] = useState(null); // track which row's dropdown is open

  const filteredData = gallery.filter((item) =>
    item.id.toString().includes(searchTerm)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesToShow,
    currentPage * entriesToShow
  );

  const totalPages = Math.ceil(filteredData.length / entriesToShow);

  const handleAddOrUpdate = () => {
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    const date = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    if (editingImage) {
      // Update
      setGallery((prev) =>
        prev.map((img) =>
          img.id === editingImage.id ? { ...img, image: imageUrl } : img
        )
      );
    } else {
      // Add
      const newId = gallery.length > 0 ? gallery[gallery.length - 1].id + 1 : 1;
      setGallery((prev) => [...prev, { id: newId, image: imageUrl, date }]);
    }

    // Reset
    setShowModal(false);
    setSelectedFile(null);
    setEditingImage(null);
  };

  const handleDelete = (id) => {
    setGallery((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Gallery List</h2>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingImage(null);
            setSelectedFile(null);
            setShowModal(true);
          }}
        >
          Add Gallery Image
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <label className="mr-2 text-sm">Show</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={entriesToShow}
            onChange={(e) => {
              setEntriesToShow(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
          <span className="ml-2 text-sm">entries</span>
        </div>

        <div>
          <label className="text-sm mr-2">Search:</label>
          <input
            type="text"
            className="border rounded px-2 py-1 text-sm"
            placeholder="Search by Sr. No."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-sm border">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 w-16">Sr. No.</th>
              <th className="px-4 py-3">Gallery Image</th>
              <th className="px-4 py-3">Create Date</th>
              <th className="px-4 py-3 w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-3 text-center">
                  No entries found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="border-t relative">
                  <td className="px-4 py-3">{item.id}.</td>
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={`Gallery ${item.id}`}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={() =>
                        setActionDropdownId(
                          actionDropdownId === item.id ? null : item.id
                        )
                      }
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    >
                      ...
                    </button>

                    {actionDropdownId === item.id && (
                      <div className="absolute right-0 mt-1 bg-white border shadow z-10 rounded w-28">
                        <button
                          onClick={() => {
                            setEditingImage(item);
                            setShowModal(true);
                            setActionDropdownId(null);
                          }}
                          className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                            setActionDropdownId(null);
                          }}
                          className="w-full px-4 py-2 text-sm hover:bg-red-100 text-left text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <div>
          Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * entriesToShow + 1} to{' '}
          {Math.min(currentPage * entriesToShow, filteredData.length)} of{' '}
          {filteredData.length} entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1 border bg-indigo-100 rounded">{currentPage}</span>
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative">
            <h2 className="text-lg font-semibold mb-4">
              {editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
            </h2>

            <label className="block mb-2 text-sm font-medium">Gallery Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="block w-full text-sm border rounded px-3 py-2 mb-6"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedFile(null);
                  setEditingImage(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
                disabled={!selectedFile}
              >
                {editingImage ? 'Update' : 'Add'} Gallery Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
