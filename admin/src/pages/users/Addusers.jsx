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
        <div>
            <ToastContainer />

            <h2 className="text-2xl font-semibold mb-4">
                {params.users_id == undefined ? 'Add Users' : 'Update User'}
            </h2>

            <form onSubmit={submithandler}>

                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={inputhandler}
                        className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">email:</label>
                    <input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={inputhandler}
                        className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={inputhandler}
                        className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <input
                    value={params.users_id == undefined ? 'submit' : 'update'}
                    type="submit"
                    className="bg-blue-600 text-center text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200"
                />

            </form >
        </div >
    )

}
