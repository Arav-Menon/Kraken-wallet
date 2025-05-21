'use client'

import React from "react";

export default function Home() {
    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex gap-8 mt-8">
                    <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Account Balance</h2>
                        <p className="text-2xl font-mono">$12,345.67</p>
                    </div>
                    <div className="flex-2 bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>+ $500.00 - Salary</li>
                            <li>- $120.00 - Groceries</li>
                            <li>- $60.00 - Utilities</li>
                            <li>+ $200.00 - Refund</li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
}
