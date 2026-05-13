import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 min-w-64 h-screen bg-gray-900 text-white sticky top-0 overflow-y-auto shadow-xl">

            <nav className="p-4 space-y-6">

                <div>
                    <Link
                        to="/home"
                        className="block px-4 py-3 rounded-lg hover:bg-gray-800  transition duration-200"
                    >
                        Home
                    </Link>
                </div>

                {/* Categories */}
                <div>
                    <h2 className="px-4 mb-2 text-sm font-semibold text-gray-400 uppercase">
                        Categories
                    </h2>

                    <div className="space-y-2">
                        <Link
                            to="/categories/add"
                            className="block ml-4 px-4 py-2 rounded-lg text-sm text-gray-400  border-gray-700  hover:bg-gray-800 transition duration-200"
                        >
                            Add Category
                        </Link>

                        <Link
                            to="/categories/view"
                            className="block ml-4 px-4 py-2 rounded-lg text-sm text-gray-400  border-gray-700  hover:bg-gray-800 transition duration-200"
                        >
                            View Categories
                        </Link>
                    </div>
                </div>

                {/* Sales */}
                <div>
                    <h2 className="px-4 mb-2 text-sm font-semibold text-gray-400 uppercase">
                        Sales
                    </h2>

                    <div className="space-y-2">
                        <Link
                            to="/sales/add"
                            className="block ml-4 px-4 py-2 rounded-lg text-sm text-gray-400  border-gray-700  hover:bg-gray-800 transition duration-200"
                        >
                            Add Sales
                        </Link>

                        <Link
                            to="/sales/view"
                            className="block ml-4 px-4 py-2 rounded-lg text-sm text-gray-400  border-gray-700  hover:bg-gray-800 transition duration-200"
                        >
                            View Sales
                        </Link>
                    </div>
                </div>

                {/* Users */}
                <div>
                    <h2 className="px-4 mb-2 text-sm font-semibold text-gray-400 uppercase">
                        Users
                    </h2>

                    <div className="space-y-2">
                        <Link
                            to="/users/add"
                            className="block ml-4 px-4 py-2 rounded-lg text-sm text-gray-400  border-gray-700  hover:bg-gray-800 transition duration-200"
                        >
                            Add Users
                        </Link>

                        <Link
                            to="/users/view"
                            className="block ml-4 px-4 py-2 rounded-lg text-sm text-gray-400  border-gray-700  hover:bg-gray-800 transition duration-200"
                        >
                            View Users
                        </Link>
                    </div>
                </div>

            </nav>
        </aside>
    );
};

export default Sidebar;