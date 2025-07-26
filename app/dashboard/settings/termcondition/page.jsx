'use client';

import React, { useState } from 'react';

export default function TermsConditionPage() {
  const [data, setData] = useState('');

  const handleUpdate = () => {
    console.log("Updated Terms & Condition:", data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Terms & Condition</h2>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-medium mb-4">Terms & Condition</h3>

        <div className="mb-6">
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            rows={10}
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter terms and conditions here..."
          />
        </div>

        <div className="text-right">
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded"
          >
            Update Terms & Condition
          </button>
        </div>
      </div>
    </div>
  );
}
