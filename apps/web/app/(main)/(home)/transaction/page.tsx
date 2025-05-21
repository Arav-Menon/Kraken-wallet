import React from "react";

const transactions = [
    {
        id: "1",
        date: "2024-06-10",
        description: "Coffee Shop",
        amount: -4.5,
        currency: "USD",
    },
    {
        id: "2",
        date: "2024-06-09",
        description: "Salary",
        amount: 1500,
        currency: "USD",
    },
    {
        id: "3",
        date: "2024-06-08",
        description: "Groceries",
        amount: -52.3,
        currency: "USD",
    },
];

export default function TransactionPage() {
    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Transactions</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-t">
                                <td className="px-4 py-2 text-sm">{tx.date}</td>
                                <td className="px-4 py-2 text-sm">{tx.description}</td>
                                <td
                                    className={`px-4 py-2 text-sm text-right ${
                                        tx.amount < 0 ? "text-red-500" : "text-green-600"
                                    }`}
                                >
                                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}