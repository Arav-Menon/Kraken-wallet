'use client';

import React, { useState } from 'react';

export default function PayPage() {
    const [receiverName, setReceiverName] = useState('');
    const [bankName, setBankName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        if (
            !receiverName ||
            !bankName ||
            !mobileNumber ||
            !amount ||
            isNaN(Number(amount)) ||
            Number(amount) <= 0
        ) {
            setError('Please fill all fields with valid information.');
            setStatus('idle');
            return;
        }

        setTimeout(() => {
            setStatus('success');
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md h-full min-h-[80vh] flex flex-col justify-center p-8 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-6">Send Money</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label className="block mb-1 font-medium">Mobile Number</label>
                        <input
                            type="tel"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter mobile number"
                            value={mobileNumber}
                            onChange={e => setMobileNumber(e.target.value)}
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
                    <div>
                        <label className="block mb-1 font-medium">Note (optional)</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Add a note"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-600">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Sending...' : 'Send Money'}
                    </button>
                    {status === 'success' && (
                        <div className="text-green-600 mt-2">Payment sent successfully!</div>
                    )}
                </form>
            </div>
        </div>
    );
}