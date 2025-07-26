'use client';
import { useState } from 'react';

export default function ReportGenerate() {
  const [filters, setFilters] = useState({
    warehouse: '',
    productName: '',
    productUnit: '',
    fromDate: '',
    toDate: '',
  });

  return (
    <div className="p-6 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Report Generate</h2>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Select Warehouse</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Select Warehouse</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Product Name (Optional)</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Select Product Name</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Product Unit (Optional)</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Select Product Unit</option>
          </select>
        </div>
      </div>

      {/* Date Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">From Date</label>
          <input type="date" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">To Date</label>
          <input type="date" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm">
            Submit
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-4 border-t">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm">Show</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm">entries</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border rounded px-3 py-1 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Firm Name</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Product Unit</th>
                <th className="px-4 py-2">Product Qty.</th>
                <th className="px-4 py-2">Report Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Create Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded bg-gray-200 text-gray-500" disabled>
              Previous
            </button>
            <span className="px-3 py-1 border rounded bg-blue-500 text-white">1</span>
            <button className="px-2 py-1 border rounded bg-gray-200 text-gray-500" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
