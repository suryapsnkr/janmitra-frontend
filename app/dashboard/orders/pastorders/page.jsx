'use client';
import { useState } from 'react';

export default function PastOrders() {
  const [search, setSearch] = useState('');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const pastOrders = [
    {
      orderId: '01972373846663276668',
      memberName: 'Dr.Aparna kumari',
      kendraName: 'JANMITRAM-6',
      address: 'nheje',
      createDate: '29 Aug 2023 , 05:17 pm',
      status: 'Delivered',
    },
    {
      orderId: '04957851422266544692',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-6',
      address: 'full address',
      createDate: '16 Sep 2023 , 11:27 am',
      status: 'Delivered',
    },
    {
      orderId: '01354356837754273934',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-6',
      address: 'full address',
      createDate: '16 Sep 2023 , 11:29 am',
      status: 'Delivered',
    },
    {
      orderId: '04823575968844578358',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-6',
      address: 'full address',
      createDate: '13 Dec 2023 , 07:07 pm',
      status: 'Delivered',
    },
    {
      orderId: '06294977531321633445',
      memberName: 'Manoj Kumar',
      kendraName: 'JANMITRAM-2',
      address: '173/281',
      createDate: '07 Sep 2023 , 02:08 pm',
      status: 'Delivered',
    },
    {
      orderId: '0776723726485146858',
      memberName: 'Archana Ojha',
      kendraName: 'JANMITRAM-2',
      address: '281',
      createDate: '08 Sep 2023 , 06:16 pm',
      status: 'Delivered',
    },
  ];

  const filteredOrders = pastOrders.filter(order =>
    order.orderId.includes(search) || order.memberName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Past Orders</h1>
        <div className="text-gray-500 text-sm">
          Jan Mitra / <span className="text-blue-600">Past Orders</span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded p-4">
        {/* Header Controls */}
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

        {/* Orders Table */}
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
                    className="bg-green-500 text-white px-2 py-1 rounded font-semibold cursor-pointer"
                  >
                    {order.orderId}
                  </button>
                </td>

                <td className="px-3 py-2 border">{order.memberName}</td>
                <td className="px-3 py-2 border">{order.kendraName}</td>
                <td className="px-3 py-2 border">{order.address}</td>
                <td className="px-3 py-2 border">{order.createDate}</td>
                <td className="px-3 py-2 border">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No past orders found.
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
            <button
              disabled
              className="px-3 py-1 bg-white border rounded text-gray-400 cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button
              disabled
              className="px-3 py-1 bg-white border rounded text-gray-400 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[90%] max-w-6xl p-6 overflow-y-auto max-h-[90vh] shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Order Detail</h2>
              <div className="text-sm text-right">
                <div className="text-gray-600">Order Date: 29 Aug, 2023</div>
                <div className="text-gray-600">Order ID: {selectedOrder.orderId}</div>
              </div>
            </div>

            {/* Billed To Section */}
            <div className="mb-4">
              <h3 className="font-semibold">Billed To:</h3>
              <div>{selectedOrder.memberName}</div>
              <div>{selectedOrder.address}</div>
              <div>jannmitra78000@gmail.com</div>
              <div>9414057690</div>
            </div>

            {/* Order Summary Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
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
                  {/* Example static data */}
                  {[
                    { item: 'Chana Dal', unit: '1 Kg', qty: 3, price: 81.9 },
                    { item: 'Sugar', unit: '1 Kg', qty: 3, price: 47.25 },
                    { item: 'Namak (Salt)', unit: '1 Kg', qty: 3, price: 25.2 },
                    { item: 'Tea', unit: '500 Gm', qty: 3, price: 252 },
                    { item: 'Sarson Ka Tel (kachchi Gani)', unit: '1 Litre', qty: 4, price: 195.3 },
                    { item: 'Basmati Rice', unit: '5 Kg', qty: 3, price: 315 },
                    { item: 'Mung Dal', unit: '1 Kg', qty: 3, price: 94.5 },
                    { item: 'Arhar Dal', unit: '1 Kg', qty: 2, price: 100.8 },
                  ].map((product, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">{i + 1}</td>
                      <td className="border px-2 py-1">{product.item}</td>
                      <td className="border px-2 py-1">{product.unit}</td>
                      <td className="border px-2 py-1">{product.qty}</td>
                      <td className="border px-2 py-1">₹ {product.price}</td>
                      <td className="border px-2 py-1">₹ {(product.qty * product.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-4 text-right">
              <div>Sub Total: ₹ 3430.35</div>
              <div>Discount: ₹ 0</div>
              <div className="font-bold text-lg">Grand Total: ₹ 3430.35</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
