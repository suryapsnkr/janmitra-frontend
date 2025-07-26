'use client';

import { useState } from 'react';

export default function ManageUnitPage() {
  const [units] = useState([]); // Placeholder for units list

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Member List</h2>
        <nav className="text-sm text-gray-500">
          Jan Mitra / <span className="text-gray-700 font-medium">Member List</span>
        </nav>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="entries" className="text-sm">Show</label>
            <select
              id="entries"
              className="border rounded px-2 py-1 text-sm"
              defaultValue={10}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm">entries</span>
          </div>
          <div>
            <label className="text-sm mr-2">Search:</label>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-1 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2 font-semibold">Sr. No.</th>
                <th className="border px-4 py-2 font-semibold">Member Name</th>
                <th className="border px-4 py-2 font-semibold">Email Id</th>
                <th className="border px-4 py-2 font-semibold">Image</th>
                <th className="border px-4 py-2 font-semibold">Mobile</th>
                <th className="border px-4 py-2 font-semibold">Description</th>
                <th className="border px-4 py-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {units.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                units.map((unit, index) => (
                  <tr key={unit.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{unit.name}</td>
                    <td className="border px-4 py-2">{unit.email}</td>
                    <td className="border px-4 py-2">
                      <img src={unit.image} alt="member" className="h-8 w-8 rounded-full object-cover" />
                    </td>
                    <td className="border px-4 py-2">{unit.mobile}</td>
                    <td className="border px-4 py-2">{unit.description}</td>
                    <td className="border px-4 py-2">
                      {/* Action Buttons */}
                      <div className="space-x-2">
                        <button className="text-blue-600 hover:underline">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <div>Showing 0 to 0 of 0 entries</div>
          <div>
            <button className="px-3 py-1 border rounded mr-2 text-gray-400" disabled>Previous</button>
            <button className="px-3 py-1 border rounded text-gray-400" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
