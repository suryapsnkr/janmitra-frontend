'use client';

import { useState } from 'react';

export default function AllProducts() {
    const [products] = useState([
        {
            id: 1,
            name: 'DHANIYA POWDER',
            category: 'Grocery & Staples',
            subCategory: 'Masalas & Spices',
            shelfLife: '6 months',
            expiryDate: '07-Jun-2025',
            active: true,
        },
        {
            id: 2,
            name: 'Aloe Vera Gel',
            category: 'Personal Care',
            subCategory: 'Skin Care',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 3,
            name: 'All In One Cleaner (special)',
            category: 'Home Care',
            subCategory: 'Dish Washes',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 4,
            name: 'Namak (Salt)',
            category: 'Grocery & Staples',
            subCategory: 'Salt, Sugar & Jaggery',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 5,
            name: 'Sarson Ka Tel (kachchi Gani)',
            category: 'Grocery & Staples',
            subCategory: 'Edible Oils',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 6,
            name: 'Tea',
            category: 'Grocery & Staples',
            subCategory: 'Tea',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 7,
            name: 'Sugar',
            category: 'Grocery & Staples',
            subCategory: 'Salt, Sugar & Jaggery',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 8,
            name: 'Chana Dal',
            category: 'Grocery & Staples',
            subCategory: 'Dals & Pulses',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 9,
            name: 'Arhar Dal',
            category: 'Grocery & Staples',
            subCategory: 'Dals & Pulses',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
        {
            id: 10,
            name: 'Mung Dal',
            category: 'Grocery & Staples',
            subCategory: 'Dals & Pulses',
            shelfLife: '6 months',
            expiryDate: '02-Feb-2024',
            active: true,
        },
    ]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const openViewModal = (product) => {
        setSelectedProduct({
            ...product,
            mainImage: '/logo.png',
            images: ['/logo.png', '/logo.png', '/logo.png', '/logo.png'],
            keyFeature: 'shuddh satwik prakrit',
            description: '200 Gm \u20B965.55 \u20B969.00 \u2193 5%'
        });
        setViewModal(true);
    };

    const openEditModal = (product) => {
        setSelectedProduct({ ...product });
        setEditModal(true);
    };

    const closeModals = () => {
        setSelectedProduct(null);
        setViewModal(false);
        setEditModal(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">All Products</h2>

            <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border-b">Sr. No.</th>
                            <th className="p-3 border-b">Product Name</th>
                            <th className="p-3 border-b">Category</th>
                            <th className="p-3 border-b">Sub-Category</th>
                            <th className="p-3 border-b">Shelf Life</th>
                            <th className="p-3 border-b">Expiry Date</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, idx) => (
                            <tr
                                key={product.id}
                                className="hover:bg-gray-50 border-b transition duration-150"
                            >
                                <td className="p-3">{idx + 1}</td>
                                <td className="p-3">
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                                        {product.name}
                                    </span>
                                </td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.subCategory}</td>
                                <td className="p-3">{product.shelfLife}</td>
                                <td className="p-3">{product.expiryDate}</td>
                                <td className="p-3">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={product.active}
                                            readOnly
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-400 transition" />
                                        <span className="ml-2 text-sm text-gray-700">Active</span>
                                    </label>
                                </td>
                                <td className="p-3 space-x-2">
                                    <button
                                        className="px-2 py-1 border border-green-500 text-green-500 rounded hover:bg-green-50"
                                        onClick={() => openViewModal(product)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="px-2 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                                        onClick={() => openEditModal(product)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {viewModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-auto">
                    <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Product Detail</h3>
                            <button onClick={closeModals} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex gap-2 mb-4">
                                    {selectedProduct.images.map((img, i) => (
                                        <img key={i} src={img} className="w-12 h-12 object-contain border rounded" />
                                    ))}
                                </div>
                                <img src={selectedProduct.mainImage} className="w-full object-contain h-96 border rounded" />
                            </div>
                            <div>
                                <p><strong>Category:</strong> {selectedProduct.category}</p>
                                <p><strong>Name:</strong> {selectedProduct.name}</p>
                                <p><strong>Brand:</strong> janmitram</p>
                                <p><strong>Key Feature:</strong> {selectedProduct.keyFeature}</p>
                            </div>
                        </div>
                        <div className="mt-6 text-sm">
                            <p className="font-medium mb-1">Product description:</p>
                            <p>{selectedProduct.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {editModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-auto">
                    <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Update Product</h3>
                            <button onClick={closeModals} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Product Name</label>
                                <input type="text" className="w-full border rounded p-2 mt-1" defaultValue={selectedProduct.name} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Category</label>
                                <input type="text" className="w-full border rounded p-2 mt-1" defaultValue={selectedProduct.category} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Sub Category</label>
                                <input type="text" className="w-full border rounded p-2 mt-1" defaultValue={selectedProduct.subCategory} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Expiry Date</label>
                                <input type="date" className="w-full border rounded p-2 mt-1" defaultValue="2025-06-07" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium">Key Feature</label>
                                <textarea className="w-full border rounded p-2 mt-1" rows={2} defaultValue="shuddh satwik prakrit" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium">Description</label>
                                <textarea className="w-full border rounded p-2 mt-1" rows={4} defaultValue="{selectedProduct.description}" />
                            </div>
                            <div className="col-span-2">
                                <div className="grid grid-cols-5 gap-4">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="text-center">
                                            <img src="/logo.png" className="w-24 h-24 object-contain mx-auto" />
                                            <p className="text-xs mt-1">Image {i + 1}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-2 mt-6 flex justify-end">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
