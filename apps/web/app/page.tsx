'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";

export default function Home() {

  const { data: session, status } = useSession();

  return (
    <>

      {status === "authenticated" ? (<div> welcome {session?.user?.name} <br/> <button onClick={() => signOut()}  className="border-2 border" > Sign out </button> </div>) : <Link href={'/api/auth/signin'}  >Sign in</Link>}

    </>
  )
}