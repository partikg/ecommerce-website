import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Fixed import
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AddCourse from './pages/course/Addcourse';
import ViewCourses from './pages/course/Viewcourse';
import Profile from './pages/profile';
import Addcategories from './pages/categories/Addcategories';
import Viewcategories from './pages/categories/Viewcategories';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Addproducts from './pages/products/Addproducts';
import Viewproducts from './pages/products/Viewproducts';
import Addsales from './pages/sales/Addsales';
import Viewsales from './pages/sales/Viewsales';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

// Main content inside Router
function MainContent() {
  const location = useLocation(); // useLocation should be inside the Router

  return (
    <div className="flex">
      {location.pathname !== '/' && location.pathname !== '/Register' && <Sidebar />}
      <div className="flex-1">
        {location.pathname !== '/' && location.pathname !== '/Register' && <Header />}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/course/add" element={<AddCourse />} />
            <Route path="/course/view" element={<ViewCourses />} />
            <Route path="/products/add" element={<Addproducts />} />
            <Route path="/products/view" element={<Viewproducts />} />
            <Route path="/categories/add" element={<Addcategories />} />
            <Route path="/categories/view" element={<Viewcategories />} />
            <Route path="/course/add/:course_id?" element={<AddCourse />} />
            <Route path="/categories/add/:categories_id?" element={<Addcategories />} />
            <Route path="/products/add/:products_id?" element={<Addproducts />} />
            <Route path="/sales/add" element={<Addsales />} />
            <Route path="/sales/view" element={<Viewsales />} />
            <Route path="/sales/add/:sales_id?" element={<Addsales />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
