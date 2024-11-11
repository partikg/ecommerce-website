import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ViewCourses = () => {

    let [courses, setcourses] = useState([]);
    let [status, setstatus] = useState(true);
    let [courseids, setcourseids] = useState([]);
    let [imagepath, setimagepath] = useState([]);

    // view course
    useEffect(() => {
        axios.post('http://localhost:3/api/backend/courses/view')
            .then((success) => {
                setcourses(success.data.data)
                setimagepath(success.data.imagePath)
            })
            .catch((error) => {
                toast.error('error' + error.message);
            })
    }, [status]);


    // changestatus
    let changestatus = (id, status) => {
        console.log(id);
        console.log(!status);

        let data = {
            id: id,
            status: !status,
        }

        axios.put('http://localhost:3/api/backend/courses/change-status', data)
            .then((result) => {
                if (result.data.status == true) {
                    toast.success(result.data.message)
                    setstatus(!status);
                } else {
                    toast.error(result.data.message);
                }
            })
            .catch((error) => {
                toast.error("something went wrong" + error.message);
            })
    }


    // delete
    let singledelete = (courseid) => {
        let data = { id: courseid }
        axios.put('http://localhost:3/api/backend/courses/delete', data)
            .then((result) => {
                if (result.data.status == true) {
                    toast.success(result.data.message);
                    setstatus(!status);
                } else {
                    toast.error(result.data.message);
                }
            })
            .catch((error) => {
                toast.error('something went wrong' + error.message)
            })
    }


    // multiselect
    let multiselect = (course_id) => {
        console.log(course_id);
        let updatecourseids = [...courseids];
        if (updatecourseids.includes(course_id)) {
            updatecourseids = updatecourseids.filter((courseid) => { return courseid != course_id })
        }
        else {
            updatecourseids.push(course_id);
        }
        setcourseids(updatecourseids)
    }
    // multipledelete
    let multipledelete = () => {
        let data = { ids: courseids }
        axios.put('http://localhost:3/api/backend/courses/multiple-delete', data)
            .then((result) => {
                if (result.data.status == true) {
                    toast.success(result.data.message);
                } else {
                    toast.error(result.data.message);
                }
            })
            .catch((error) => {
                toast.error('something went wrong' + error.message)
            })
    }

    return (
        <div>

            <h2 className="text-2xl font-semibold mb-4">View Courses</h2>

            <ToastContainer />

            <button onClick={multipledelete} className="px-4 py-1 my-2 bg-red-500 text-white rounded">multiple delete</button>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">checkbox</th>
                        <th className="p-2 text-left">index</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">duration</th>
                        <th className="p-2 text-left">description</th>
                        <th className="p-2 text-left">status</th>
                        <th className="p-2 text-left">Image</th>
                        <th className="p-2 text-left">Edit</th>
                        <th className="p-2 text-left">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {courses.length != 0 ? (
                        courses.map((data, index) => (
                            <tr key={index}>
                                <td className="p-2">
                                    <input className="size-6" onClick={() => multiselect(data._id)} type="checkbox" />
                                </td>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2"> {data.name} </td>
                                <td className="p-2"> {data.price} </td>
                                <td className="p-2"> {data.duration} </td>
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
                                    <Link to={`/course/add/${data._id}`}>
                                        <button className="px-4 py-1 bg-blue-500 text-white rounded">Edit</button>
                                    </Link>
                                </td>
                                <td className="p-2">
                                    <button onClick={() => singledelete(data._id)} className="px-4 py-1 bg-blue-500 text-white rounded">delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        ''
                    )}
                </tbody>
            </table>
        </div>
    );

}


export default ViewCourses;
