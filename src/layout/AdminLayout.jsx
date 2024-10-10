import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AdminLayout = () => {

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-80 bg-yellow-100 shadow-md ">
                {/* Admin sidebar navigation */}
                
                <nav className="mt-5 space-y-2">
  <a href="/admin" className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-orange-500 hover:text-white transition duration-200 font-semibold">
    Dashboard
  </a>
  <a href="/admin/users" className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-orange-500 hover:text-white transition duration-200 font-semibold">
    Users
  </a>
  <a href="/admin/projects" className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-orange-500 hover:text-white transition duration-200 font-semibold">
    Projects
  </a>
  <a href="/admin/create-blog" className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-orange-500 hover:text-white transition duration-200 font-semibold">
    Blog
  </a>
</nav>
            </aside>
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
