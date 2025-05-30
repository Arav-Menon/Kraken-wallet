'use client'
import axios from "axios";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { API_URL } from "../../../api";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import MyLoader from "../../../components/landing/src/loaders";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password
      });

      if (res?.error) {
        setError(error)
      } else {
        router.replace('/pay')
      }


    } catch (e) {
      console.log(`Signin faild ${e} `);
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.message || 'something went wrong')
      } else {
        setError("Something went wrong, please try again later")
      }

    } finally {
      setLoader(false)
    }

  };

  return (
    <>

      <div className="absolute top-6 left-6">
        <Link href="/">
          <MoveLeft className="border border-black rounded-full p-1 hover:bg-gray-100 transition cursor-pointer" size={32} />
        </Link>
      </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}
      <div className="min-h-screen flex items-center justify-center bg-white">


        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Sign In
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mt-4" >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full py-2 bg-black mt-5 text-white font-semibold rounded-lg hover:bg-black/90 transition"
            onClick={handleSubmit}
          >
            {loader ? (

              <>
                <MyLoader />
              </>

            ) : 'Sign in'}

          </Button>
          <div className="flex justify-center gap-2 mt-4 " >
            <p>Don't have an account</p>
            <Link href="/signup" className="text-black underline" >Signup</Link>
          </div>
        </div>
      </div>
    </>
  );
}