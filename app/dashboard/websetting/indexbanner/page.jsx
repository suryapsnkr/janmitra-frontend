"use client";
import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, X } from "lucide-react";

export default function IndexBannerPage() {
  const [banners, setBanners] = useState([
    { id: 1, image: "/images/banner1.jpg", createdAt: "13-Jul-2023" },
    { id: 2, image: "/images/banner2.jpg", createdAt: "04-Aug-2023" },
    { id: 3, image: "/images/banner3.jpg", createdAt: "04-Aug-2023" },
    { id: 4, image: "/images/banner4.jpg", createdAt: "04-Aug-2023" },
    { id: 5, image: "/images/banner5.jpg", createdAt: "04-Aug-2023" },
  ]);

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleAddBanner = () => {
    if (selectedFile) {
      const newBanner = {
        id: Date.now(),
        image: URL.createObjectURL(selectedFile),
        createdAt: new Date().toLocaleDateString("en-GB"),
      };
      setBanners([...banners, newBanner]);
      setShowAddModal(false);
      setSelectedFile(null);
    }
  };

  const handleEditBanner = () => {
    if (selectedFile && editingBanner) {
      const updated = banners.map((b) =>
        b.id === editingBanner.id
          ? {
              ...b,
              image: URL.createObjectURL(selectedFile),
              createdAt: new Date().toLocaleDateString("en-GB"),
            }
          : b
      );
      setBanners(updated);
      setShowEditModal(false);
      setEditingBanner(null);
      setSelectedFile(null);
    }
  };

  const handleDelete = (id) => {
    setBanners(banners.filter((b) => b.id !== id));
    setActiveDropdown(null);
  };

  const filteredBanners = banners.filter((banner, index) => {
    const q = search.toLowerCase();
    const srNo = (index + 1).toString();
    return (
      srNo.includes(q) ||
      banner.createdAt.toLowerCase().includes(q) ||
      banner.image.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Banner List</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Website Banner
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm">Show</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm">entries</span>
          </div>

          <div className="mt-2 sm:mt-0">
            <label className="text-sm mr-1">Search:</label>
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm"
              placeholder="Search by Sr. No., Date or Image"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Sr. No.</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Create Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBanners.map((banner, index) => (
              <tr key={banner.id}>
                <td className="px-4 py-2">{index + 1}.</td>
                <td className="px-4 py-2">
                  <Image
                    src={banner.image}
                    alt={`Banner ${index + 1}`}
                    width={80}
                    height={60}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-2">{banner.createdAt}</td>
                <td className="px-4 py-2 relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === banner.id ? null : banner.id
                      )
                    }
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {activeDropdown === banner.id && (
                    <div className="absolute w-32 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => {
                          setEditingBanner(banner);
                          setShowEditModal(true);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
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

        {/* Footer */}
        <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
          <div>
            Showing 1 to {filteredBanners.length} of {banners.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded text-gray-400 bg-gray-100" disabled>
              Previous
            </button>
            <span className="bg-blue-600 text-white px-3 py-1 rounded">1</span>
            <button className="px-2 py-1 border rounded bg-white">Next</button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          title="Add Index Banner"
          submitLabel="Add Banner Image"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddBanner}
          onFileChange={handleFileChange}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          title="Update Banner Image"
          submitLabel="Update Banner Image"
          onClose={() => {
            setShowEditModal(false);
            setEditingBanner(null);
            setSelectedFile(null);
          }}
          onSubmit={handleEditBanner}
          onFileChange={handleFileChange}
        />
      )}
    </div>
  );
}

// Modal Component
function Modal({ title, onClose, onSubmit, submitLabel, onFileChange }) {
  return (
    <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X />
        </button>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">{title}</label>
          <input
            type="file"
            onChange={onFileChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onSubmit}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
