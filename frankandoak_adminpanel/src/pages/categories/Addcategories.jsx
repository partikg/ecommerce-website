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
        categories_image: '',
    })

    let submithandler = (event) => {
        event.preventDefault();
        let form = new FormData(event.target);
        let data = {
            name: form.get('categories_name'),
            status: form.get('categories_status'),
            order: form.get('categories_order'),
        }

        if (form.get('categories_image') != '') {
            data.image = form.get('categories_image');
        }

        // add or update
        if (params.categories_id == undefined) {
            axios.post('http://localhost:3/api/backend/categories/add', toFormData(data))
                .then((success) => {
                    // console.log(success.data)
                    nav('/categories/view');
                    toast.success(success.data.message)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Error: ' + error);
                })
        } else {
            axios.put('http://localhost:3/api/backend/categories/update/' + params.categories_id, toFormData(data))
                .then((success) => {
                    // console.log(success.data)
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
            axios.post('http://localhost:3/api/backend/categories/details/' + params.categories_id)
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
        data[event.target.name] = event.target.value;
        setinput(data)
    }

    return (
        <div>
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Add Categories</h2>
            <form onSubmit={submithandler}>

                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input type="text" onChange={inputhandler} value={input.categories_name} name="categories_name" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Status: (give only 1 or 0)</label>
                    <input type="text" onChange={inputhandler} value={input.categories_status} name="categories_status" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Order:</label>
                    <input type="text" onChange={inputhandler} value={input.categories_order} name="categories_order" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Image:</label>
                    <input type="file" onChange={inputhandler} name="categories_image" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <input value={(params.categories_id == undefined) ? 'submit' : 'update'} type="submit" className="bg-blue-600 text-center text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200" />



            </form >
        </div >
    )

}
