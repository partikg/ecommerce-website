import { Link } from 'react-router-dom';

const Sidebar = () => (

    <aside className="w-72 min-w-72 flex-shrink-0 h-screen overflow-y-auto bg-gray-900 border-r border-gray-800 text-white sticky top-0 shadow-2xl">

        <div className="px-6 py-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
        </div>

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

                {/* categories */}
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

                {/* sales */}
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

                {/* users */}
                <li>
                    <div className="block p-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer">
                        Users
                    </div>
                    <ul className="pl-4 space-y-2">
                        <li>
                            <Link
                                to="/users/add"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                Add Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users/view"
                                className="block p-2 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-200"
                            >
                                View Users
                            </Link>
                        </li>
                    </ul>
                </li>

            </ul>
        </nav>
    </aside>

);

export default Sidebar;



