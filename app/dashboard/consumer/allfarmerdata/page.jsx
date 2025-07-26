'use client';

import { useState } from 'react';

export default function AllFarmerData() {
  const [search, setSearch] = useState('');
  const farmers = []; // Empty mock data for now

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">All Farmer</h2>

      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between mb-4">
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
              className="border rounded px-2 py-1 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-left text-sm font-semibold">
              <tr>
                <th className="px-4 py-2 border">Sr. No.</th>
                <th className="px-4 py-2 border">Profile Id</th>
                <th className="px-4 py-2 border">Farmer Name</th>
                <th className="px-4 py-2 border">Mobile No.</th>
                <th className="px-4 py-2 border">Farming Type</th>
                <th className="px-4 py-2 border">Create Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-sm py-4">
                    No data available in table
                  </td>
                </tr>
              ) : (
                filteredFarmers.map((farmer, index) => (
                  <tr key={farmer.id} className="text-sm text-gray-700">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{farmer.profileId}</td>
                    <td className="px-4 py-2 border">{farmer.name}</td>
                    <td className="px-4 py-2 border">{farmer.mobile}</td>
                    <td className="px-4 py-2 border">{farmer.farmingType}</td>
                    <td className="px-4 py-2 border">{farmer.createdAt}</td>
                    <td className="px-4 py-2 border">{farmer.status}</td>
                    <td className="px-4 py-2 border">...</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>
            Showing 0 to 0 of 0 entries
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 border rounded text-gray-400" disabled>Previous</button>
            <button className="px-2 py-1 border rounded text-gray-400" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
