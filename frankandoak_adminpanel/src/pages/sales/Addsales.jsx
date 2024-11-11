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
        form.append('categoryid', input.salescategoryid);
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
            axios.post('http://localhost:3/api/backend/sales/add', form)
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
                axios.put('http://localhost:3/api/backend/sales/update/' + params.sales_id, form)
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
            axios.post('http://localhost:3/api/backend/sales/details/' + params.sales_id)
                .then((success) => {
                    console.log('Sales Details:', success.data);
                    setinput({
                        salesname: success.data.data.name || '',
                        salestype: success.data.data.type || '',
                        salesgender: success.data.data.gender || '',
                        salescategoryid: success.data.data.category_id || '',
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

    // Handle image file change (multiple images)
    // const handleImageChange = (event) => {
    //     const files = Array.from(event.target.files); // Ensure files is an array
    //     const uniqueFiles = files.filter(
    //         (file) => !input.salesimages.some((img) => img.name === file.name) // Check for duplicates
    //     );
    //     setinput((prevState) => ({
    //         ...prevState,
    //         salesimages: [...prevState.salesimages, ...uniqueFiles], // Add only unique files
    //     }));
    // };
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files); // Ensure files is an array

        // Filter unique files based on name, size, and lastModified attributes
        const uniqueFiles = files.filter(
            (file) => !input.salesimages.some(
                (img) => img.name === file.name && img.size === file.size && img.lastModified === file.lastModified
            )
        );

        if (uniqueFiles.length > 0) {
            // Add only unique files to the state
            setinput((prevState) => ({
                ...prevState,
                salesimages: [...prevState.salesimages, ...uniqueFiles],
            }));
        }

        // Reset the file input to avoid re-selecting the same files
        event.target.value = null;  // This clears the file input
    };





    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Add Sales</h2>
            <ToastContainer />
            <form onSubmit={submithandler} className="bg-white p-4 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input name="salesname" onChange={inputhandler} value={input.salesname} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Price:</label>
                    <input name="salesprice" onChange={inputhandler} value={input.salesprice} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Type:</label>
                    <input name="salestype" onChange={inputhandler} value={input.salestype} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Gender:</label>
                    <input name="salesgender" onChange={inputhandler} value={input.salesgender} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Category ID:</label>
                    <input name="salescategoryid" onChange={inputhandler} value={input.salescategoryid} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea name="salesdescription" onChange={inputhandler} value={input.salesdescription} className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Order:</label>
                    <input name="salesorder" onChange={inputhandler} value={input.salesorder} type="text" className="mt-1 block w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Status:</label>
                    <input name="salesstatus" checked={input.salesstatus === true} value={1} onChange={inputhandler} type="radio" className="w-20" />
                    Active
                    <input name="salesstatus" checked={input.salesstatus === false} value={0} onChange={inputhandler} type="radio" className="w-20" />
                    Inactive
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Images:</label>
                    <input name="images" onChange={handleImageChange} type="file" multiple className="mt-1 block w-full border-2 border-dashed border-gray-300 p-3 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" />
                    <div>
                        {input.salesimages.length > 0 && (
                            <ul>
                                {Array.from(input.salesimages).map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <input type="submit" className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200" />
            </form>
        </div>
    );
}
