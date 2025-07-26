'use client';

import { useState } from 'react';

export default function RejectOrders() {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const rejectedOrders = [
    {
      orderId: '07849722452434244118',
      memberName: 'Dr.Aparna kumari',
      kendraName: 'JANMITRAM-6',
      address: 'nheje',
      createDate: '29 Aug 2023 , 05:23 pm',
      status: 'Rejected',
    },
    {
      orderId: '05826845454394755935',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-2',
      address: '281',
      createDate: '16 Sep 2023 , 11:27 am',
      status: 'Rejected',
    },
    {
      orderId: '02468662543498424698',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-6',
      address: 'full address',
      createDate: '13 Dec 2023 , 07:07 pm',
      status: 'Rejected',
    },
    {
      orderId: '05572543932363653131',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-2',
      address: '281',
      createDate: '13 Dec 2023 , 07:47 pm',
      status: 'Rejected',
    },
    {
      orderId: '04687178934333432747',
      memberName: 'Manoj Kumar',
      kendraName: 'JANMITRAM-2',
      address: '173/281',
      createDate: '17 Dec 2023 , 07:11 pm',
      status: 'Rejected',
    },
  ];

  const filteredOrders = rejectedOrders.filter(order =>
    order.orderId.includes(search) || order.memberName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Reject Orders</h1>
        <div className="text-sm text-gray-500">
          Jan Mitra / <span className="text-blue-600">Reject Orders</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="mr-2">Show</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="ml-2">entries</span>
          </div>
          <div>
            <label className="mr-2">Search:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              placeholder="Search order ID or name"
            />
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 border">Sr. No.</th>
              <th className="px-3 py-2 border">Order Id</th>
              <th className="px-3 py-2 border">Member Name</th>
              <th className="px-3 py-2 border">Kendra Name</th>
              <th className="px-3 py-2 border">Address</th>
              <th className="px-3 py-2 border">Create Date</th>
              <th className="px-3 py-2 border">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 border">{index + 1}</td>
                <td className="px-3 py-2 border">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded font-semibold cursor-pointer"
                  >
                    {order.orderId}
                  </button>
                </td>
                <td className="px-3 py-2 border">{order.memberName}</td>
                <td className="px-3 py-2 border">{order.kendraName}</td>
                <td className="px-3 py-2 border">{order.address}</td>
                <td className="px-3 py-2 border">{order.createDate}</td>
                <td className="px-3 py-2 border">
                  <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No rejected orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            Showing 1 to {filteredOrders.length} of {filteredOrders.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 bg-white border rounded text-gray-400 cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 bg-white border rounded text-gray-400 cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 max-w-4xl w-full relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Order Detail</h2>
              <p className="text-sm text-gray-500 mb-1">Order Date: {selectedOrder.createDate}</p>
              <p className="text-sm text-gray-500">Order ID: {selectedOrder.orderId}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-md">Billed To:</h3>
              <p className="text-sm">{selectedOrder.memberName}</p>
              <p className="text-sm">{selectedOrder.address}</p>
              <p className="text-sm">janmitram78000@gmail.com</p>
              <p className="text-sm">9410457690</p>
            </div>

            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">No.</th>
                  <th className="border px-2 py-1">Item</th>
                  <th className="border px-2 py-1">Unit</th>
                  <th className="border px-2 py-1">Quantity</th>
                  <th className="border px-2 py-1">Price</th>
                  <th className="border px-2 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Hardcoded data, you can replace it dynamically later */}
                {[
                  { item: 'Arhar Dal', unit: '1 Kg', qty: 5, price: 100.8 },
                  { item: 'Mung Dal', unit: '1 Kg', qty: 4, price: 94.5 },
                  { item: 'Basmati Rice', unit: '5 Kg', qty: 6, price: 315 },
                ].map((prod, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{idx + 1}</td>
                    <td className="border px-2 py-1">{prod.item}</td>
                    <td className="border px-2 py-1">{prod.unit}</td>
                    <td className="border px-2 py-1">{prod.qty}</td>
                    <td className="border px-2 py-1">₹{prod.price}</td>
                    <td className="border px-2 py-1">₹{(prod.qty * prod.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-4">
              <p>Sub Total: ₹3389.4</p>
              <p>Discount: ₹0</p>
              <p className="font-bold text-lg">Grand Total: ₹3389.4</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
