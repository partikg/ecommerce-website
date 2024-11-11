import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Viewcategories() {

    let [categories, setcategories] = useState([]);
    let [status, setstatus] = useState(true);
    let [ids, setids] = useState([])
    let [imagepath, setimagepath] = useState('')

    // view
    useEffect(() => {

        axios.post('http://localhost:3/api/backend/categories/view')
            .then((success) => {
                setcategories(success.data.data);
                setimagepath(success.data.imagePath)
                console.log(success.data.imagePath);
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
        axios.put('http://localhost:3/api/backend/categories/change-status', data)
            .then((success) => {
                // console.log(success.data)
                toast.success('status changed', success)
                setstatus(!status)
            })
            .catch((error) => {
                // console.log(error)
                toast.error(error)
            })
    }

    // singledelete
    let Delete = (id) => {
        let data = {
            id: id
        }
        axios.put('http://localhost:3/api/backend/categories/delete', data)
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
        // console.log(id);
        let updateids = [...ids];
        if (updateids.includes(id)) {
            updateids = updateids.filter((id) => { return id != id })
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
        axios.put('http://localhost:3/api/backend/categories/multi-delete', data)
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
        <div >

            <h2 className="text-2xl font-semibold mb-4">View categories</h2>

            <ToastContainer />

            <button onClick={multidelete} className="px-4 py-1 my-2 bg-red-500 text-white rounded">multipledelete</button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Select</th>
                        <th className="p-2 text-left">Sr.</th>
                        <th className="p-2 text-left">Index</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Order</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Image</th>
                        <th className="p-2 text-left">Edit</th>
                        <th className="p-2 text-left">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.length > 0 ? (
                        categories.map((data, index) => (
                            <tr key={index} >
                                <td className="size-6"><input onClick={() => multiselect(data._id)} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" /></td>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{data._id}</td>
                                <td className="p-2">{data.name}</td>
                                <td className="p-2"> {data.order} </td>

                                {/* status */}
                                <td className="p-2">
                                    {
                                        data.status == 1 ?
                                            <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">active </button>
                                            :
                                            <button onClick={() => changestatus(data._id, data.status)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">inactive </button>
                                    }
                                </td>

                                {/* image */}
                                <td className="p-2">
                                    <img className="w-20 h-max mx-auto border border-gray-300 rounded" src={imagepath + data.image} alt="" /></td>

                                {/* edit */}
                                <td className="border p-2 text-center">
                                    <Link to={`/categories/add/${data._id}`}>
                                        <button className="px-4 py-1 bg-blue-500 text-white rounded">edit</button>
                                    </Link>
                                </td>

                                {/* delete */}
                                <td className="border p-2 text-center">
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



