'use client'

import React, { useState } from "react";

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

                {/* Balance & Transactions */}
                <div className="flex flex-col gap-6 flex-1">
                    {/* Balance */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-semibold mb-4">Balance</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span>Unlocked balance</span>
                                <span className="font-medium">{balance} INR</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Locked Balance</span>
                                <span className="font-medium">{lockedBalance} INR</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 mt-2">
                                <span>Total Balance</span>
                                <span className="font-semibold">{balance + lockedBalance} INR</span>
                            </div>
                        </div>
                    </div>
                    {/* Recent Transactions */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
                        {transactions.length === 0 ? (
                            <div className="text-gray-500">No transactions yet.</div>
                        ) : (
                            <ul>
                                {transactions.slice(0, 3).map((tx, idx) => (
                                    <li key={idx} className="mb-4 last:mb-0">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-medium">{tx.type}</div>
                                                <div className="text-xs text-gray-500">
                                                    {tx.date.toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </div>
                                            </div>
                                            <div className="text-green-700 font-semibold text-lg">
                                                + Rs {tx.amount}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}