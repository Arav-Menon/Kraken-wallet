'use client'

import React, { useState } from "react";
import Balance from "../../../../components/component/balance";
import axios from "axios";
import { API_URL } from "../../../../api";

const banks = [
    "HDFC Bank",
    "ICICI Bank",
    "SBI",
    "Axis Bank",
];

export default function Wallet() {
    const [amount, setAmount] = useState("");
    const [bank, setBank] = useState(banks[0]);
    const [notification, setNotification] = useState<string | undefined>()

    const handleAddMoney = async () => {

        const response = await axios.post(`${API_URL}/api/wallet`, {
            amount
        }, {
            headers : {
                'Content-Type' : 'application/json'
            }, withCredentials : true
        },)

        if(response.status === 200) {
            setNotification(`Amount ${amount} has been transfed to your account`),
            setAmount('');
        }

    };


    return (
        <div className="min-h-screen px-4 py-8 overflow-hidden">

            <div className="text-xl text-center mt-2 font-bold bg-gradient-to-r from-purple-500 to-pink-200 bg-clip-text text-transparent animate-blink">
                {notification}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Add Money */}
                <div className="bg-white rounded-xl shadow p-6 flex-1 max-w-sm">
                    <h2 className="text-2xl font-semibold mb-6">Add Money</h2>
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block font-semibold mb-1">Bank</label>
                        <select
                            value={bank}
                            onChange={e => setBank(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            {banks.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleAddMoney}
                        className="w-full py-2 rounded bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
                    >
                        Add Money
                    </button>
                </div>

               <Balance/>
                </div>
            </div>
    );
}