'use client';
import { useState } from 'react';

export default function AllDesignation() {
    const [designations, setDesignations] = useState([
        {
            id: 1,
            title: 'PRERAK',
            minPayout: 1500,
            maxPayout: 15000,
            firstIncrement: 900,
            lastIncrement: 6300,
            minSalary: 10,
            maxSalary: 99,
        },
        {
            id: 2,
            title: 'Superviser',
            minPayout: 15000,
            maxPayout: 30000,
            firstIncrement: 1000,
            lastIncrement: 7000,
            minSalary: 100,
            maxSalary: 999,
        },
        {
            id: 3,
            title: 'Assistant Manager',
            minPayout: 30000,
            maxPayout: 50000,
            firstIncrement: 1500,
            lastIncrement: 8000,
            minSalary: 1000,
            maxSalary: 9999,
        },
        {
            id: 4,
            title: 'Manager',
            minPayout: 50000,
            maxPayout: 100000,
            firstIncrement: 5000,
            lastIncrement: 10000,
            minSalary: 10000,
            maxSalary: 99999,
        },
        {
            id: 5,
            title: 'Assistant Director(Janmitra)',
            minPayout: 100000,
            maxPayout: 150000,
            firstIncrement: 5000,
            lastIncrement: 10000,
            minSalary: 100000,
            maxSalary: 999999,
        },
        {
            id: 6,
            title: 'Director(Janmitra)',
            minPayout: 150000,
            maxPayout: 204000,
            firstIncrement: 6000,
            lastIncrement: 6000,
            minSalary: 1000000,
            maxSalary: 9999999,
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        minPayout: '',
        maxPayout: '',
        firstIncrement: '',
        lastIncrement: '',
        minSalary: '',
        maxSalary: '',
    });

    const [errors, setErrors] = useState({});

    const openEditModal = (designation) => {
        setSelectedDesignation(designation);
        setFormData({ ...designation }); // pre-fill
        setErrors({});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDesignation(null);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'title' ? value : parseInt(value || 0),
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        ['minPayout', 'maxPayout', 'firstIncrement', 'lastIncrement', 'minSalary', 'maxSalary'].forEach((field) => {
            if (formData[field] === '' || isNaN(formData[field])) {
                newErrors[field] = 'Valid number required';
            }
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updated = designations.map((item) =>
            item.id === selectedDesignation.id ? { ...formData, id: item.id } : item
        );

        setDesignations(updated);
        closeModal();
    };

    return (
        <div className="p-6 bg-white rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-4">All Designation</h2>

            {/* Table */}
            <div className="overflow-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
                        <tr>
                            <th className="px-4 py-2">Sr. No.</th>
                            <th className="px-4 py-2">Designation</th>
                            <th className="px-4 py-2">Min Payout</th>
                            <th className="px-4 py-2">Max Payout</th>
                            <th className="px-4 py-2">First Increment</th>
                            <th className="px-4 py-2">Last Increment</th>
                            <th className="px-4 py-2">Min Salary</th>
                            <th className="px-4 py-2">Max Salary</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designations.map((d, i) => (
                            <tr key={d.id} className="bg-white border-t">
                                <td className="px-4 py-2">{i + 1}</td>
                                <td className="px-4 py-2">{d.title}</td>
                                <td className="px-4 py-2">{d.minPayout}</td>
                                <td className="px-4 py-2">{d.maxPayout}</td>
                                <td className="px-4 py-2">{d.firstIncrement}</td>
                                <td className="px-4 py-2">{d.lastIncrement}</td>
                                <td className="px-4 py-2">{d.minSalary}</td>
                                <td className="px-4 py-2">{d.maxSalary}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => openEditModal(d)}
                                        className="text-blue-600 border border-blue-400 hover:bg-blue-50 px-3 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                        <h3 className="text-lg font-bold mb-4">Edit Designation</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>

                            {[
                                ['minPayout', 'Min Payout'],
                                ['maxPayout', 'Max Payout'],
                                ['firstIncrement', 'First Increment'],
                                ['lastIncrement', 'Last Increment'],
                                ['minSalary', 'Min Salary'],
                                ['maxSalary', 'Max Salary'],
                            ].map(([name, label]) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium">{label}</label>
                                    <input
                                        name={name}
                                        type="number"
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                                </div>
                            ))}

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
