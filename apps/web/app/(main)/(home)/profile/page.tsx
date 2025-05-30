'use client';

import axios from "axios";
import { API_URL } from "../../../../api";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { string } from "zod";

type UserProfile = {
    name: string;
    email: string;
    bankName: string;
    number: string;
}

export default function ProfilePage() {

    const router = useRouter();
    const { data: session, status } = useSession();
    const [error, setError] = useState();
    const [profile, setProfile] = useState<UserProfile>({
        name: '',
        email: '',
        bankName: '',
        number: ''
    });


    const onSignOut = async () => {

        try {

            if (status !== "authenticated") {
                //@ts-ignore
                setError(`You're not logged In`);
                return;
            }
            await signOut({
                redirect: false,
                callbackUrl: '/'
            });

            localStorage.clear();

            router.push('/');
            router.refresh();

        } catch (e) {
            console.error(e);
            //@ts-ignore
            setError('Failed to logout. please try again later')
        }

    }

    const onDelete = async () => {

        try {

            const response = await axios.delete(`${API_URL}/api/apiProfile`, {
                withCredentials: true
            });

            if (response.status === 200) {

                localStorage.clear();

                await signOut({
                    redirect: false,
                    callbackUrl: '/'
                })

                router.push('/');
                router.refresh();
            }

            return response;

        } catch (e) {
            console.error(e);

        }

    }


    useEffect(() => {

        const fetchProfile = async () => {

            const response = await axios.get(`${API_URL}/api/apiProfile`, {
                withCredentials: true
            });

            // console.log('getting response from /api/apiProfile', JSON.stringify(response.data))

            if (response.status === 200 && response.data.getProfileInfo.length > 0) {
                setProfile(response.data.getProfileInfo[0]);
            }

        };

        fetchProfile();

    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        <button
                            className="absolute bottom-2 right-2 bg-purple-600 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition"
                            title="Change profile picture"
                        >
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">{profile?.name}</h2>
                    <p className="text-gray-500">{profile?.email}</p>
                </div>
                <div className="mt-8 space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium">Username</label>
                        <input type="text" className="mt-1 w-full p-2 border rounded-lg bg-gray-50" value={profile?.name} disabled />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Bank Name</label>
                        <input type="text" className="mt-1 w-full p-2 border rounded-lg bg-gray-50" value={profile?.bankName} disabled />

                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Mobile Number</label>

                        <input type="text" className="mt-1 w-full p-2 border rounded-lg bg-gray-50" value={profile?.number} disabled />

                    </div>
                </div>
                <div className="mt-8 flex justify-between gap-2">

                    <button
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                        onClick={onSignOut}
                    >
                        Logout
                    </button>
                </div>
                <button
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                    onClick={onDelete}
                >
                    Delete Account
                </button>
                <div className="text-red-500 text-center mt-4 font-bold ">{error}</div>
            </div>
        </div>
    );
}