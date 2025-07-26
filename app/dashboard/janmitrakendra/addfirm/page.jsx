'use client';
import { useState } from 'react';

export default function AddJanmitraKendra() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', form);
    // TODO: Send to backend
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Add Janmitra Kendra</h1>
        <div className="text-sm text-gray-500">
          Janmitra Kendra / <span className="text-blue-600">Add Janmitra Kendra</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 space-y-6"
      >
        {/* === Grid Row 1 === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Firm Name</label>
            <input name="firmName" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Unique User Name (No Space)</label>
            <input name="username" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Enter Password</label>
            <input type="password" name="password" onChange={handleChange} className="input" />
          </div>
        </div>

        {/* === Grid Row 2 === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Director Name</label>
            <input name="directorName" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Select Area Vise (Pincode)</label>
            <input name="areaPincode" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Date of Birth</label>
            <input name="dob" type="date" onChange={handleChange} className="input" />
          </div>
        </div>

        {/* === Grid Row 3 === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Mobile No.</label>
            <input name="mobile" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Account No.</label>
            <input name="accountNo" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">IFSC Code</label>
            <input name="ifsc" onChange={handleChange} className="input" />
          </div>
        </div>

        {/* === Grid Row 4 === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Account Holder Name</label>
            <input name="accountHolder" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Bank Name</label>
            <input name="bankName" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Branch Name</label>
            <input name="branchName" onChange={handleChange} className="input" />
          </div>
        </div>

        {/* === Grid Row 5 === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Aadhar Card No.</label>
            <input name="aadhaar" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Pan Card No.</label>
            <input name="pan" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">GST No.</label>
            <input name="gst" onChange={handleChange} className="input" />
          </div>
        </div>

        {/* === File Upload Row 1 === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Aadhar Card Image</label>
            <input type="file" name="aadhaarImg" onChange={handleChange} className="file-input" />
          </div>
          <div>
            <label className="label">Pan Card Image</label>
            <input type="file" name="panImg" onChange={handleChange} className="file-input" />
          </div>
          <div>
            <label className="label">GST Certificate (Optional)</label>
            <input type="file" name="gstImg" onChange={handleChange} className="file-input" />
          </div>
        </div>

        {/* === File Upload Row 2 === */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="label">Msme Certificate</label>
            <input type="file" name="msme" onChange={handleChange} className="file-input" />
          </div>
          <div>
            <label className="label">Branch Certificate</label>
            <input type="file" name="branchCertificate" onChange={handleChange} className="file-input" />
          </div>
          <div>
            <label className="label">Signature Image</label>
            <input type="file" name="signature" onChange={handleChange} className="file-input" />
          </div>
          <div>
            <label className="label">Profile Image</label>
            <input type="file" name="profile" onChange={handleChange} className="file-input" />
          </div>
        </div>

        {/* === Address / Description Row === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Director Address</label>
            <textarea name="directorAddress" onChange={handleChange} rows={2} className="input"></textarea>
          </div>
          <div>
            <label className="label">Udhyog Description</label>
            <textarea name="udyogDesc" onChange={handleChange} rows={2} className="input"></textarea>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            📄 Add Janmitra Kendra
          </button>
        </div>
      </form>
    </div>
  );
}
