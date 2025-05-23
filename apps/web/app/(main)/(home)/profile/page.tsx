'use client'

import { TrendingUpDown } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const mockUser = {
    name: "Arav Menon",
    email: "arav@example.com",
    avatar:
        "https://ui-avatars.com/api/?name=Arav+Menon&background=0D8ABC&color=",
};

export default function ProfilePage() {
    const [user, setUser] = useState(mockUser);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: user.name, email: user.email });
    const router = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setUser({ ...user, ...form });
        setEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            setUser({ name: "", email: "", avatar: "" });
        }
    };

    const handleLogout = async () => {

        try {

            await signOut({
                redirect: true,
                callbackUrl: '/'
            })

            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            localStorage.clear();

        } catch (e) {
            console.log(e)
        }


    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-8">
            <div className="bg-white/80 shadow-2xl rounded-3xl p-10 w-full max-w-md border border-blue-100 backdrop-blur-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-lg object-cover"
                        />
                        <span className="absolute bottom-2 right-2 bg-green-400 border-2 border-white rounded-full w-5 h-5"></span>
                    </div>
                    {!editing ? (
                        <>
                            <h2 className="text-3xl font-extrabold mt-4 mb-1 text-gray-800 tracking-tight drop-shadow">
                                {user.name}
                            </h2>
                            <p className="text-gray-500 mb-6 text-lg">{user.email}</p>
                            <div className="flex gap-3">
                                <button
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform font-semibold"
                                    onClick={() => setEditing(true)}
                                >
                                    Update Profile
                                </button>
                                <button
                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform font-semibold"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform font-semibold"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <form className="w-full mt-4" onSubmit={handleUpdate}>
                            <div className="mb-5">
                                <label className="block text-gray-700 mb-2 font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 transition"
                                    required
                                />
                            </div>
                            <div className="flex justify-between gap-3">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition-transform font-semibold"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow hover:bg-gray-300 font-semibold"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="mt-8 text-gray-400 text-xs">
                © {new Date().getFullYear()} Kranken Wallet
            </div>
        </div>
    );
}