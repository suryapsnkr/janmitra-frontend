'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AllConsumerPage() {
  const [search, setSearch] = useState('');

  const consumers = [
    {
      id: 1,
      gmId: 'JMU168725747',
      name: 'test',
      mobile: '1234567999',
      email: 'testnew@gmail.com',
      salary: '₹0',
      createDate: 'Sat, 30 Dec,2023',
      image: '/icons/avatar1.png',
      status: 'Pending',
    },
    {
      id: 2,
      gmId: 'JMU657473935',
      name: 'Mamta Meena',
      mobile: '8764417717',
      email: 'mamta@gmail.com',
      salary: '₹0',
      createDate: 'Sun, 17 Dec,2023',
      image: '/icons/avatar2.png',
      status: 'Approved',
    },
    {
      id: 3,
      gmId: 'JMU789337943',
      name: 'Sharad Roonwal',
      mobile: '9375519551',
      email: 'finalaeee@gmail.com',
      salary: '₹0',
      createDate: 'Fri, 08 Dec,2023',
      image: '/icons/avatar3.png',
      status: 'Approved',
    },
    // Add more consumer mock data...
  ];

  const filteredConsumers = consumers.filter((consumer) =>
    consumer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Consumer</h2>
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <div>
            <label className="text-sm mr-2">Show</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="ml-2 text-sm">entries</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Search:</label>
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="min-w-full text-sm text-left border-t">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">G.M Id</th>
              <th className="px-4 py-2 border">Consumer Name</th>
              <th className="px-4 py-2 border">Mobile No.</th>
              <th className="px-4 py-2 border">Email Id</th>
              <th className="px-4 py-2 border">Salary</th>
              <th className="px-4 py-2 border">Create Date</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsumers.map((consumer, index) => (
              <tr key={consumer.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}.</td>
                <td className="px-4 py-2 border">{consumer.gmId}</td>
                <td className="px-4 py-2 border">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {consumer.name}
                  </span>
                </td>
                <td className="px-4 py-2 border">{consumer.mobile}</td>
                <td className="px-4 py-2 border">{consumer.email}</td>
                <td className="px-4 py-2 border">{consumer.salary}</td>
                <td className="px-4 py-2 border">{consumer.createDate}</td>
                <td className="px-4 py-2 border">
                  <Image
                    src={consumer.image}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border">
                  {consumer.status === 'Approved' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs font-semibold">
                      <span className="w-3 h-3 rounded-full bg-yellow-600 mr-1 inline-block" />
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-300 text-gray-800 text-xs font-semibold">
                      <span className="w-3 h-3 rounded-full bg-gray-600 mr-1 inline-block" />
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium">
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3 border-t">
          <p className="text-sm text-gray-600">
            Showing {filteredConsumers.length > 0 ? '1' : '0'} to{' '}
            {filteredConsumers.length} of {filteredConsumers.length} entries
          </p>
          <div className="space-x-1">
            <button className="px-3 py-1 text-sm bg-gray-200 rounded" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-indigo-500 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm bg-gray-200 rounded">2</button>
            <button className="px-3 py-1 text-sm bg-gray-200 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
