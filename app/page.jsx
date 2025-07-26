// import DashboardLayout from '../components/DashboardLayout';
import { FaUser, FaHome, FaBoxOpen, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import Link from 'next/link';

export default function DashboardPage() {
    const cards = [
    { title: "Today Consumer", value: 0, icon: <FaUser />, color: "text-blue-500" },
    { title: "Total Janmitram Kendra", value: 2, icon: <FaHome />, color: "text-green-500" },
    { title: "Total Approved Consumer", value: 14, icon: <FaCheckCircle />, color: "text-indigo-500" },
    { title: "Total Pending Consumer", value: 1, icon: <FaHourglassHalf />, color: "text-gray-500" },
    { title: "Total Janmitram Product", value: 12, icon: <FaBoxOpen />, color: "text-yellow-500" },
    { title: "Total Janmitram Employee", value: 3, icon: <FaUser />, color: "text-pink-500" },
    { title: "Total Sold Quantity", value: 292, icon: <FaBoxOpen />, color: "text-purple-500" },
  ];

  const pendingConsumers = [
    {
      id: 1,
      name: "Test (JMU168725747)",
      mobile: "1234567999",
      email: "testnew@gmail.com",
      date: "30-Dec-2023",
      status: "Pending",
    },
  ];
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Your cards and table go here */}
      {/* Main Dashboard */}
      <main className="flex-1 p-6">
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="font-medium text-gray-700">Dr. Aparna Kumari</div>
        </div> */}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className={`text-3xl ${card.color}`}>{card.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-semibold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Consumers */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">New Pending Consumers</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Sr No.</th>
                <th>Consumer Name</th>
                <th>Mobile No.</th>
                <th>Email Id</th>
                <th>Image</th>
                <th>Create Date</th>
                <th>Status</th>
                <th>View Profile</th>
              </tr>
            </thead>
            <tbody>
              {pendingConsumers.map((c, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.mobile}</td>
                  <td>{c.email}</td>
                  <td><span className="text-gray-400">Not Found</span></td>
                  <td>{c.date}</td>
                  <td><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">{c.status}</span></td>
                  <td><button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"><Link href={{ pathname: "/dashboard/customers", query: { cid: c.id } }}>View Profile</Link></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
    
  );
}
