import { useNavigate, useParams } from "react-router-dom";
import axios, { toFormData } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const AddCourse = () => {
    let navigate = useNavigate();
    let params = useParams();
    let [input, setinput] = useState({
        course_name: '',
        course_description: '',
        course_duration: '',
        course_image: '',
        course_order: '',
        course_price: '',
        course_status: '1',
    });

    let submithandler = (event) => {
        event.preventDefault();
        let form = new FormData(event.target);
        let datasave = {
            name: form.get('course_name'),
            price: form.get('course_price'),
            duration: form.get('course_duration'),
            description: form.get('course_description'),
            order: form.get('course_order'),
            status: form.get('course_status'),
        }

        if (form.get('course_image') != '') {
            datasave.image = form.get('course_image');
        }

        if (params.course_id == undefined) {
            axios.post('http://localhost:3/api/backend/courses/add', toFormData(datasave))
                .then((result) => {
                    if (result.data.status == true) {
                        toast.success(result.data.message);
                        navigate('/course/view')
                    } else {
                        toast.error(result.data.message)
                    }
                })
                .catch((error) => {
                    toast.error(error.data.message)
                })
        } else {
            axios.put('http://localhost:3/api/backend/courses/update/' + params.course_id, toFormData(datasave))
                .then((result) => {
                    if (result.data.status == true) {
                        toast.success(result.data.message);
                        navigate('/course/view')
                    } else {
                        toast.error(result.data.message)
                    }
                })
                .catch((error) => {
                    toast.error(error.data.message)
                })
        }
    }

    useEffect(() => {
        if (params.course_id != undefined) {
            console.log(params.course_id)
        }
        axios.post('http://localhost:3/api/backend/courses/details/' + params.course_id)
            .then((result) => {
                console.log(result.data)
                setinput({
                    course_name: result.data.data.name,
                    course_description: result.data.data.description,
                    course_duration: result.data.data.duration,
                    course_image: result.data.data.image,
                    course_order: result.data.data.order,
                    course_price: result.data.data.price,
                    course_status: result.data.data.status
                })

            })
            .catch((error) => {
                toast.error(error.data);
            })
    }, [])

    let inputhandler = (event) => {
        let data = { ...input };
        data[event.target.name] = event.target.value;
        setinput(data);
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
            <ToastContainer />
            <form onSubmit={submithandler} className="bg-white p-4 rounded-lg shadow-md">

                <div className="mb-4">
                    <label className="block text-gray-700">Course Name:</label>
                    <input name="course_name" value={input.course_name} onChange={inputhandler} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Price:</label>
                    <input name="course_price" value={input.course_price} onChange={inputhandler} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Duration:</label>
                    <input name="course_duration" value={input.course_duration} onChange={inputhandler} className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" ></input>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea name="course_description" value={input.course_description} onChange={inputhandler} className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Order</label>
                    <input name="course_order" value={input.course_order} onChange={inputhandler} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <input name="course_status" checked={(input.course_status == 1) ? "checked" : ''} value={1} onChange={inputhandler} type="radio" className="w-20" />
                    Active
                    <input name="course_status" checked={(input.course_status == 0) ? "checked" : ''} value={0} onChange={inputhandler} type="radio" className="w-20" />
                    Inactive
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Image:</label>
                    <input name="course_image" onChange={inputhandler} type="file" className="mt-1 block w-full border-2 border-dashed border-gray-300 p-3 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" />
                </div>

                <input value={(params.course_id == undefined) ? 'submit' : 'update'} type="submit" className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200" />
            </form>
        </div >
    );

}
export default AddCourse;
