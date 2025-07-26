"use client";

import React, { useState } from 'react';

export default function AddProductPage() {
  const [product, setProduct] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Add Product</h1>

      <div className="border rounded-lg p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Product Name</label>
            <input name="productName" onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <select className="w-full border p-2 rounded">
              <option>Choose Category</option>
              <option value="cat1">Category 1</option>
              <option value="cat2">Category 2</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Sub Category</label>
            <select className="w-full border p-2 rounded">
              <option>Choose Sub Category</option>
              <option value="sub1">Sub Category 1</option>
              <option value="sub2">Sub Category 2</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Unit</label>
            <select className="w-full border p-2 rounded">
              <option>Select Unit</option>
              <option value="kg">Kg</option>
              <option value="gm">Gm</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">MRP</label>
            <input name="mrp" onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">Quantity</label>
            <input name="quantity" onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1">Discount</label>
            <select className="w-full border p-2 rounded">
              <option>Select Discount Offer</option>
              <option value="none">None</option>
              <option value="offer1">Offer 1</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded">
          <div>
            <label className="block mb-1">Shelf Life</label>
            <select className="w-full border p-2 rounded">
              <option>Choose Lifespan</option>
              <option value="1month">1 Month</option>
              <option value="6months">6 Months</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Expire Date</label>
            <input type="date" name="expiryDate" onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block mb-1">Disclaimer</label>
          <textarea name="disclaimer" rows={3} onChange={handleInputChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Body</label>
          <textarea name="body" rows={3} onChange={handleInputChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Key Features</label>
          <textarea name="keyFeatures" rows={3} onChange={handleInputChange} className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Product Main Image</label>
            <input type="file" className="block-file-input w-full" />
          </div>
          <div>
            <label className="block mb-1">Product Secondary Image</label>
            <input type="file" className="block-file-input w-full" />
          </div>
          <div>
            <label className="block mb-1">Product Image 3</label>
            <input type="file" className="block-file-input w-full" />
          </div>
          <div>
            <label className="block mb-1">Product Image 4</label>
            <input type="file" className="block-file-input w-full" />
          </div>
        </div>

        <div>
          <label className="block mb-1">Product Description</label>
          <textarea name="productDescription" rows={4} onChange={handleInputChange} className="w-full border p-2 rounded" />
        </div>

        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Product</button>
      </div>
    </div>
  );
}
