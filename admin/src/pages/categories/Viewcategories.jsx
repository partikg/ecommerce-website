import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Viewcategories() {

    let [categories, setcategories] = useState([]);
    let [status, setstatus] = useState(true);
    let [ids, setids] = useState([])

    // view
    useEffect(() => {

        axios.post(`${import.meta.env.VITE_API_URL}/api/categories/view`)
            .then((success) => {
                setcategories(success.data.data);
            })
            .catch((error) => {
                console.log(error)
                toast.error('error' + error.message);
            })
    }, [status])

    // changestatus
    let changestatus = (id, status) => {
        let data = {
            id: id,
            status: !status
        }
        axios.put(`${import.meta.env.VITE_API_URL}/api/categories/change-status`, data)
            .then((success) => {
                toast.success('status changed', success)
                setstatus(!status)
            })
            .catch((error) => {
                toast.error(error)
            })
    }

    // singledelete
    let Delete = (id) => {
        let data = {
            id: id
        }
        axios.put(`${import.meta.env.VITE_API_URL}/api/categories/delete`, data)
            .then((success) => {
                toast.success('single record deleted', success)
                setstatus(!status)
            })
            .catch((error) => {
                toast.error('single delete error ', error)
            })
    }

    // multiselect
    let multiselect = (id) => {
        let updateids = [...ids];
        if (updateids.includes(id)) {
            updateids = updateids.filter((item) => item !== id);
        }
        else {
            updateids.push(id);
        }
        setids(updateids);
    }
    // multidelete
    let multidelete = () => {
        let data = {
            ids: ids
        }
        axios.put(`${import.meta.env.VITE_API_URL}/api/categories/multi-delete`, data)
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

            <h2 className="text-3xl font-bold text-gray-900">Categories</h2>

            <button onClick={multidelete} className=" px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium">multipledelete</button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Select</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sr.</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Index</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Edit</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.length > 0 ? (
                        categories.map((data, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">

                                <td className="px-6 py-4"><input onClick={() => multiselect(data._id)} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" /></td>

                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{data._id}</td>
                                <td className="px-6 py-4">{data.name}</td>
                                <td className="px-6 py-4"> {data.order} </td>

                                {/* status */}
                                <td className="px-6 py-4">
                                    {
                                        data.status == 1 ?
                                            <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">active </button>
                                            :
                                            <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">inactive </button>
                                    }
                                </td>

                                {/* image */}
                                <td className="px-6 py-4">
                                    {data.image ? (
                                        <img
                                            src={data.image}
                                            className="w-20 h-max mx-auto border border-gray-300 rounded"
                                            alt="category"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-200 mx-auto rounded"></div>
                                    )}
                                </td>

                                {/* edit */}
                                <td className="border px-6 py-4 text-center">
                                    <Link to={`/categories/add/${data._id}`}>
                                        <button className="px-4 py-1 bg-blue-500 text-white rounded">edit</button>
                                    </Link>
                                </td>

                                {/* delete */}
                                <td className="border px-6 py-4 text-center">
                                    <button onClick={() => Delete(data._id)} className="px-4 py-1 bg-blue-500 text-white rounded">delete</button>
                                </td>


                            </tr>
                        ))
                    ) : ('')}
                </tbody>

            </table >

        </div >


    )
}



