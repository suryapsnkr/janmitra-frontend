'use client';
import { useState } from 'react';

export default function AddMonthlyPackage() {
  const [packageName, setPackageName] = useState('');
  const [packagePrice, setPackagePrice] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([
    { category: '', subCategory: '', product: '', unit: '', quantity: '' },
  ]);

  const handleAddMore = () => {
    setProducts([
      ...products,
      { category: '', subCategory: '', product: '', unit: '', quantity: '' },
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  return (
    <div className="p-6 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Add Monthly Package</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Combo (Package Name)</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="Enter package name"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Combo (Package Price)</label>
          <input
            type="number"
            value={packagePrice}
            onChange={(e) => setPackagePrice(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="Enter price"
          />
        </div>
      </div>

      {/* Product Table Headers */}
      <div className="overflow-auto mb-2">
        <div className="grid grid-cols-6 md:grid-cols-7 bg-gray-200 text-sm font-semibold px-2 py-2 rounded-t">
          <div className="px-2">Select Category</div>
          <div className="px-2">Select Sub-Category</div>
          <div className="px-2">Select Product</div>
          <div className="px-2">Unit</div>
          <div className="px-2">Quantity</div>
          <div className="px-2 col-span-2 text-center">Action</div>
        </div>

        {/* Product Rows */}
        {products.map((item, idx) => (
          <div key={idx} className="grid grid-cols-6 md:grid-cols-7 bg-blue-100 px-2 py-2 mb-[1px]">
            <select
              className="border rounded px-2 py-1 text-sm mr-2"
              value={item.category}
              onChange={(e) => handleChange(idx, 'category', e.target.value)}
            >
              <option>Select Category</option>
            </select>
            <select
              className="border rounded px-2 py-1 text-sm mr-2"
              value={item.subCategory}
              onChange={(e) => handleChange(idx, 'subCategory', e.target.value)}
            >
              <option>Select Sub-Category</option>
            </select>
            <select
              className="border rounded px-2 py-1 text-sm mr-2"
              value={item.product}
              onChange={(e) => handleChange(idx, 'product', e.target.value)}
            >
              <option>Select Product</option>
            </select>
            <select
              className="border rounded px-2 py-1 text-sm mr-2"
              value={item.unit}
              onChange={(e) => handleChange(idx, 'unit', e.target.value)}
            >
              <option>Select Unit</option>
            </select>
            <input
              type="number"
              className="border rounded px-2 py-1 text-sm mr-2"
              value={item.quantity}
              onChange={(e) => handleChange(idx, 'quantity', e.target.value)}
              placeholder="Qty"
            />
            <div className="col-span-2 text-center">
              {products.length > 1 && (
                <button
                  onClick={() => handleRemove(idx)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <button
          onClick={handleAddMore}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
        >
          Add More
        </button>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">Combo (Package Description)</label>
        <textarea
          className="w-full border px-3 py-2 rounded text-sm"
          rows={4}
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded text-sm"
        >
          📄 Add Product
        </button>
      </div>
    </div>
  );
}
