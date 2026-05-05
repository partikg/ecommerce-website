import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Addcategories from './pages/categories/Addcategories';
import Viewcategories from './pages/categories/Viewcategories';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Addsales from './pages/sales/Addsales';
import Viewsales from './pages/sales/Viewsales';
import Profile from "./pages/Profile";

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
            <Route path="/categories/add" element={<Addcategories />} />
            <Route path="/categories/view" element={<Viewcategories />} />
            <Route path="/categories/add/:categories_id?" element={<Addcategories />} />
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
