'use client';
import { useState } from 'react';

export default function AllMonthlyPackage() {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Monthly Package',
      price: 3371,
      description: 'first order package order',
      date: '22 Tue 08, 2023',
      status: 'Active',
    },
  ]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = () => {
    // Optional: replace with API call
    setData((prev) =>
      prev.map((item) =>
        item.id === selectedPackage.id ? selectedPackage : item
      )
    );
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">All Monthly Package</h2>

      {/* Search + Show */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="mb-2 md:mb-0">
          <label className="mr-2 text-sm">Show</label>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="ml-2 text-sm">entries</span>
        </div>

        <div>
          <label className="mr-2 text-sm">Search:</label>
          <input
            type="text"
            placeholder="Search"
            className="border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">Package Name</th>
              <th className="px-4 py-2">Package Price</th>
              <th className="px-4 py-2">Package Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pkg, idx) => (
              <tr key={pkg.id} className="bg-white border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  <span className="bg-red-400 text-white text-xs px-3 py-1 rounded">
                    {pkg.name}
                  </span>
                </td>
                <td className="px-4 py-2">{pkg.price}</td>
                <td className="px-4 py-2">{pkg.date}</td>
                <td className="px-4 py-2">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs">
                    {pkg.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setShowModal(true);
                    }}
                    className="text-blue-600 border border-blue-400 hover:bg-blue-50 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div>
          Showing 1 to {data.length} of {data.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded bg-gray-100 text-gray-500" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border rounded bg-indigo-500 text-white">1</button>
          <button className="px-3 py-1 border rounded bg-gray-100 text-gray-500" disabled>
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Product Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Monthly (Package Name)
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedPackage.name}
                  onChange={(e) =>
                    setSelectedPackage({
                      ...selectedPackage,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Monthly (Package Price)
                </label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedPackage.price}
                  onChange={(e) =>
                    setSelectedPackage({
                      ...selectedPackage,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Monthly (Package Description)
              </label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                rows={4}
                value={selectedPackage.description || ''}
                onChange={(e) =>
                  setSelectedPackage({
                    ...selectedPackage,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-green-500 text-white"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
