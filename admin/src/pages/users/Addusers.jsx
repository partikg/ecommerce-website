import axios, { toFormData } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";

export default function Addusers() {

    let nav = useNavigate();
    let params = useParams();
    let [input, setinput] = useState({
        name: '',
        email: '',
        password: '',
    });

    let submithandler = (event) => {
        event.preventDefault();

        const formData = {
            name: input.name,
            email: input.email,
            password: input.password,
        };

        // add
        if (params.users_id == undefined) {
            axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/register`,
                formData
            )
                .then((success) => {
                    console.log(success.data)
                    nav('/users/view');
                    toast.success(success.data.message)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Error: ' + error);
                })
        } else {
            // update
            axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/${params.users_id}`,
                formData
            )
                .then((success) => {
                    console.log(success.data)
                    nav('/users/view');
                    toast.success(success.data.message)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Error: ' + error);
                })
        }

    }

    // details 
    useEffect(() => {
        if (params.users_id != undefined) {

            axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/${params.users_id}`
            )
                .then((result) => {
                    const user = result.data.data || result.data;

                    setinput({
                        name: user.name || '',
                        email: user.email || '',
                        password: '',
                    });
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Error: ' + error);
                })
        }
    }, [])

    let inputhandler = (event) => {
        let data = { ...input };

        if (event.target.type === "file") {
            data[event.target.name] = event.target.files[0];
        } else {
            data[event.target.name] = event.target.value;
        }

        setinput(data)
    }

    return (
        <div className="min-h-screen">
            <ToastContainer />

            <h2 className="text-3xl font-bold text-gray-900">
                {params.users_id == undefined ? "Add Users" : "Update User"}
            </h2>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl">
                <form onSubmit={submithandler} className="p-8 space-y-6">

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Full Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={inputhandler}
                            placeholder="Enter full name"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={inputhandler}
                            placeholder="Enter email address"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={inputhandler}
                            placeholder="Enter password"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <input
                        type="submit"
                        value={params.users_id == undefined ? "Submit" : "Update"}
                        className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200"
                    />
                </form>
            </div>
        </div>
    );

}
