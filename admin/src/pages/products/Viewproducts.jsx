import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Viewproducts() {

    let [products, setproducts] = useState([]);
    let [status, setstatus] = useState(true);
    let [ids, setids] = useState([])
    let [imagepath, setimagepath] = useState([])

    // products
    useEffect(() => {

        axios.post('http://localhost:3/api/backend/products/view')
            .then((success) => {
                // console.log(success)
                setproducts(success.data.data)
                setimagepath(success.data.imagePath)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [status])

    // changestatus
    let changestatus = (id, status) => {

        let data = {
            id: id,
            status: !status
        }
        axios.put('http://localhost:3/api/backend/products/change-status', data)
            .then((success) => {
                console.log(success)
                toast.success('status changed', success)
                setstatus(!status)
            })
            .catch((error) => {
                console.log(error)
                toast.error(error)
            })
    }

    // singledelete
    let Delete = (id) => {
        let data = {
            id: id
        }
        axios.put('http://localhost:3/api/backend/products/delete', data)
            .then((success) => {
                // console.log(success.data.status)
                if (success.data.status == true) {
                    toast.success(success.data.message);
                    setstatus(!status);
                } else {
                    toast.error(success.data.message);
                }
            })
            .catch((error) => {
                toast.error('something went wrong')
                console.log(error)
            })

    }

    // multiseleect
    let multiselect = (id) => {
        console.log(id)
        let updateids = [...ids];
        if (updateids.includes(id)) {
            updateids = updateids.filter((id) => { return id != id })
        }
        else {
            updateids.push(id);
        }
        setids(updateids);
    }

    // multipledelete
    let multipledelete = () => {
        let data = {
            ids: ids
        }
        axios.put('http://localhost:3/api/backend/products/multi-delete', data)
            .then((success) => {
                console.log(success)
                toast.success(success.data.message)
            })
            .catch((error) => {
                console.log(error)
                toast.error('mmultidelete error')
            })

    }

    return (

        <div>

            <h2 className="text-2xl font-semibold mb-4">View Products</h2>

            <ToastContainer />

            <button onClick={multipledelete} className="px-4 py-1 my-2 bg-red-500 text-white rounded">multiple delete</button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">checkbox</th>
                        <th className="p-2 text-left">index</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">description</th>
                        <th className="p-2 text-left">status</th>
                        <th className="p-2 text-left">Image</th>
                        <th className="p-2 text-left">Edit</th>
                        <th className="p-2 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length != 0 ? (
                        products.map((data, index) => (
                            <tr key={index}>
                                <td className="size-6"><input onClick={() => multiselect(data._id)} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" /></td>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2"> {data.name} </td>
                                <td className="p-2"> {data.price} </td>
                                <td className="p-2"> {data.description} </td>
                                <td className="p-2">
                                    {data.status == 1 ? (
                                        <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">active</button>
                                    ) : (
                                        <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Inactive</button>
                                    )}
                                </td>
                                <td className="p-2">
                                    <img src={imagepath + data.image} alt="Course Image" className="w-20 h-max mx-auto border border-gray-300 rounded" />
                                </td>
                                <td className="p-2">
                                    <Link to={`/products/add/${data._id}`}>
                                        <button className="px-4 py-1 bg-blue-500 text-white rounded">Edit</button>
                                    </Link>
                                </td>
                                <td className="p-2">
                                    <button onClick={() => Delete(data._id)} className="px-4 py-1 bg-blue-500 text-white rounded">delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        ''
                    )}
                </tbody>
            </table>

        </div>
    )
}
