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
        axios.post('http://localhost:3/api/backend/sales/view')
            .then((success) => {
                console.log('API Response:', success.data);
                setsales(success.data.data)
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
        axios.put('http://localhost:3/api/backend/sales/change-status', data)
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
        axios.put('http://localhost:3/api/backend/sales/delete', data)
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
        axios.put('http://localhost:3/api/backend/sales/multi-delete', data)
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

            <h2 className="text-2xl font-semibold mb-4">View sales</h2>

            <ToastContainer />

            <button onClick={multipledelete} className="px-4 py-1 my-2 bg-red-500 text-white rounded">multiple delete</button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="border-b">
                        <th className="text-left">checkbox</th>
                        <th className="p-2 text-left">index</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">Type</th>
                        <th className="p-2 text-left">Gender</th>
                        <th className="p-2 text-left">categoryname</th>
                        <th className="p-2 text-left">categoryimage</th>
                        <th className="p-2 text-left">description</th>
                        <th className="p-2 text-left">status</th>
                        <th className="p-2 text-left">Image</th>
                        <th className="p-2 text-left">Edit</th>
                        <th className="p-2 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.length != 0 ? (
                        sales.map((data, index) => (
                            <tr key={index}>
                                <td className="size-6"><input onClick={() => multiselect(data._id)} type="checkbox" className="form-checkbox h-8 w-8 text-blue-600 cursor-pointer " /></td>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2"> {data.name} </td>
                                <td className="p-2"> {data.price} </td>
                                <td className="p-2"> {data.type} </td>
                                <td className="p-2"> {data.gender} </td>
                                <td className="p-2"> {data.category_id?.name} </td>
                                <td className="p-2"> {data.category_id?.image} </td>
                                <td className="p-2"> {data.description} </td>
                                <td className="p-2">
                                    {data.status == 1 ? (
                                        <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">active</button>
                                    ) : (
                                        <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Inactive</button>
                                    )}
                                </td>

                                {/* <td className="p-2">
                                    <img src={imagepath + data.image} alt="Course Image" className="w-20 h-max mx-auto border border-gray-300 rounded" />
                                </td> */}
                                <td className="p-2">
                                    {data.image && data.image.length > 0 ? (
                                        <div className="flex items-center gap-2">
                                            {data.image.map((image, index) => (
                                                <div key={index} className="relative">
                                                    {/* Image Display */}
                                                    <img
                                                        src={`${imagepath}${image}`} // Concatenates imagepath with the image URL
                                                        alt={`Image ${index + 1}`}
                                                        className="w-16 h-16 object-cover border border-gray-300 rounded shadow-md"
                                                    />
                                                    {/* Image Label Below */}
                                                    <div className="text-xs text-center mt-1 text-gray-600">{`Image ${index + 1}`}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span>No images available</span>
                                    )}
                                </td>





                                <td className="p-2">
                                    <Link to={`/sales/add/${data._id}`}>
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
