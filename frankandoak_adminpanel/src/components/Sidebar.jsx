import { Link } from 'react-router-dom';

const Sidebar = () => (

    <aside className="w-64 bg-gray-800 text-white h-screen p-6 shadow-lg sticky top-0">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav>
            <ul className="space-y-4">
                <li>
                    <Link
                        to="/home"
                        className="block p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                    >
                        Home
                    </Link>
                </li>

                {/* Course */}
                {/* <li>
                    <div className="block p-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer">
                        Course
                    </div>
                    <ul className="pl-4 space-y-2">
                        <li>
                            <Link
                                to="/course/add"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                Add Course
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/course/view"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                View Courses
                            </Link>
                        </li>
                    </ul>
                </li> */}

                {/* Products */}
                {/* <li>
                    <div className="block p-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer">
                        Products
                    </div>
                    <ul className="pl-4 space-y-2">
                        <li>
                            <Link
                                to="/products/add"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                Add Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products/view"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                View Products
                            </Link>
                        </li>
                    </ul>
                </li> */}

                {/* Categories */}
                <li>
                    <div className="block p-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer">
                        Categories
                    </div>
                    <ul className="pl-4 space-y-2">
                        <li>
                            <Link
                                to="/categories/add"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                Add Categories
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories/view"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                View Categories
                            </Link>
                        </li>
                    </ul>
                </li>

                {/* Sales */}
                <li>
                    <div className="block p-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer">
                        Sales
                    </div>
                    <ul className="pl-4 space-y-2">
                        <li>
                            <Link
                                to="/sales/add"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                Add Sales
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sales/view"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                View Sales
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>

);

export default Sidebar;



