'use client';

import React, { useState } from 'react';

export default function PrivacyPolicyPage() {
  const [policy, setPolicy] = useState('');

  const handleUpdate = () => {
    console.log('Privacy Policy Updated:', policy);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Privacy Policy</h2>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-medium mb-4">Privacy Policy</h3>

        <div className="mb-6">
          <textarea
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            rows={10}
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter privacy policy here..."
          />
        </div>

        <div className="text-right">
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            📝 Update Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
