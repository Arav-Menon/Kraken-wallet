export default function Balance() {
    return (

        <>
            {/* Balance & Transactions */}
            <div className="flex flex-col gap-6 flex-1">
                {/* Balance */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Balance</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span>Unlocked balance</span>
                            <span className="font-medium">3234 INR</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Locked Balance</span>
                            <span className="font-medium">0 INR</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                            <span>Total Balance</span>
                            <span className="font-semibold">2 INR</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}