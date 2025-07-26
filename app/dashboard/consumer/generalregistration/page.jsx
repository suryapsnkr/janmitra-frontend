'use client';

import { useState } from 'react';

export default function GeneralRegistration() {
  const [gmId, setGmId] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleVerify = () => {
    console.log('Verifying...', { gmId, mobileNo });
    // Add your verification logic here
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add New Consumer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gm Id
            </label>
            <input
              type="text"
              value={gmId}
              onChange={(e) => setGmId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter GM ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registered Mobile No
            </label>
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Mobile Number"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleVerify}
            className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition text-sm"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
