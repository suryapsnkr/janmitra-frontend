'use client';

import { useState } from 'react';

export default function LiveOrders() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      orderId: '08288724677827545238',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-2',
      address: '281',
      email: 'archana@gmail.com',
      mobile: '7004113699',
      createDate: '13 Dec 2023 , 07:02 pm',
      paymentMethod: 'Online',
      orderStatus: 'Placed',
      items: [
        { name: 'Sugar', unit: '1 Kg', quantity: 1, price: 47.25 },
        { name: 'Arhar Dal', unit: '1 Kg', quantity: 3, price: 100.8 },
        { name: 'Namak (Salt)', unit: '1 Kg', quantity: 7, price: 25.2 },
        { name: 'Tea', unit: '500 Gm', quantity: 4, price: 252 },
        { name: 'Sarson Ka Tel (kachchi Gani)', unit: '1 Litre', quantity: 2, price: 195.3 },
        { name: 'ATTA (WHEAT)', unit: '5 Kg', quantity: 3, price: 236.25 },
        { name: 'All In One Cleaner (special)', unit: '1 Litre', quantity: 3, price: 94.5 },
        { name: 'Aloe Vera Gel', unit: '150ml', quantity: 1, price: 85.05 },
        { name: 'Basmati Rice', unit: '5 Kg', quantity: 4, price: 315 },
        { name: 'Mung Dal', unit: '1 Kg', quantity: 5, price: 94.5 },
        { name: 'Chana Dal', unit: '1 Kg', quantity: 3, price: 81.9 }
      ],
      subTotal: 4980.15,
      discount: 0,
      grandTotal: 4980.15
    }
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.includes(search) ||
      order.memberName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Live Orders</h1>
        <div className="text-gray-500 text-sm">
          Jan Mitra / <span className="text-blue-600">Live Orders</span>
        </div>
      </div>

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
              placeholder="Order ID or Name"
            />
          </div>
        </div>

        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 border">Sr. No.</th>
              <th className="px-3 py-2 border">Order Id</th>
              <th className="px-3 py-2 border">Member Name</th>
              <th className="px-3 py-2 border">Kendra Name</th>
              <th className="px-3 py-2 border">Address</th>
              <th className="px-3 py-2 border">Create Date</th>
              <th className="px-3 py-2 border">Payment Method</th>
              <th className="px-3 py-2 border">Order Status</th>
              <th className="px-3 py-2 border">Action</th>
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
                    className="bg-blue-500 text-white px-2 py-1 rounded font-semibold cursor-pointer"
                  >
                    {order.orderId}
                  </button>
                </td>
                <td className="px-3 py-2 border">{order.memberName}</td>
                <td className="px-3 py-2 border">{order.kendraName}</td>
                <td className="px-3 py-2 border">{order.address}</td>
                <td className="px-3 py-2 border">{order.createDate}</td>
                <td className="px-3 py-2 border">{order.paymentMethod}</td>
                <td className="px-3 py-2 border">
                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-3 py-2 border space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                    Dispatch
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <div>
            Showing 1 to {filteredOrders.length} of {filteredOrders.length} entries
          </div>
          <div className="flex gap-1 items-center">
            <button disabled className="px-3 py-1 bg-white border rounded text-gray-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button disabled className="px-3 py-1 bg-white border rounded text-gray-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white max-w-5xl w-full p-6 rounded-lg overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
            >
              &#x2715;
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="mb-4">
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Order Date:</strong> {selectedOrder.createDate}</p>
              <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-1">Billed To:</h3>
                <p>{selectedOrder.memberName}</p>
                <p>{selectedOrder.address}</p>
                <p>{selectedOrder.email}</p>
                <p>{selectedOrder.mobile}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Kendra:</h3>
                <p>{selectedOrder.kendraName}</p>
              </div>
            </div>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">No.</th>
                  <th className="border px-2 py-1">Item</th>
                  <th className="border px-2 py-1">Unit</th>
                  <th className="border px-2 py-1">Quantity</th>
                  <th className="border px-2 py-1">Original Price</th>
                  <th className="border px-2 py-1">Quantity Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{idx + 1}</td>
                    <td className="border px-2 py-1">{item.name}</td>
                    <td className="border px-2 py-1">{item.unit}</td>
                    <td className="border px-2 py-1">{item.quantity}</td>
                    <td className="border px-2 py-1">₹{item.price}</td>
                    <td className="border px-2 py-1">₹{(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-right">
              <p><strong>Sub Total:</strong> ₹{selectedOrder.subTotal}</p>
              <p><strong>Discount:</strong> ₹{selectedOrder.discount}</p>
              <p className="text-xl font-bold"><strong>Grand Total:</strong> ₹{selectedOrder.grandTotal}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
