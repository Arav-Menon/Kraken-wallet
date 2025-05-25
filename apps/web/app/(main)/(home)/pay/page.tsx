'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../../../api';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function PayPage() {
    const { data: session, status } = useSession();
    const [receiverName, setReceiverName] = useState('');
    const [bankName, setBankName] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('')
    const router = useRouter()

    React.useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin')
        }
    }, [status, router])

    const onHandleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const response = await axios.post(`${API_URL}/api/transfer`, {
                receiverName,
                bankName,
                number,
                amount
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 201) {
                alert('Money has been sent')
            }

        } catch (e) {
            console.log(e)
            setError("Something went wrong please try again later ")
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md h-full min-h-[80vh] flex flex-col justify-center p-8 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-2">Send Money</h1>
                <div className='text-2 text-red-500 text-center font-bold '>{error}</div>
                <form onSubmit={onHandleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Receiver Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter receiver's name"
                            value={receiverName}
                            onChange={e => setReceiverName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Bank Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter bank name"
                            value={bankName}
                            onChange={e => setBankName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Number</label>
                        <input
                            type="tel"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter mobile number"
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Amount</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}