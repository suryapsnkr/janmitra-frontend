'use client';

import { useState } from 'react';

export default function AddStaffMember() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    joinDate: '',
    salary: '',
    country: '',
    state: '',
    city: '',
    branchName: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    workingArea: '',
    responsibility: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Staff member added successfully!');
  };

  const renderInput = (label, name, type = 'text') => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="input"
      />
    </div>
  );

  const renderFile = (label) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="file" className="input" />
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Staff Member</h2>
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {renderInput('First Name', 'firstName')}
          {renderInput('Last Name', 'lastName')}
          {renderInput('Email', 'email', 'email')}

          {renderInput('Password', 'password', 'password')}
          {renderInput('Mobile Number', 'mobile')}
          {renderInput('Join Date', 'joinDate', 'date')}

          {renderInput('Staff Member Salary', 'salary')}
          {renderFile('Staff Member Image (Optional)')}
          {renderFile('Aadhar Front Image')}

          {renderFile('Aadhar Back Image')}
          {renderFile('Pancard Image')}
          {renderFile('Tenth Marksheet Image')}

          {renderFile('Twelfth Marksheet Image')}
          {renderFile('Post Graduate Image')}
          {renderFile('Graduate Image')}

          {renderFile('Bank Cheque')}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Select Country</label>
            <select name="country" value={form.country} onChange={handleChange} className="input">
              <option value="">Select Country</option>
              <option value="India">India</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Select State</label>
            <select name="state" value={form.state} onChange={handleChange} className="input">
              <option value="">Select State</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Select City</label>
            <select name="city" value={form.city} onChange={handleChange} className="input">
              <option value="">Select City</option>
            </select>
          </div>

          {renderInput('Branch Name', 'branchName')}
          {renderInput('Account Holder Name', 'accountHolder')}
          {renderInput('Account No.', 'accountNumber')}
          {renderInput('IFCS Code', 'ifsc')}
          {renderInput('Working Area', 'workingArea')}
          {renderInput('Working Responsibility', 'responsibility')}
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="input w-full"
            rows={3}
          />
        </div>

        <div className="text-right">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            ➕ Add Staff Member
          </button>
        </div>
      </form>

      <style jsx>{`
        .input {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
