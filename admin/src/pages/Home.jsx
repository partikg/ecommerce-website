import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const Home = () => {
    const [userprofile, setUserprofile] = useState({});
    const [user, setUser] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sales, setSales] = useState([]);

    const cookies = new Cookies();

    useEffect(() => {
        const usertoken = cookies.get("token");

        axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/profile`,
            {},
            {
                headers: {
                    authorization: `Bearer ${usertoken}`,
                },
            }
        )
            .then((res) => {
                setUserprofile(res.data?.data?.userdata || {});
            })
            .catch((err) => {
                console.log("Profile error:", err);
            });

        axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
            .then((res) => {
                const data = res.data?.data || res.data;
                setUser(Array.isArray(data) ? data : []);
            })

        axios.post(`${import.meta.env.VITE_API_URL}/api/categories/view`)
            .then((res) => {
                const data = res.data?.data || res.data;
                setCategories(Array.isArray(data) ? data : []);
            })

        axios.post(`${import.meta.env.VITE_API_URL}/api/sales/view`)
            .then((res) => {
                const data = res.data?.data;
                setSales(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.log("Sales error:", err);
                setSales([]);
            });

    }, []);

    return (
        <div className="space-y-8">

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 shadow-lg">
                <h1 className="text-4xl font-bold mb-2">
                    Welcome back, <span className="text-blue-100">{userprofile?.name || 'Admin'}</span>!
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-medium">Total Users</h3>
                    <p className="text-lg font-bold text-gray-700">
                        {user?.length || 0}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-medium">Total Categories</h3>
                    <p className="text-lg font-bold text-gray-700">
                        {categories?.length || 0}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-medium">Total Sales</h3>
                    <p className="text-lg font-bold text-gray-700">
                        {sales?.length || 0}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Home;