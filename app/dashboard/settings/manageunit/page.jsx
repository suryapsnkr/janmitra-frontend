'use client';

import { useState } from 'react';

export default function ManageUnit() {
  const [units, setUnits] = useState([
    '10 Gm', '20 Gm', '30 Gm', '50 Gm', '150 Gm',
    '100 Gm', '200 Gm', '250 Gm', '500 Gm', '1 Kg',
    '2 Kg', '5 Kg', '10 Kg', '15 Kg', '20 Kg',
    '25 Kg', '50 Kg'
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newUnit, setNewUnit] = useState('');

  const handleSubmit = () => {
    if (newUnit.trim() !== '') {
      setUnits([newUnit, ...units]);
      setNewUnit('');
      setShowModal(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Unit Details</h2>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Unit Details</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            Add Unit
          </button>
        </div>

        {/* Table controls */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select className="border rounded px-2 py-1 text-sm">
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
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-sm text-left text-gray-700">
                <th className="px-4 py-2 border">Sr. No.</th>
                <th className="px-4 py-2 border">Unit Name</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {units.slice(0, 10).map((unit, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{unit}</td>
                  <td className="px-4 py-2 border">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <button className="text-blue-600 border border-blue-400 hover:bg-blue-100 text-xs px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 border border-red-400 hover:bg-red-100 text-xs px-3 py-1 rounded">
                      Deactive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>Showing 1 to 10 of {units.length} entries</div>
          <div className="space-x-1">
            <button className="px-2 py-1 border rounded text-gray-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-200">
              2
            </button>
            <button className="px-2 py-1 border rounded hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Unit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Unit Detail</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder="100 Gm / 100 Litre"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            {/* Close button (X) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
