import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const Home = () => {
    const [userprofile, setUserprofile] = useState({});
    const [user, setUser] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const cookies = new Cookies();

    useEffect(() => {
        const usertoken = cookies.get("token");

        // ---------------- PROFILE ----------------
        axios.post(
            `${import.meta.env.VITE_API_URL}/api/frontend/user/profile`,
            "",
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

        // ---------------- USERS ----------------
        axios.post(`${import.meta.env.VITE_API_URL}/api/frontend/user/viewuser`)
            .then((res) => {
                const data = res.data?.data;
                setUser(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.log("Users error:", err);
                setUser([]);
            });

        // ---------------- CATEGORIES ----------------
        axios.post(`${import.meta.env.VITE_API_URL}/api/backend/categories/view`)
            .then((res) => {
                const data = res.data?.data;
                setCategories(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.log("Categories error:", err);
                setCategories([]);
            });

        // ---------------- PRODUCTS ----------------
        axios.post(`${import.meta.env.VITE_API_URL}/api/backend/products/view`)
            .then((res) => {
                const data = res.data?.data;
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.log("Products error:", err);
                setProducts([]);
            });

    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

            {/* WELCOME CARD */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                    Welcome back,{" "}
                    <span className="text-blue-500">
                        {userprofile?.name || "User"}
                    </span>!
                </h3>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                <div className="border border-gray-300 rounded-lg p-4 shadow-md">
                    <h3 className="text-lg font-medium">Total Users</h3>
                    <p className="text-lg font-bold text-gray-700">
                        {user?.length || 0}
                    </p>
                </div>

                <div className="border border-gray-300 rounded-lg p-4 shadow-md">
                    <h3 className="text-lg font-medium">Total Products</h3>
                    <p className="text-lg font-bold text-gray-700">
                        {products?.length || 0}
                    </p>
                </div>

                <div className="border border-gray-300 rounded-lg p-4 shadow-md">
                    <h3 className="text-lg font-medium">Total Categories</h3>
                    <p className="text-lg font-bold text-gray-700">
                        {categories?.length || 0}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Home;