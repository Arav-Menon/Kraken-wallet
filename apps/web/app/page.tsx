'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import Landing from "../components/landing/Landing";

export default function Home() {

  const { data: session, status } = useSession();

  return (
    <>
        {/* <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        {status === "authenticated" ? (
          <div className="bg-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center">
            <span className="text-lg font-semibold mb-2 text-white">
          Welcome, <span className="text-blue-400">{session?.user?.name}</span>!
            </span>
            <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
          Sign out
            </button>
          </div>
        ) : (
          <Link
            href={'/signin'}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
          >
            Sign in
          </Link>
        )}
        </div> */}
        <main>
          <Landing/>
        </main>
    </>
  )
}