'use client';
import { useState } from 'react';

export default function WebMemberHelp() {
  const [search, setSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-sm text-gray-600 mb-2">Jan Mitra / <span className="font-semibold">Member List</span></div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Member List</h2>

        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[10, 25, 50, 100].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <span className="text-sm">entries</span>
          </div>

          <div>
            <label className="text-sm mr-2">Search:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
              placeholder=""
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100 border-b font-semibold">
              <tr>
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Member Name</th>
                <th className="px-4 py-2">Email Id</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600">
          <div>
            Showing 0 to 0 of 0 entries
          </div>
          <div className="space-x-2 mt-2 sm:mt-0">
            <button className="px-3 py-1 rounded border bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded border bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
