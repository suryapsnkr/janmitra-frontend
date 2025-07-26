'use client';
import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi';

export default function UserBar({ title = 'Dashboard', user = { name: 'Dr. Aparna Kumari' }, onLogout, onToggleSidebar }) {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="md:hidden text-gray-700">
          <FiMenu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FiUser className="text-xl text-gray-600" />
          <span className="text-sm text-gray-700 hidden sm:block">{user.name}</span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm"
        >
          <FiLogOut />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
