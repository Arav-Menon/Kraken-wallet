'use client'

import React, { useState } from "react";
import Balance from "../../../../components/component/balance";

const banks = [
    "HDFC Bank",
    "ICICI Bank",
    "SBI",
    "Axis Bank",
];

export default function Wallet() {
    const [balance, setBalance] = useState(200);
    const [lockedBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [bank, setBank] = useState(banks[0]);
    const [transactions, setTransactions] = useState([
        {
            type: "Received INR",
            amount: 200,
            date: new Date("2024-03-30"),
        },
    ]);

    const handleAddMoney = () => {
        const value = parseFloat(amount);
        if (!isNaN(value) && value > 0) {
            setBalance(balance + value);
            setTransactions([
                {
                    type: "Received INR",
                    amount: value,
                    date: new Date(),
                },
                ...transactions,
            ]);
            setAmount("");
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 overflow-hidden">
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