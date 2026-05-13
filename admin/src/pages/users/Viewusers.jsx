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
        <div >

            <h2 className="text-2xl font-semibold mb-4">View Users</h2>

            <ToastContainer />

            <button onClick={multidelete} className="px-4 py-1 my-2 bg-red-500 text-white rounded">multipledelete</button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Select</th>
                        <th className="p-2 text-left">Sr.</th>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Edit</th>
                        <th className="p-2 text-left">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 &&
                        users.map((data, index) => (
                            <tr key={index} >

                                <td className="size-6">
                                    <input
                                        type="checkbox"
                                        checked={ids.includes(data._id)}
                                        onChange={() => multiselect(data._id)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                </td>

                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{data._id}</td>
                                <td className="p-2">{data.name}</td>
                                <td className="p-2">{data.email}</td>

                                {/* edit */}
                                <td className="border p-2 text-center">
                                    <Link to={`/users/add/${data._id}`}>
                                        <button className="px-4 py-1 bg-blue-500 text-white rounded">edit</button>
                                    </Link>
                                </td>

                                {/* delete */}
                                <td className="border p-2 text-center">
                                    <button onClick={() => Delete(data._id)} className="px-4 py-1 bg-blue-500 text-white rounded">delete</button>
                                </td>


                            </tr>
                        ))
                    }
                </tbody>

            </table >

        </div >


    )
}



