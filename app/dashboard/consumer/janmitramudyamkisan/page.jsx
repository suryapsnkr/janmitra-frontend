'use client';

import { useState } from 'react';

export default function JanmitraMudyamKisan() {
  const [profileId, setProfileId] = useState('');

  const handleVerify = () => {
    console.log('Verifying Profile ID:', profileId);
    // Add your API call or logic here
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add New Farmer
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Profile Id
            </label>
            <input
              type="text"
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Profile ID"
            />
          </div>

          <div>
            <button
              onClick={handleVerify}
              className="bg-indigo-500 text-white px-6 py-2 mt-6 rounded hover:bg-indigo-600 transition text-sm"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
