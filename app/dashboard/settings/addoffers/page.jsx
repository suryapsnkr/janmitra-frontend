"use client";

import { useState } from "react";

export default function AddOfferPage() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [offers, setOffers] = useState([]);

  const [offerData, setOfferData] = useState({
    title: "",
    discount: "",
    condition: "",
    code: "",
    image: null,
    status: "Active",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setOfferData({
      ...offerData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setOffers(
        offers.map((offer) =>
          offer.id === editingId
            ? {
                ...offerData,
                id: editingId,
                imageUrl: offerData.image ? URL.createObjectURL(offerData.image) : offer.imageUrl,
              }
            : offer
        )
      );
    } else {
      setOffers([
        ...offers,
        {
          ...offerData,
          id: offers.length + 1,
          imageUrl: offerData.image ? URL.createObjectURL(offerData.image) : "",
        },
      ]);
    }

    setOfferData({
      title: "",
      discount: "",
      condition: "",
      code: "",
      image: null,
      status: "Active",
    });
    setOpen(false);
    setEditMode(false);
    setEditingId(null);
  };

  const openEditPopup = (offer) => {
    setOfferData({ ...offer, image: null });
    setOpen(true);
    setEditMode(true);
    setEditingId(offer.id);
  };

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.discount.toString().includes(searchQuery)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Offers</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setOfferData({
              title: "",
              discount: "",
              condition: "",
              code: "",
              image: null,
              status: "Active",
            });
            setEditMode(false);
            setOpen(true);
          }}
        >
          Add Offer
        </button>
      </div>

      {/* Search label and input */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <label className="text-sm font-medium">Search:</label>
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">Sr. No.</th>
              <th className="px-3 py-2 border">Title</th>
              <th className="px-3 py-2 border">Discount</th>
              <th className="px-3 py-2 border">Condition</th>
              <th className="px-3 py-2 border">Offer Code</th>
              <th className="px-3 py-2 border">Image</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer, idx) => (
                <tr key={offer.id}>
                  <td className="border px-3 py-2 text-center">{idx + 1}</td>
                  <td className="border px-3 py-2">{offer.title}</td>
                  <td className="border px-3 py-2">{offer.discount} %</td>
                  <td className="border px-3 py-2">{offer.condition}</td>
                  <td className="border px-3 py-2">{offer.code}</td>
                  <td className="border px-3 py-2">
                    {offer.imageUrl ? (
                      <img
                        src={offer.imageUrl}
                        alt="Offer"
                        className="w-8 h-8 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {offer.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2 space-x-1">
                    <button
                      onClick={() => openEditPopup(offer)}
                      className="px-2 py-1 text-xs border border-blue-500 text-blue-500 rounded"
                    >
                      Edit
                    </button>
                    <button className="px-2 py-1 text-xs border border-red-500 text-red-500 rounded">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No matching offers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Update Offer" : "Add New Offer"}
            </h2>
            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium">Title *</label>
                <input
                  name="title"
                  value={offerData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Discount (%) *
                </label>
                <input
                  type="number"
                  name="discount"
                  value={offerData.discount}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Condition *</label>
                <input
                  name="condition"
                  value={offerData.condition}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Offer Code *
                </label>
                <input
                  name="code"
                  value={offerData.code}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Image *</label>
                <input
                  name="image"
                  type="file"
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required={!editMode}
                />
              </div>
              <div className="col-span-full flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {editMode ? "Update" : "Submit"}
                </button>
              </div>
            </form>
            <p className="text-red-500 text-sm mt-2">* Field is required</p>
          </div>
        </div>
      )}
    </div>
  );
}
