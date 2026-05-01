import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const Home = () => {

    let [userprofile, setuserprofile] = useState([]);
    let [user, setuser] = useState([]);
    let [courses, setcourses] = useState([]);
    let [categories, setcategories] = useState([]);
    let [products, setproducts] = useState([]);

    const cookies = new Cookies();

    useEffect(() => {

        // name
        const usertoken = cookies.get('token');
        axios.post('http://localhost:3/api/frontend/user/profile', '', {
            headers: {
                'authorization': `Bearer ${usertoken}`
            }
        })
            .then((success) => {
                // console.log(success.data.data.userdata)
                setuserprofile(success.data.data.userdata)
            })
            .catch((error) => {
                console.log(error)
            })

        // total user
        axios.post('http://localhost:3/api/frontend/user/viewuser',)
            .then((success) => {
                // console.log(success.data.data)
                setuser(success.data.data)
            })
            .catch((error) => {
                console.log(error)
            })

        // total courses
        axios.post('http://localhost:3/api/backend/courses/view',)
            .then((success) => {
                // console.log(success.data.data.length)
                setcourses(success.data.data)
            })
            .catch((error) => {
                console.log(error)
            })

        // total categories
        axios.post('http://localhost:3/api/backend/categories/view',)
            .then((success) => {
                // console.log(success.data.data.length)
                setcategories(success.data.data)
            })
            .catch((error) => {
                console.log(error)
            })

        // total products
        axios.post('http://localhost:3/api/backend/products/view',)
            .then((success) => {
                // console.log(success.data.data.length)
                setproducts(success.data.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])


    return (

        <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                    Welcome back, <span className="text-blue-500">{userprofile.name}</span>!
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="mb-4 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-medium">Total Users</h3>
                    <p className="text-lg font-medium text-gray-700">{user.length}</p>
                </div>

                <div className="mb-4 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-medium">Total Courses</h3>
                    <p className="text-lg font-medium text-gray-700">{courses.length}</p>
                </div>

                <div className="mb-4 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-medium">Total Products</h3>
                    <p className="text-lg font-medium text-gray-700">{products.length}</p>
                </div>

                <div className="mb-4 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-medium">Total Categories</h3>
                    <p className="text-lg font-medium text-gray-700">{categories.length}</p>
                </div>
            </div>
        </div>

    )
}

export default Home;
