import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../api"

export default function Balance() {
    const [balance, setBalance] = useState<number>()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    // const getBalance = async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}/api/wallet`, {
    //             withCredentials: true
    //         })

    //         console.log(`response : ${response.data}`)

    //         if (response.status === 200 && response.data) {
    //             setBalance(response.data.balance)
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         console.error('Failed to fetch balance:', error)
    //         setError('Failed to load balance')
    //         setLoading(false)
    //     }
    // }
    useEffect(() => {

        const fetchData = async () => {
            try {

                const respose = await axios.get(`${API_URL}/api/wallet`, {
                    withCredentials: true
                })
                if (respose.status === 200 && respose.data) {
                    setBalance(respose.data.balance)
                }
                setLoading(false);

            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, [])

    if (loading) {
        return <div>Loading balance...</div>
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <>
            <div className="flex flex-col gap-6 flex-1">
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Balance</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span>Unlocked balance</span>
                            <span className="font-medium">{balance} INR</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Locked Balance</span>
                            <span className="font-medium">0.00 INR</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                            <span>Total Balance</span>
                            <span className="font-semibold">{balance} INR</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}