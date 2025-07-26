'use client';
import { useState } from 'react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';

import { FaTruck, FaHome, FaUser, FaUsers, FaProductHunt, FaCog } from 'react-icons/fa';
import { MdOutlineArticle, MdOutlineSettings } from 'react-icons/md';
import { BsBuilding, BsCardChecklist } from 'react-icons/bs';
import { GiHelp } from 'react-icons/gi';

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [openMenus, setOpenMenus] = useState({});

    const menuItems = [
        {
            name: 'Role & Module',
            icon: <FaTruck className="mr-2 text-blue-600" />,
            children: [
                { name: 'Role & Permission', path: '/dashboard/rolesmodule/rolepermission' },
                { name: 'Module Setting', path: '/dashboard/rolesmodule/modulesetting' },
            ],
        },
        {
            name: 'Orders',
            icon: <BsCardChecklist className="mr-2" />,
            children: [
                { name: 'Live Orders', path: '/dashboard/orders/liveorders' },
                { name: 'Past Orders', path: '/dashboard/orders/pastorders' },
                { name: 'Rejected Orders', path: '/dashboard/orders/rejectorders' },
            ],
        },
        {
            name: 'Janmitra Kendra',
            icon: <FaHome className="mr-2" />,
            children: [
                { name: 'Add Firm', path: '/dashboard/janmitrakendra/addfirm' },
                { name: 'All Firm Details', path: '/dashboard/janmitrakendra/allfirmdetails' },
                { name: 'Report Generate', path: '/dashboard/janmitrakendra/reportgenerate' },
            ],
        },
        {
            name: 'Monthly Package',
            icon: <BsBuilding className="mr-2" />,
            children: [
                { name: 'Add Monthly Packages', path: '/dashboard/monthlypackage/addmonthlypackage' },
                { name: 'All Monthly Packages', path: '/dashboard/monthlypackage/allmonthlypackage' },
            ],
        },
        {
            name: 'Designation',
            icon: <BsBuilding className="mr-2" />,
            children: [{ name: 'Add Designation', path: '/dashboard/designation/alldesignation' }],
        },
        {
            name: 'Consumer',
            icon: <FaUser className="mr-2" />,
            children: [
                { name: 'General Registration', path: '/dashboard/consumer/generalregistration' },
                { name: 'Janmitram / Udyam / Kisan', path: '/dashboard/consumer/janmitramudyamkisan' },
                { name: 'All Consumer', path: '/dashboard/consumer/allconsumer' },
                { name: 'Transferred Consumer', path: '/dashboard/consumer/transferredconsumer' },
                { name: 'Consumer Salary List', path: '/dashboard/consumer/consumersalarylist' },
                { name: 'All Farmer Data', path: '/dashboard/consumer/allfarmerdata' },
            ],
        },
        {
            name: 'Staff Member',
            icon: <FaUsers className="mr-2" />,
            children: [
                { name: 'Add Staff Member', path: '/dashboard/staffmember/addstaffmember' },
                { name: 'All Staff Details', path: '/dashboard/staffmember/allstaffdetails' },
            ],
        },
        {
            name: 'Products',
            icon: <FaProductHunt className="mr-2" />,
            children: [
                { name: 'Add Products', path: '/dashboard/products/addproducts' },
                { name: 'All Products', path: '/dashboard/products/allproducts' },
            ],
        },
        {
            name: 'Settings',
            icon: <FaCog className="mr-2" />,
            children: [
                { name: 'Add Pincode', path: '/dashboard/settings/addpincode' },
                { name: 'Add Offers', path: '/dashboard/settings/addoffers' },
                { name: 'Add Coupon', path: '/dashboard/settings/addcoupon' },
                { name: 'Category List', path: '/dashboard/settings/categorylist' },
                { name: 'Sub-Category List', path: '/dashboard/settings/subcategorylist' },
                { name: 'Member Help Desk', path: '/dashboard/settings/memberhelpdesk' },
                { name: 'Manage Unit', path: '/dashboard/settings/manageunit' },
                { name: 'FAQ', path: '/dashboard/settings/faq' },
                { name: 'Order Price', path: '/dashboard/settings/orderprice' },
                { name: 'Terms & Condition', path: '/dashboard/settings/termcondition' },
                { name: 'Privacy Policy', path: '/dashboard/settings/privacypolicy' },
            ],
        },
        {
            name: 'Web Setting',
            icon: <MdOutlineSettings className="mr-2" />,
            children: [
                { name: 'Index Banner', path: '/dashboard/websetting/indexbanner' },
                { name: 'Gallery Image', path: '/dashboard/websetting/galleryimage' },
                { name: 'Website Information', path: '/dashboard/websetting/websiteinformation' },
                { name: 'Education Management', path: '/dashboard/websetting/educationmanagement' },
            ],
        },
        {
            name: 'Manage Blogs',
            icon: <MdOutlineArticle className="mr-2" />,
            children: [
                { name: 'Add Blogs', path: '/dashboard/manageblogs/addblogs' },
                { name: 'Manage Blogs', path: '/dashboard/manageblogs/manageblogs' },
            ],
        },
        {
            name: 'Web Help Desk',
            icon: <GiHelp className="mr-2" />,
            children: [
                { name: 'Web Member Help', path: '/dashboard/webhelpdesk/webmemberhelp' },
                { name: 'Web Contact Query', path: '/dashboard/webhelpdesk/webcontactquery' },
            ],
        },
    ];

    const toggleMenu = (name) => {
        setOpenMenus((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <aside
            className={`fixed z-50 top-0 left-0 h-full bg-white shadow-lg overflow-y-auto transition-transform transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 md:static md:translate-x-0 md:block`}
        >
            <div className="flex justify-between items-center px-4 py-3 border-b">
                <h2 className="text-lg font-bold">जनमित्र</h2><Link href="/">
                    <span className="block px-2 py-1 text-gray-700 rounded hover:bg-gray-200">
                        Dashboard
                    </span>
                </Link>
                <button onClick={toggleSidebar} className="text-gray-500 md:hidden">
                    <FiMenu size={20} />
                </button>
            </div>

            <nav className="px-4 py-2 text-sm space-y-2">
                {menuItems.map((item) => (
                    <div key={item.name}>
                        <button
                            onClick={() => toggleMenu(item.name)}
                            className="flex items-center justify-between w-full py-2 rounded hover:bg-gray-100"
                        >
                            <span className="flex items-center">
                                {item.icon}
                                {item.name}
                            </span>
                            <FiChevronDown
                                className={`transition-transform ${openMenus[item.name] ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {openMenus[item.name] && (
                            <div className="ml-4 space-y-1">
                                {item.children.map((child) => (
                                    <Link key={child.name} href={child.path}>
                                        <span className="block px-2 py-1 text-gray-700 rounded hover:bg-gray-200">
                                            {child.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
