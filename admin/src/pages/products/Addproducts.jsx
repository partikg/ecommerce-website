import axios, { toFormData } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Addproducts() {
    let nav = useNavigate();
    let params = useParams();
    let [input, setinput] = useState({
        productname: '',
        productprice: '',
        productdescription: '',
        productorder: '',
        productstatus: '',
        productimage: '',
    })

    let submithandler = (event) => {

        event.preventDefault();

        let form = new FormData(event.target)
        let data = {
            name: form.get('productname'),
            price: form.get('productprice'),
            description: form.get('productdescription'),
            order: form.get('productorder'),
            status: form.get('productstatus')
        }

        if (form.get('productimage') != '') {
            data.image = form.get('productimage');
        }

        if (params.products_id == undefined) {
            axios.post('http://localhost:3/api/backend/products/add', toFormData(data))
                .then((success) => {
                    console.log(success)
                    nav('/products/view')
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('error')
                })
        } else {
            axios.put('http://localhost:3/api/backend/products/update/' + params.products_id, toFormData(data))
                .then((success) => {
                    if (success.data.status == true) {
                        console.log(success)
                        nav('/products/view')
                    } else {
                        toast.error(success.data.message)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('error')
                })
        }

    }

    useEffect(() => {
        if (params.products_id != undefined) {
            console.log(params.products_id)
        }
        axios.post('http://localhost:3/api/backend/products/details/' + params.products_id)
            .then((success) => {
                console.log(success.data)
                setinput({
                    productname: success.data.data.name,
                    productprice: success.data.data.price,
                    productdescription: success.data.data.description,
                    productorder: success.data.data.order,
                    productstatus: success.data.data.status,
                    productimage: success.data.data.image,
                })

            })
            .catch((error) => {
                toast.error(error.data);
            })
    }, [])

    let inputhandler = (event) => {
        let data = { ...input };
        data[event.target.name] = event.target.value;
        setinput(data)
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Add Products</h2>
            <ToastContainer />
            <form onSubmit={submithandler} className="bg-white p-4 rounded-lg shadow-md">

                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input name="productname" onChange={inputhandler} value={input.productname} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Price:</label>
                    <input name="productprice" onChange={inputhandler} value={input.productprice} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea name="productdescription" onChange={inputhandler} value={input.productdescription} className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Order</label>
                    <input name="productorder" type="text" onChange={inputhandler} value={input.productorder} className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <input name="productstatus" checked={(input.productstatus == 1) ? "checked" : ''} value={1} onChange={inputhandler} type="radio" className="w-20" />
                    Active
                    <input name="productstatus" checked={(input.productstatus == 0) ? "checked" : ''} value={0} onChange={inputhandler} type="radio" className="w-20" />
                    Inactive
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Image:</label>
                    <input name="productimage" onChange={inputhandler} type="file" className="mt-1 block w-full border-2 border-dashed border-gray-300 p-3 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" />
                </div>

                <input type="submit" className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200" />
            </form>
        </div >
    )
}
