import axios, { toFormData } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Addsales() {

    let nav = useNavigate();
    let params = useParams();
    let [input, setinput] = useState({
        salesname: '',
        salestype: '',
        salesgender: '',
        salescategoryid: '',
        salesprice: '',
        salesdescription: '',
        salesorder: '',
        salesstatus: true,
        salesimages: [],
    });
    let [categories, setcategories] = useState([]);

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/categories/view`)
            .then(res => {
                setcategories(res.data.data);
            })
            .catch(err => {
                console.log('Category fetch error:', err);
            });
    }, []);

    let submithandler = (event) => {
        event.preventDefault();

        if (!input.salesgender) {
            toast.error('Please select a gender');
            return;
        }

        let form = new FormData(event.target);

        form.append('name', input.salesname);
        form.append('type', input.salestype);
        form.append('gender', input.salesgender);
        form.append('category_id', input.salescategoryid);
        form.append('price', input.salesprice);
        form.append('description', input.salesdescription);
        form.append('order', input.salesorder);
        form.append('status', input.salesstatus);

        if (input.salesimages.length > 0) {
            input.salesimages.forEach((image) => {
                form.append('images', image);
            });
        }

        if (params.sales_id === undefined) {
            axios.post(`${import.meta.env.VITE_API_URL}/api/sales/add`, form)
                .then((success) => {
                    console.log('Add Success:', success);
                    if (success.data.status === true) {
                        nav('/sales/view');
                    } else {
                        console.log('API Error Message:', success.data.error_message);
                        toast.error(success.data.message || 'Something went wrong');
                    }
                })
                .catch((error) => {
                    console.error('Add Error:', error);
                    toast.error('Error while adding sale');
                });
        } else {
            if (params.sales_id) {
                axios.put(`${import.meta.env.VITE_API_URL}/api/sales/update/` + params.sales_id, form)
                    .then((success) => {
                        console.log('Update Success:', success);
                        if (success.data.status === true) {
                            nav('/sales/view');
                        } else {
                            console.log('API Error Message:', success.data.error_message);
                            toast.error(success.data.message || 'Something went wrong');
                        }
                    })
                    .catch((error) => {
                        console.error('Update Error:', error);
                        toast.error('Error while updating sale');
                    });
            } else {
                toast.error("Sales ID is missing for update");
            }
        }
    }


    useEffect(() => {
        if (params.sales_id !== undefined) {
            axios.post(`${import.meta.env.VITE_API_URL}/api/sales/details/` + params.sales_id)
                .then((success) => {
                    console.log('Sales Details:', success.data);
                    setinput({
                        salesname: success.data.data.name || '',
                        salestype: success.data.data.type || '',
                        salesgender: success.data.data.gender || '',
                        salescategoryid: success.data.data.category_id?._id || '',
                        salesprice: success.data.data.price || '',
                        salesdescription: success.data.data.description || '',
                        salesorder: success.data.data.order || '',
                        salesstatus: success.data.data.status || '',
                        salesimages: success.data.data.image || [],
                    });
                })
                .catch((error) => {
                    console.log('Error fetching sale details:', error);
                });
        }
    }, [params.sales_id]);


    let inputhandler = (event) => {
        let data = { ...input };
        data[event.target.name] = event.target.value;
        setinput(data);
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        const uniqueFiles = files.filter(
            (file) => !input.salesimages.some(
                (img) => img.name === file.name && img.size === file.size && img.lastModified === file.lastModified
            )
        );

        if (uniqueFiles.length > 0) {
            setinput((prevState) => ({
                ...prevState,
                salesimages: [...prevState.salesimages, ...uniqueFiles],
            }));
        }

        event.target.value = null;
    };

    return (
        <div className="min-h-screen">
            <ToastContainer />

            <h2 className="text-3xl font-bold text-gray-900">
                {params.sales_id === undefined ? "Add Sales" : "Update Sales"}
            </h2>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl">
                <form onSubmit={submithandler} className="p-8 space-y-6">

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Product Name:
                        </label>
                        <input
                            name="salesname"
                            value={input.salesname}
                            onChange={inputhandler}
                            type="text"
                            placeholder="Enter product name"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Price
                        </label>
                        <input
                            name="salesprice"
                            value={input.salesprice}
                            onChange={inputhandler}
                            type="text"
                            placeholder="Enter product price"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Type
                        </label>
                        <input
                            name="salestype"
                            value={input.salestype}
                            onChange={inputhandler}
                            type="text"
                            placeholder="Enter product type"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Gender
                        </label>
                        <input
                            name="salesgender"
                            value={input.salesgender}
                            onChange={inputhandler}
                            type="text"
                            placeholder="Enter gender"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Category
                        </label>
                        <select
                            name="salescategoryid"
                            value={input.salescategoryid}
                            onChange={inputhandler}
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Description
                        </label>
                        <textarea
                            name="salesdescription"
                            value={input.salesdescription}
                            onChange={inputhandler}
                            rows="4"
                            placeholder="Enter description"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Order
                        </label>
                        <input
                            name="salesorder"
                            value={input.salesorder}
                            onChange={inputhandler}
                            type="text"
                            placeholder="Enter display order"
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Status
                        </label>
                        <select
                            name="salesstatus"
                            value={input.salesstatus}
                            onChange={inputhandler}
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Product Images
                        </label>
                        <input
                            name="images"
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {input.salesimages.length > 0 && (
                            <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                {Array.from(input.salesimages).map((file, index) => (
                                    <li key={index}>
                                        {file.name || `Image ${index + 1}`}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <input
                        type="submit"
                        value={params.sales_id === undefined ? "Submit" : "Update"}
                        className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200"
                    />
                </form>
            </div>
        </div>
    );
}
