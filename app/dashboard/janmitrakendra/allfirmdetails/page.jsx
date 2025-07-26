'use client';

import { useState } from 'react';
import Image from 'next/image';

const initialFirms = [
    {
        id: 1,
        firmName: 'JANMITRAM-2',
        directorName: 'Manoj Kumar',
        pincodes: ['302033'],
        mobile: '8209514177',
        image: '/profile1.jpg',
        createDate: '02 Sat 09, 2023',
        status: 'Active',
    },
    {
        id: 2,
        firmName: 'JANMITRAM-6',
        directorName: 'CHARAN SINGH',
        pincodes: ['302012', '302039', '302015', '302019'],
        mobile: '9166093926',
        image: '/profile2.jpg',
        createDate: '22 Tue 08, 2023',
        status: 'Active',
    },
];

const sampleProducts = [
    { id: 1, name: 'Aloe Vera Gel', date: '02 Sat 09, 2023', status: 'Active' },
    { id: 2, name: 'Tea', date: '02 Sat 09, 2023', status: 'Active' },
    { id: 3, name: 'Chana Dal', date: '02 Sat 09, 2023', status: 'Active' },
];

export default function AllFirmDetails() {
    const [firmsList, setFirmsList] = useState(initialFirms);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFirm, setEditFirm] = useState(null);

    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedFirmProducts, setSelectedFirmProducts] = useState([]);
    const [selectedFirmName, setSelectedFirmName] = useState('');

    const [formValues, setFormValues] = useState({
        firmName: '',
        directorName: '',
        mobile: '',
        accountHolderName: '',
        accountNo: '',
        bankName: '',
        aadharNo: '',
        gstNo: '',
        dob: '',
        directorAddress: '',
        udyogDescription: '',
    });

    const [showUnitModal, setShowUnitModal] = useState(false);
    const [unitDetails, setUnitDetails] = useState({
        productName: '',
        unit: '',
        price: '',
        totalQty: '',
        availableQty: '',
        soldQty: '',
        date: '',
        status: '',
    });

    const [showUnitEditModal, setShowUnitEditModal] = useState(false);
    const [unitEditData, setUnitEditData] = useState({
        unit: '',
        price: '',
        addQty: '',
        oldQty: '',
    });

    const [showViewProfileModal, setShowViewProfileModal] = useState(false);
    const [viewFirmData, setViewFirmData] = useState(null);



    const openEditModal = (firm) => {
        setEditFirm(firm);
        setFormValues({
            firmName: firm.firmName,
            directorName: firm.directorName,
            mobile: firm.mobile,
            accountHolderName: 'JMU',
            accountNo: '0224',
            bankName: 'IOB',
            aadharNo: '123465243625',
            gstNo: '08AAQFJ8465L1ZF',
            dob: '1975-08-15',
            directorAddress: '173/281 PRATAP NAGAR NRI CIRCLE JPR',
            udyogDescription: 'JANMITRAM STOCK AND SUPPLY CENTER',
        });
        setShowEditModal(true);
    };

    const updateFirmHandler = () => {
        const updatedFirm = {
            ...editFirm,
            firmName: formValues.firmName,
            directorName: formValues.directorName,
            mobile: formValues.mobile,
        };

        setFirmsList((prev) =>
            prev.map((f) => (f.id === updatedFirm.id ? updatedFirm : f))
        );
        setShowEditModal(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Firm Details</h2>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full text-sm text-gray-800">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-3">Sr. No.</th>
                            <th className="px-4 py-3">Firm Name</th>
                            <th className="px-4 py-3">Director Name</th>
                            <th className="px-4 py-3">Pincode</th>
                            <th className="px-4 py-3">Mobile No.</th>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Create Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {firmsList.map((firm, index) => (
                            <tr key={firm.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{firm.firmName}</td>
                                <td className="px-4 py-3">{firm.directorName}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-1">
                                        {firm.pincodes.map((pin, i) => (
                                            <span
                                                key={i}
                                                className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded"
                                            >
                                                {pin}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-3">{firm.mobile}</td>
                                <td className="px-4 py-3">
                                    <Image
                                        src={firm.image}
                                        alt="Profile"
                                        width={36}
                                        height={36}
                                        className="rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-4 py-3">{firm.createDate}</td>
                                <td className="px-4 py-3">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                                        {firm.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-1">
                                        <button
                                            className="text-xs border border-blue-400 text-blue-600 rounded px-3 py-1 hover:bg-blue-50"
                                            onClick={() => openEditModal(firm)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-xs border border-green-400 text-green-600 rounded px-3 py-1 hover:bg-green-50"
                                            onClick={() => {
                                                setSelectedFirmName(firm.firmName);
                                                setSelectedFirmProducts(sampleProducts); // Replace with actual filtered product list
                                                setShowProductModal(true);
                                            }}
                                        >
                                            Products
                                        </button>
                                        <button
                                            className="text-xs border border-gray-400 text-gray-700 rounded px-3 py-1 hover:bg-gray-100"
                                            onClick={() => {
                                                setViewFirmData(firm);
                                                setShowViewProfileModal(true);
                                            }}
                                        >
                                            View Profile
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-10 z-50">
                    <div className="bg-white rounded-lg w-11/12 max-w-6xl p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-4">Update Janmitra Kendra</h3>
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setShowEditModal(false)}
                        >
                            &times;
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div><label className="font-medium">Firm Name</label><input type="text" value={formValues.firmName} onChange={(e) => setFormValues({ ...formValues, firmName: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Director Name</label><input type="text" value={formValues.directorName} onChange={(e) => setFormValues({ ...formValues, directorName: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Mobile No.</label><input type="text" value={formValues.mobile} onChange={(e) => setFormValues({ ...formValues, mobile: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Account Holder Name</label><input type="text" value={formValues.accountHolderName} onChange={(e) => setFormValues({ ...formValues, accountHolderName: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Account No.</label><input type="text" value={formValues.accountNo} onChange={(e) => setFormValues({ ...formValues, accountNo: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Bank Name</label><input type="text" value={formValues.bankName} onChange={(e) => setFormValues({ ...formValues, bankName: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Aadhar Card No.</label><input type="text" value={formValues.aadharNo} onChange={(e) => setFormValues({ ...formValues, aadharNo: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">GST No.</label><input type="text" value={formValues.gstNo} onChange={(e) => setFormValues({ ...formValues, gstNo: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Date of Birth</label><input type="date" value={formValues.dob} onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })} className="w-full border px-3 py-2 rounded" /></div>
                            <div><label className="font-medium">Aadhar Card Image</label><input type="file" className="block-file-input w-full" /></div>
                            <div><label className="font-medium">Pan Card Image</label><input type="file" className="block-file-input w-full" /></div>
                            <div><label className="font-medium">GST Certificate</label><input type="file" className="block-file-input w-full" /></div>
                            <div><label className="font-medium">Branch Certificate</label><input type="file" className="block-file-input w-full" /></div>
                            <div><label className="font-medium">Signature Image</label><input type="file" className="block-file-input w-full" /></div>
                            <div><label className="font-medium">Profile Image</label><input type="file" className="block-file-input w-full" /></div>
                            <div className="col-span-1 md:col-span-2"><label className="font-medium">Director Address</label><textarea className="w-full border px-3 py-2 rounded" value={formValues.directorAddress} onChange={(e) => setFormValues({ ...formValues, directorAddress: e.target.value })} /></div>
                            <div><label className="font-medium">Udyog Description</label><textarea className="w-full border px-3 py-2 rounded" value={formValues.udyogDescription} onChange={(e) => setFormValues({ ...formValues, udyogDescription: e.target.value })} /></div>
                            <div className="mt-6 md:col-span-3 flex justify-end">
                                <button className="bg-green-500 text-white px-4 py-2 rounded text-sm" onClick={updateFirmHandler}>Update Firm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showProductModal && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-10">
                    <div className="bg-white rounded-lg w-11/12 max-w-6xl p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-4">Products of {selectedFirmName}</h3>
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setShowProductModal(false)}
                        >
                            &times;
                        </button>
                        <table className="min-w-full text-sm text-gray-800 border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Sr. No.</th>
                                    <th className="px-4 py-2 text-left">Product Name</th>
                                    <th className="px-4 py-2 text-left">Create Date</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">View Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedFirmProducts.map((product, index) => (
                                    <tr key={product.id} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">
                                            <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                                                {product.name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{product.date}</td>
                                        <td className="px-4 py-2">
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="border border-blue-400 text-blue-600 text-xs rounded px-3 py-1 hover:bg-blue-50"
                                                onClick={() => {
                                                    setUnitDetails({
                                                        productName: product.name,
                                                        unit: '150ml',
                                                        price: '85.05',
                                                        totalQty: '50',
                                                        availableQty: '44',
                                                        soldQty: '6',
                                                        date: '02-2023-Sep',
                                                        status: 'Active',
                                                    });
                                                    setShowUnitModal(true);
                                                }}
                                            >
                                                View Unit Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showUnitModal && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-10">
                    <div className="bg-white rounded-lg w-11/12 max-w-6xl p-6 relative shadow-xl overflow-x-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-4">Firm Product Details</h3>
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setShowUnitModal(false)}
                        >
                            &times;
                        </button>

                        <table className="min-w-full text-sm text-gray-800 border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">Sr. No.</th>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Product Unit</th>
                                    <th className="px-4 py-2">Product Price</th>
                                    <th className="px-4 py-2">Total Qty.</th>
                                    <th className="px-4 py-2">Available Qty.</th>
                                    <th className="px-4 py-2">Sold Qty.</th>
                                    <th className="px-4 py-2">Product Date</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="px-4 py-2">1</td>
                                    <td className="px-4 py-2">{unitDetails.productName}</td>
                                    <td className="px-4 py-2">{unitDetails.unit}</td>
                                    <td className="px-4 py-2">{unitDetails.price}</td>
                                    <td className="px-4 py-2">{unitDetails.totalQty}</td>
                                    <td className="px-4 py-2">{unitDetails.availableQty}</td>
                                    <td className="px-4 py-2">{unitDetails.soldQty}</td>
                                    <td className="px-4 py-2">{unitDetails.date}</td>
                                    <td className="px-4 py-2">
                                        <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">
                                            {unitDetails.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-2">
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-xs border border-blue-400 text-blue-600 rounded px-3 py-1 hover:bg-blue-50"
                                                onClick={() => {
                                                    setUnitEditData({
                                                        unit: unitDetails.unit,
                                                        price: unitDetails.price,
                                                        addQty: '',
                                                        oldQty: unitDetails.availableQty,
                                                    });
                                                    setShowUnitEditModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button className="text-xs border border-red-400 text-red-600 rounded px-3 py-1 hover:bg-red-50">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showUnitEditModal && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-10">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl relative">
                        <h2 className="text-lg font-semibold mb-4">Firm Product Unit</h2>
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setShowUnitEditModal(false)}
                        >
                            &times;
                        </button>

                        <div className="space-y-4 text-sm">
                            <div>
                                <label className="block font-medium mb-1">Product Unit</label>
                                <select
                                    disabled
                                    className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
                                    value={unitEditData.unit}
                                >
                                    <option>{unitEditData.unit}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Product Price</label>
                                <input
                                    type="text"
                                    value={unitEditData.price}
                                    onChange={(e) =>
                                        setUnitEditData({ ...unitEditData, price: e.target.value })
                                    }
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">Add Quantity</label>
                                    <input
                                        type="number"
                                        value={unitEditData.addQty}
                                        onChange={(e) =>
                                            setUnitEditData({ ...unitEditData, addQty: e.target.value })
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Old Qty.</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={unitEditData.oldQty}
                                        className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 rounded border text-gray-700 bg-gray-100 hover:bg-gray-200"
                                    onClick={() => setShowUnitEditModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                                    onClick={() => {
                                        // Example: logic to update quantity
                                        const newQty =
                                            parseInt(unitEditData.oldQty) +
                                            parseInt(unitEditData.addQty || 0);
                                        setUnitDetails({
                                            ...unitDetails,
                                            price: unitEditData.price,
                                            availableQty: newQty.toString(),
                                        });
                                        setShowUnitEditModal(false);
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showViewProfileModal && viewFirmData && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-10 overflow-auto">
                    <div className="bg-white rounded-lg w-11/12 max-w-6xl p-6 relative shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Janmitra Kendra Profile</h3>
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setShowViewProfileModal(false)}
                        >
                            &times;
                        </button>

                        {/* Top Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                            <div>
                                <label className="font-medium">Firm Name</label>
                                <input readOnly value={viewFirmData.firmName} className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Selected Area Wise (Pincode)</label>
                                <input readOnly value={viewFirmData.pincodes?.join(', ')} className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Director Name</label>
                                <input readOnly value={viewFirmData.directorName} className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Date of Birth</label>
                                <input readOnly value="15-08-1975" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Mobile No.</label>
                                <input readOnly value={viewFirmData.mobile} className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Account No.</label>
                                <input readOnly value="0224" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">IFSC Code</label>
                                <input readOnly value="IDIB000J477" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Account Holder Name</label>
                                <input readOnly value="JMU" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Bank Name</label>
                                <input readOnly value="IOB" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Branch Name</label>
                                <input readOnly value="VDN" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Aadhar Card No.</label>
                                <input readOnly value="123456243625" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">Pan Card No.</label>
                                <input readOnly value="AGVPJ2135M" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                            <div>
                                <label className="font-medium">GST No.</label>
                                <input readOnly value="08AAQFJ8465L1ZF" className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-medium text-sm mb-1">Profile Image</h4>
                                <img src={viewFirmData.image} className="w-full border rounded" alt="Profile" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm mb-1">Aadhar Card Image</h4>
                                <img src="/aadhar.jpg" className="w-full border rounded" alt="Aadhar" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm mb-1">Pan Card Image</h4>
                                <img src="/pan.jpg" className="w-full border rounded" alt="Pan" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm mb-1">MSME Certificate</h4>
                                <img src="/msme.jpg" className="w-full border rounded" alt="MSME" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm mb-1">GST Certificate</h4>
                                <img src="/gst.jpg" className="w-full border rounded" alt="GST" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm mb-1">Branch Certificate</h4>
                                <img src="/branch.jpg" className="w-full border rounded" alt="Branch" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm mb-1">Signature Image</h4>
                                <img src="/signature.jpg" className="w-full border rounded" alt="Signature" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
