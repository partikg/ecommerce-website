import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Viewusers() {

    let [ids, setids] = useState([])
    let [users, setusers] = useState([]);
    let [status, setstatus] = useState(false);

    // view
    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
            .then((success) => {
                setusers(success.data.data || success.data);
            });
    }, [status])

    // singledelete
    let Delete = (id) => {
        let data = {
            id: id
        }
        axios.delete(
            `${import.meta.env.VITE_API_URL}/api/users/${id}`
        )
            .then((success) => {
                toast.success('single record deleted', success)
                setstatus(!status);
                setids([]);
            })
            .catch((error) => {
                toast.error('single delete error ', error)
            })
    }

    let multiselect = (id) => {
        let updatedIds = [...ids];

        if (updatedIds.includes(id)) {
            updatedIds = updatedIds.filter((item) => item !== id);
        } else {
            updatedIds.push(id);
        }

        setids(updatedIds);
    };

    let multidelete = () => {
        if (ids.length === 0) {
            toast.error("Please select at least one user");
            return;
        }

        axios.put(`${import.meta.env.VITE_API_URL}/api/users/multi-delete`, {
            ids: ids
        })
            .then((success) => {
                toast.success(success.data.message);
                setstatus(!status);
                setids([]);
            })
            .catch((error) => {
                console.log(error);
                toast.error("multidelete error");
            });
    };

    return (
        <div className="min-h-screen">

            <ToastContainer />

            <h2 className="text-3xl font-bold text-gray-900">Users</h2>

            <button
                onClick={multidelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium"
            >
                Multiple Delete
            </button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Select</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sr.</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Edit</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 &&
                        users.map((data, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={ids.includes(data._id)}
                                        onChange={() => multiselect(data._id)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                </td>

                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{data._id}</td>
                                <td className="px-6 py-4">{data.name}</td>
                                <td className="px-6 py-4">{data.email}</td>

                                <td className="border px-6 py-4 text-center">
                                    <Link to={`/users/add/${data._id}`}>
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



