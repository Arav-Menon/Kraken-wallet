'use client';

import React, { useRef, useState } from 'react';



export default function ProfilePage() {
    const [editing, setEditing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    };

    const handleEdit = () => setEditing(true);

    const handleSave = () => {
    };

    const handleLogout = () => {
        // Implement logout logic
        alert('Logged out!');
    };

    const handleDeleteAccount = () => {
        // Implement delete account logic
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deleted!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        <button
                            className="absolute bottom-2 right-2 bg-purple-600 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition"
                            onClick={() => fileInputRef.current?.click()}
                            title="Change profile picture"
                        >
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleProfilePicChange}
                        />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">Arav menon</h2>
                    <p className="text-gray-500">Aravmenon.ak@gmail.com</p>
                </div>
                <div className="mt-8 space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium">Username</label>
                        {editing ? (
                            <input
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        ) : (
                            <div className="mt-1 text-gray-800">Arav menon</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Bank Name</label>
                        {editing ? (
                            <input
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        ) : (
                            <div className="mt-1 text-gray-800">SBI</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Mobile Number</label>
                        {editing ? (
                            <input
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        ) : (
                            <div className="mt-1 text-gray-800">+91xxxxxxxxx</div>
                        )}
                    </div>
                </div>
                <div className="mt-8 flex justify-between gap-2">
                    {editing ? (
                        <button
                            className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>
                    )}
                    <button
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                <button
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}