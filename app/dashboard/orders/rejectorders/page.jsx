'use client';

import { useEffect, useState } from 'react';

export default function RejectOrders() {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchRejectedOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch orders');

        const data = await res.json();

        const rejected = data
          .filter((order) => order.status === 'Rejected')
          .map((order) => ({
            orderId: order._id,
            memberName: order.memberId?.name || 'N/A',
            kendraName: '-', // Update if available
            address: '-', // Update if available
            createDate: new Date(order.createdAt).toLocaleString(),
            status: order.status,
            items: order.products.map((product) => ({
              name: product.productId.name,
              unit: '-', // Add if your API has unit info
              quantity: product.quantity,
              price: product.productId.price,
            })),
          }));

        setRejectedOrders(rejected);
      } catch (error) {
        console.error('Error loading rejected orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedOrders();
  }, []);

  const filteredOrders = rejectedOrders.filter((order) =>
    order.orderId.includes(search) || order.memberName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-4 text-gray-500">Loading rejected orders...</div>;
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 text-black">
        <h1 className="text-xl font-semibold">Reject Orders</h1>
        <div className="text-sm text-gray-500">
          Jan Mitra / <span className="text-blue-600">Reject Orders</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded p-4 text-black">
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
              <p className="text-sm">janmitra78000@gmail.com</p>
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
                {selectedOrder.items.map((prod, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{idx + 1}</td>
                    <td className="border px-2 py-1">{prod.name}</td>
                    <td className="border px-2 py-1">{prod.unit}</td>
                    <td className="border px-2 py-1">{prod.quantity}</td>
                    <td className="border px-2 py-1">₹{prod.price}</td>
                    <td className="border px-2 py-1">
                      ₹{(prod.quantity * prod.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-4">
              <p>
                Sub Total: ₹
                {selectedOrder.items
                  .reduce((sum, i) => sum + i.price * i.quantity, 0)
                  .toFixed(2)}
              </p>
              <p>Discount: ₹0</p>
              <p className="font-bold text-lg">
                Grand Total: ₹
                {selectedOrder.items
                  .reduce((sum, i) => sum + i.price * i.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
