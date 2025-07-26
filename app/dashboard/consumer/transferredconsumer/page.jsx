'use client';

import { useState } from 'react';

export default function TransferredConsumerPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reports = [
    'Consumer Transfer Report 1',
    'Consumer Transfer Report 2',
    'Consumer Transfer Report 3',
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < reports.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded shadow-sm px-4 py-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Consumer Transfer Report
        </h2>

        <div className="flex items-center justify-between border border-gray-200 rounded p-2 bg-gray-50">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`text-gray-500 hover:text-gray-700 transition ${
              activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="text-lg">{'◀'}</span>
          </button>

          <div className="text-center flex-1 text-sm font-medium text-gray-600">
            {reports[activeIndex]}
          </div>

          <button
            onClick={handleNext}
            disabled={activeIndex === reports.length - 1}
            className={`text-gray-500 hover:text-gray-700 transition ${
              activeIndex === reports.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <span className="text-lg">{'▶'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
