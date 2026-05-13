import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Cookies } from 'react-cookie';

export default function Profile() {

    let [profile, setprofile] = useState([]);

    const cookies = new Cookies();

    useEffect(() => {

        const usertoken = cookies.get('token');
        axios.post(`${import.meta.env.VITE_API_URL}/api/users/profile`, '', {
            headers: {
                'authorization': `Bearer ${usertoken}`
            }
        })
            .then((success) => {
                setprofile(success.data.data.userdata)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>

            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-max mx-auto">

                <div className="mb-4 text-center">
                    <h3 className="text-lg font-medium mb-2">User Profile</h3>
                </div>

                <div className="mb-2">
                    <strong className="block text-gray-700">Name:</strong>
                    <span className="block text-gray-900">{profile.name}</span>
                </div>

                <div className="mb-2">
                    <strong className="block text-gray-700">email:</strong>
                    <span className="block text-gray-900">{profile.email}</span>
                </div>

            </div>

        </div>
    )
}
