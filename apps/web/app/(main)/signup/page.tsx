'use client'

import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../api";
import { useRouter } from "next/navigation";

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const onHandleSubmit = async () => {

        try {

            const response = await axios.post(`${API_URL}/api/auth/signup`, {
                name,
                email,
                number,
                bankName,
                password,
            });

            

        } catch (e) {
            console.log(`Signup ${e}`);
        }

    }

    return (
        <>
            <div className="absolute top-6 left-6">
                <Link href="/">
                    <MoveLeft className="border border-black rounded-full p-1 hover:bg-gray-100 transition cursor-pointer" size={32} />
                </Link>
            </div>

            <div className="flex min-h-screen items-center justify-center bg-white">
                <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                    <h2 className="text-3xl font-bold text-center text-black mb-4">Sign Up</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Your Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="you@email.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="number">Phone Number</label>
                        <input
                            type="tel"
                            id="number"
                            name="number"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="1234567890"
                            required
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bankname">Bank Name</label>
                        <input
                            type="text"
                            id="bankname"
                            name="bankname"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Your Bank"
                            required
                            onChange={(e) => setBankName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="********"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-black/90 text-white font-semibold py-2 rounded-lg transition-colors"
                        onClick={onHandleSubmit}
                    >
                        Create Account
                    </button>
                    <p className="text-center text-sm text-gray-500">
                        Already have an account? <Link href="/signin" className="text-black underline hover:font-bold">signin</Link>
                    </p>
                </form>
            </div>
        </>
    )
}