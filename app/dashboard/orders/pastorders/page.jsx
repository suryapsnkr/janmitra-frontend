'use client';
import { useEffect, useState } from 'react';

export default function PastOrders() {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchPastOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch orders');

        const data = await res.json();

        const deliveredOrders = data
          .filter((order) => order.status === 'Delivered')
          .map((order) => {
            return {
              orderId: order._id,
              memberName: order.memberId?.name || 'N/A',
              kendraName: '-', // You can enhance this later
              address: '-', // You can enhance this later
              createDate: new Date(order.createdAt).toLocaleString(),
              status: order.status,
              items: order.products.map((product) => ({
                name: product.productId.name,
                unit: '-', // Update if available
                quantity: product.quantity,
                price: product.productId.price,
              })),
            };
          });

        setPastOrders(deliveredOrders);
      } catch (err) {
        console.error('Error fetching past orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPastOrders();
  }, []);

  const filteredOrders = pastOrders.filter(
    (order) =>
      order.orderId.includes(search) ||
      order.memberName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-4 text-gray-500">Loading past orders...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-black">Past Orders</h1>
        <div className="text-gray-500 text-sm">
          Jan Mitra / <span className="text-blue-600">Past Orders</span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex justify-between items-center mb-4 text-black">
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
      </div>

      {/* Modal for Selected Order */}
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
                <div className="text-gray-600">Order Date: {selectedOrder.createDate}</div>
                <div className="text-gray-600">Order ID: {selectedOrder.orderId}</div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Billed To:</h3>
              <div>{selectedOrder.memberName}</div>
              <div>{selectedOrder.address}</div>
              <div>janmitra@example.com</div>
              <div>+91-XXXXXXXXXX</div>
            </div>

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
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">{i + 1}</td>
                      <td className="border px-2 py-1">{item.name}</td>
                      <td className="border px-2 py-1">{item.unit}</td>
                      <td className="border px-2 py-1">{item.quantity}</td>
                      <td className="border px-2 py-1">₹ {item.price}</td>
                      <td className="border px-2 py-1">
                        ₹ {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right">
              <div>
                Sub Total: ₹{' '}
                {selectedOrder.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
              </div>
              <div>Discount: ₹ 0</div>
              <div className="font-bold text-lg">
                Grand Total: ₹{' '}
                {selectedOrder.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
