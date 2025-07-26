'use client';
import { useState } from 'react';

const dummyData = [
  {
    id: 1,
    name: 'Vernita Rasp',
    email: 'rasp.vernita@gmail.com',
    mobile: '817087175',
    subject: 'Make $10k+ a month',
    description: 'Do your own boss, you want a BUSINESS, not a website only?\nThe best value for your money (17k happy clients)\nWe provide you with lifetime sup',
  },
  {
    id: 2,
    name: 'Kyla Cardenas',
    email: 'voxai@increasetraffic.shop',
    mobile: '070 7318 6106',
    subject: 'BIG Goldmine: AI Turns Any URL...',
    description: 'AI-generated content tool with bulk features and keyword optimization.',
  },
  {
    id: 3,
    name: 'Branden Booth',
    email: 'morrismi1@outlook.com',
    mobile: '055 392 39 31',
    subject: 'Hello janmitraudyog.com Admin.',
    description: 'Follow-up on your website contact query.',
  },
  // Add more entries as needed
];

export default function WebContactQueryPage() {
  const [data] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [currentDescription, setCurrentDescription] = useState('');

  const filteredData = data.filter((entry) =>
    Object.values(entry).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  const handleShowDescription = (desc) => {
    setCurrentDescription(desc);
    setShowDescriptionModal(true);
  };

  return (
    <div className="p-6">
      <div className="text-lg font-semibold mb-4">Contact Query</div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-sm">
          Show{' '}
          <select className="border px-2 py-1 rounded">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>{' '}
          entries
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

      <div className="overflow-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100 text-sm font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">Sr. No.</th>
              <th className="px-4 py-2 text-left">Member Name</th>
              <th className="px-4 py-2 text-left">Email Id</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredData.map((entry, index) => (
              <tr key={entry.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{entry.name}</td>
                <td className="px-4 py-2">{entry.email}</td>
                <td className="px-4 py-2">{entry.mobile}</td>
                <td className="px-4 py-2">{entry.subject}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleShowDescription(entry.description)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Description
                  </button>
                </td>
                <td className="px-4 py-2 relative">
                  <button
                    onClick={() => toggleDropdown(entry.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    ...
                  </button>
                  {dropdownOpenId === entry.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                      <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                        Edit
                      </button>
                      <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-red-600">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 text-sm flex justify-between items-center">
          <span>
            Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {data.length}{' '}
            entries
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border rounded text-gray-400 bg-white">Previous</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 border rounded ${
                  page === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border rounded bg-white text-gray-700">Next</button>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {showDescriptionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b font-semibold text-lg">
              <span>Description</span>
              <button
                className="text-gray-500 hover:text-black text-xl"
                onClick={() => setShowDescriptionModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                readOnly
                rows={4}
                className="w-full border rounded px-3 py-2 text-sm resize-none"
                value={currentDescription}
              ></textarea>
            </div>
            <div className="p-4 pt-0 text-right">
              <button
                onClick={() => setShowDescriptionModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
