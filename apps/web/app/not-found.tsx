'use client'

import { useRouter } from "next/navigation"

export default function NotFound() {
    
    const router = useRouter()

    const onHandle = () => {
        router.push('/')
    }
    
    return(
        <div className="h-screen w-screen flex-col flex justify-center items-center" >
        <h1>Error 404 </h1>
        <button
            onClick={onHandle}
            className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-white hover:text-black hover:[box-shadow:rgba(0,_0,_0,_0.16)_0px_1px_4px] transition-colors"
        >
            Return to home
        </button>
        </div>
    )
}