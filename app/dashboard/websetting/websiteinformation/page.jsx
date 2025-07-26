'use client';
import { useState } from 'react';

export default function WebsiteInformationPage() {
  const [form, setForm] = useState({
    email: '',
    confirmEmail: '',
    mobile1: '',
    mobile2: '',
    shortDesc: '',
    message: '',
    openTime: '',
    closeTime: '',
    address: '',
    youtube: '',
    facebook: '',
    instagram: '',
    whatsapp: '',
    twitter: '',
    aboutUs: '',
    terms: '',
    refund: '',
    shipping: '',
    privacy: '',
    cancellation: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Update Website Information</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Email Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Email (Confirm)</label>
            <input name="confirmEmail" value={form.confirmEmail} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Mobile Number First</label>
            <input name="mobile1" value={form.mobile1} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Mobile Number Second</label>
            <input name="mobile2" value={form.mobile2} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Short Description</label>
            <input name="shortDesc" value={form.shortDesc} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Message</label>
            <input name="message" value={form.message} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Open Time</label>
            <input name="openTime" value={form.openTime} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Close Time</label>
            <input name="closeTime" value={form.closeTime} onChange={handleChange} className="input" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="input w-full" />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Youtube Link</label>
            <input name="youtube" value={form.youtube} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Facebook Link</label>
            <input name="facebook" value={form.facebook} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Instagram Link</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Whatsapp Link</label>
            <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Twitter Link</label>
            <input name="twitter" value={form.twitter} onChange={handleChange} className="input" />
          </div>
        </div>

        {/* CKEditor-style Textareas */}
        {[
          { label: 'About Us', name: 'aboutUs' },
          { label: 'Terms & Conditions', name: 'terms' },
          { label: 'Refund Policy', name: 'refund' },
          { label: 'Shipping Policy', name: 'shipping' },
          { label: 'Privacy Policy', name: 'privacy' },
          { label: 'Cancellation Policy', name: 'cancellation' }
        ].map(field => (
          <div key={field.name}>
            <label className="block mb-1">{field.label}</label>
            <textarea
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className="input w-full h-40"
            />
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-right">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
}
