import Link from 'next/link';
import React from 'react'

const Home = () => {

    const user = false;
  return (
    <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-white'>
            Team Access Control Demo
        </h1>
        <p>
            This demo showcases Next.js 16 access control features with role-based permissions.
        </p>
        <div className='grid md:grid-cols-2 gap-6 mb-8'>
            <div className='bg-slate-800 p-6 border border-slate-700 rounded-lg'>
                <h3 className='font-semibold mb-3 text-white'>Features Demonstrated</h3>
                <ul className='list-disc list-inside space-y-1 text-sm text-slate-300'>
                    <li>Role-based access control (RBAC)</li>
                    <li>Route protection with middleware</li>
                    <li>Server-side permission hooks</li>
                    <li>Client-side permission hooks</li>
                    <li>Dynamic route access</li>
                </ul>
            </div>
            <div className='bg-slate-800 p-6 border border-slate-700 rounded-lg'>
                <h3 className='font-semibold mb-3 text-white'>User Roles</h3>
                <ul className='list-disc list-inside space-y-1 text-sm text-slate-300'>
                    <li><strong className='text-purple-400'>Super Admin:</strong>Full system access</li>
                    <li><strong className='text-green-400'>Admin: </strong>User & team management</li>
                    <li><strong className='text-yellow-400'>User</strong>Team specific management</li>
                    <li><strong className='text-blue-400'>Manager</strong>Basic Dashboard</li>
                </ul>
            </div>
        </div>
        { user ? (
            <div className='bg-green-900/30 border border-green-600 rounded-lg p-4'>
                <p className='text-green-300'>
                    Welcome back, <strong>Divy</strong>! You are logged in as{" "}<strong className='text-green-200'>USER</strong>
                </p>
                <Link 
                    href="/dashboard"
                    className='inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
                >
                    Go to Dashboard
                </Link>
            </div>
        ) : (
            <div className='bg-blue-900/30 border border-blue-600 rounded-lg p-4'>
                <p className='text-slate-300 mb-3'>
                    You are not logged in. Please log in to access the dashboard and explore the features.
                </p>
                <Link 
                    href="/login"
                    className='inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-slate-900 hover:border-slate-700 hover:border transition'
                >
                    Login
                </Link>
                <Link 
                    href="/register"
                    className='ml-4 inline-block mt-3 px-4 py-2 border border-slate-700 text-white rounded hover:bg-blue-700 transition'
                >
                    Register
                </Link>
            </div>
        ) }
    </div>
  )
}

export default Home