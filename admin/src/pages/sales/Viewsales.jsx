import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function Viewsales() {

    let [sales, setsales] = useState([]);
    let [status, setstatus] = useState(true);
    let [ids, setids] = useState([])
    let [imagepath, setimagepath] = useState([])

    // sales
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/sales/view`)
            .then((success) => {
                setsales(success.data.data || []);
                setimagepath(success.data.imagePath || '');
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
        axios.put(`${import.meta.env.VITE_API_URL}/api/sales/change-status`, data)
            .then((success) => {
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
        axios.put(`${import.meta.env.VITE_API_URL}/api/sales/delete`, data)
            .then((success) => {
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
        axios.put(`${import.meta.env.VITE_API_URL}/api/sales/multi-delete`, data)
            .then((success) => {
                toast.success(success.data.message)
            })
            .catch((error) => {
                console.log(error)
                toast.error('mmultidelete error')
            })

    }

    return (
        <div className="min-h-screen">

            <ToastContainer />

            <h2 className="text-3xl font-bold text-gray-900">Sales</h2>

            <button
                onClick={multipledelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium"
            >
                Multiple Delete
            </button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Select</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sr.</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Gender</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Images</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Edit</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {sales.length > 0 &&
                        sales.map((data, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4">
                                    <input
                                        onChange={() => multiselect(data._id)}
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                </td>

                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{data.name}</td>
                                <td className="px-6 py-4">{data.price}</td>
                                <td className="px-6 py-4">{data.type}</td>
                                <td className="px-6 py-4">{data.gender}</td>
                                <td className="px-6 py-4">{data.category_id?.name}</td>
                                <td className="px-6 py-4">{data.description}</td>

                                <td className="px-6 py-4">
                                    {data.status == 1 ? (
                                        <button
                                            onClick={() =>
                                                changestatus(data._id, data.status)
                                            }
                                            className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Active
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                changestatus(data._id, data.status)
                                            }
                                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Inactive
                                        </button>
                                    )}
                                </td>

                                <td className="px-6 py-4">
                                    {data.image && data.image.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {data.image.map((image, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={image}
                                                    alt="sale"
                                                    className="w-16 h-16 object-cover border border-gray-300 rounded"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                                    )}
                                </td>

                                <td className="border px-6 py-4 text-center">
                                    <Link to={`/sales/add/${data._id}`}>
                                        <button className="px-4 py-1 bg-blue-500 text-white rounded">
                                            Edit
                                        </button>
                                    </Link>
                                </td>

                                <td className="border px-6 py-4 text-center">
                                    <button
                                        onClick={() => Delete(data._id)}
                                        className="px-4 py-1 bg-blue-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
