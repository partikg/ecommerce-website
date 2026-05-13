import axios, { toFormData } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";

export default function Addcategories() {

    let nav = useNavigate();
    let params = useParams();
    let [input, setinput] = useState({
        categories_name: '',
        categories_order: '',
        categories_status: '',
        image: null,
    })

    let submithandler = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('name', input.categories_name);
        formData.append('status', input.categories_status);
        formData.append('order', input.categories_order);

        if (input.image) {
            formData.append('images', input.image);
        }

        // add or update
        if (params.categories_id == undefined) {
            axios.post(`${import.meta.env.VITE_API_URL}/api/categories/add`, formData)
                .then((success) => {
                    console.log(success.data)
                    nav('/categories/view');
                    toast.success(success.data.message)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Error: ' + error);
                })
        } else {
            axios.put(`${import.meta.env.VITE_API_URL}/api/categories/update/${params.categories_id}`, formData)
                .then((success) => {
                    console.log(success.data)
                    nav('/categories/view');
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
        if (params.categories_id != undefined) {
            console.log(params.categories_id)
            axios.post(`${import.meta.env.VITE_API_URL}/api/categories/details/` + params.categories_id)
                .then((result) => {
                    console.log(result.data)
                    setinput({
                        categories_name: result.data.data.name,
                        categories_status: result.data.data.status,
                        categories_order: result.data.data.order,
                        categories_image: result.data.data.image,
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

            <h2 className="text-3xl font-bold text-gray-900">Add Categories</h2>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl">

                <form onSubmit={submithandler} className="p-8 space-y-6">

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Category Name:
                        </label>
                        <input
                            type="text"
                            onChange={inputhandler}
                            value={input.categories_name}
                            placeholder="Enter category name"
                            name="categories_name"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Status:</label>
                        <select type="text" onChange={inputhandler} value={input.categories_status} name="categories_status" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Order:</label>
                        <input type="text"
                            onChange={inputhandler}
                            value={input.categories_order}
                            placeholder="Enter display order"
                            name="categories_order" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Category Image:</label>
                        <input type="file" onChange={inputhandler} name="image" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <input value={(params.categories_id == undefined) ? 'submit' : 'update'} type="submit" className="bg-blue-600 text-center text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200" />

                </form >

            </div>
        </div >
    )

}
