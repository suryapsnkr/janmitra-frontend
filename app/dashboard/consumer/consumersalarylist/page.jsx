'use client';

import { useState } from 'react';

const mockData = [
  { id: 1, name: 'test', salary: 0 },
  { id: 2, name: 'Mamta Meena', salary: 0 },
  { id: 3, name: 'Sharad Roonwal', salary: 0 },
  { id: 4, name: 'test', salary: 0 },
  { id: 5, name: 'User', salary: 0 },
  { id: 6, name: 'Krishan Kumar Sharma', salary: 0 },
  { id: 7, name: 'Charan Singh', salary: 0 },
  { id: 8, name: 'Smt Suman Mishra', salary: 0 },
  { id: 9, name: 'Balendu Prasad', salary: 0 },
  { id: 10, name: 'Basant bahar', salary: 0 },
];

export default function ConsumerSalaryList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">All Consumer</h2>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm">Show</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm">entries</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Search:</label>
            <input
              type="text"
              className="border px-2 py-1 rounded text-sm"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold">
                <th className="px-4 py-2 border">Sr. No.</th>
                <th className="px-4 py-2 border">Consumer Name</th>
                <th className="px-4 py-2 border">Salary</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="text-sm text-gray-700">
                  <td className="px-4 py-2 border">{index + 1}.</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">₹{item.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing 1 to {filteredData.length} of {mockData.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded border text-gray-500" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-indigo-500 text-white">1</button>
            <button className="px-2 py-1 rounded border text-gray-700">2</button>
            <button className="px-2 py-1 rounded border text-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
