'use client';

import { useState } from 'react';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      title: 'this is testing two manali',
      description: 'this is testing two description manali',
      date: '2021-11-01 05:41:22',
      status: 'Active',
    },
    {
      id: 2,
      title: 'this is testing one',
      description: 'this is purpose one',
      date: '0000-00-00 00:00:00',
      status: 'Active',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editId, setEditId] = useState(null);

  const handleDeactivate = (id) => {
    setFaqs(prev =>
      prev.map(faq =>
        faq.id === id ? { ...faq, status: 'Inactive' } : faq
      )
    );
  };

  const handleAddFaq = () => {
    const newFaq = {
      id: faqs.length + 1,
      title: newTitle,
      description: newDesc,
      date: new Date().toISOString().split('.')[0].replace('T', ' '),
      status: 'Active',
    };
    setFaqs([...faqs, newFaq]);
    setNewTitle('');
    setNewDesc('');
    setIsAddModalOpen(false);
  };

  const handleEdit = (id) => {
    const faqToEdit = faqs.find((faq) => faq.id === id);
    if (faqToEdit) {
      setEditId(id);
      setNewTitle(faqToEdit.title);
      setNewDesc(faqToEdit.description);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateFaq = () => {
    setFaqs(prev =>
      prev.map(faq =>
        faq.id === editId
          ? { ...faq, title: newTitle, description: newDesc }
          : faq
      )
    );
    setIsEditModalOpen(false);
    setEditId(null);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Faq</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-100 text-blue-700 border border-blue-500 px-4 py-1 rounded hover:bg-blue-200 transition"
        >
          Add Faq
        </button>
      </div>

      <div className="bg-white rounded shadow p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select className="border px-2 py-1 rounded">
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
              placeholder="Search:"
              className="border px-2 py-1 rounded"
            />
          </div>
        </div>

        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">Sr. No.</th>
              <th className="border px-3 py-2">Faq Title</th>
              <th className="border px-3 py-2">Faq Description</th>
              <th className="border px-3 py-2">Create Date</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, index) => (
              <tr key={faq.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">{faq.title}</td>
                <td className="border px-3 py-2">{faq.description}</td>
                <td className="border px-3 py-2">{faq.date}</td>
                <td className="border px-3 py-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {faq.status}
                  </span>
                </td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(faq.id)}
                    className="bg-blue-100 text-blue-700 border border-blue-500 px-3 py-1 rounded hover:bg-blue-200 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeactivate(faq.id)}
                    className="bg-red-100 text-red-700 border border-red-500 px-3 py-1 rounded hover:bg-red-200 text-xs"
                  >
                    Deactive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 text-sm">
          <span>Showing 1 to {faqs.length} of {faqs.length} entries</span>
          <div className="space-x-1">
            <button className="px-3 py-1 border rounded bg-gray-100" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded bg-gray-100" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add FAQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Faq</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 text-2xl">&times;</button>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">
                New Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Faq Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-1">
                Faq Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Faq Description"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={handleAddFaq}
                disabled={!newTitle || !newDesc}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Update Faq</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 text-2xl">&times;</button>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">
                Add Faq Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-1">
                Faq Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={handleUpdateFaq}
                disabled={!newTitle || !newDesc}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
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
