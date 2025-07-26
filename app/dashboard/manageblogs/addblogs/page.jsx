'use client';
import { useState } from 'react';

export default function AddBlogs() {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [blogDescription, setBlogDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ blogTitle, blogImage, blogDescription });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Add Blogs</h2>
        <div className="text-sm text-gray-500">Blogs / <span className="text-primary font-medium">Add Blogs</span></div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        {/* Blog Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Blog Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            required
          />
        </div>

        {/* Blog Image */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Blog Image (Optional)</label>
          <input
            type="file"
            className="border border-gray-300 px-3 py-2 w-full rounded"
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
        </div>

        {/* Blog Description */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Blog Description</label>
          {/* Replace this with a proper rich text editor integration if needed */}
          <textarea
            rows="10"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Write blog content here..."
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 4v16m8-8H4"></path>
            </svg>
            Add Blogs
          </button>
        </div>
      </form>
    </div>
  );
}
