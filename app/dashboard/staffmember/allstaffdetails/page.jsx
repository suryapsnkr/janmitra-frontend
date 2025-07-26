'use client';

import { useState } from 'react';

export default function AllStaffDetails() {
  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: 'Dr.Aparna Kumari',
      code: 'Emp0000',
      mobile: '9414057690',
      email: 'trustvidyarthi@gmail.com',
      joinDate: '2021-12-20',
      image: '/logo.png',
      status: true,
    },
    {
      id: 2,
      name: 'चरण सिंह',
      code: 'Emp0001',
      mobile: '9571222393',
      email: 'admin@gmail.com',
      joinDate: '2022-12-24',
      image: '/logo.png',
      status: true,
    },
    {
      id: 3,
      name: 'MAYANK SHARMA',
      code: 'Staff0018',
      mobile: '7014793043',
      email: 'mayank@gmail.com',
      joinDate: '2023-02-15',
      image: '/logo.png',
      status: true,
    },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleToggleDropdown = (id) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
    setOpenDropdownId(null);
  };

  const handleDelete = (staff) => {
    alert(`Delete ${staff.name}`);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedStaff(null);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    alert(`Updated: ${selectedStaff.name}`);
    setShowEditModal(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedStaff(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Staff Member</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Sr. No.</th>
                <th className="p-3">Staff Member Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Email Id</th>
                <th className="p-3">Join Date</th>
                <th className="p-3">Image</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, idx) => (
                <tr
                  key={staff.id}
                  className="border-b hover:bg-gray-50 transition duration-150 relative"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium inline-block">
                      {staff.name} ({staff.code})
                    </span>
                  </td>
                  <td className="p-3">{staff.mobile}</td>
                  <td className="p-3">{staff.email}</td>
                  <td className="p-3">{staff.joinDate}</td>
                  <td className="p-3">
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="h-10 w-10 object-contain rounded-full"
                    />
                  </td>
                  <td className="p-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={staff.status}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-400 transition" />
                      <span className="ml-2 text-gray-700 text-sm">Active</span>
                    </label>
                  </td>
                  <td className="p-3 relative">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleToggleDropdown(staff.id)}
                    >
                      ...
                    </button>

                    {openDropdownId === staff.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => handleEdit(staff)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          onClick={() => handleDelete(staff)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>Showing 1 to {staffData.length} of {staffData.length} entries</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 bg-gray-100 rounded text-gray-400" disabled>Previous</button>
              <button className="px-2 py-1 bg-blue-500 text-white rounded">1</button>
              <button className="px-2 py-1 bg-gray-100 rounded text-gray-400" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-4xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Update Staff Member</h3>
            <form onSubmit={handleUpdateSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <input
                type="text"
                name="name"
                value={selectedStaff.name}
                onChange={handleFieldChange}
                placeholder="First Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="email"
                value={selectedStaff.email}
                onChange={handleFieldChange}
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="mobile"
                value={selectedStaff.mobile}
                onChange={handleFieldChange}
                placeholder="Mobile Number"
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="joinDate"
                value={selectedStaff.joinDate}
                onChange={handleFieldChange}
                className="border p-2 rounded"
              />
              {/* You can continue with other fields */}
              <div className="col-span-full flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Update Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
