import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Addcategories from './pages/categories/Addcategories';
import Viewcategories from './pages/categories/Viewcategories';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Addsales from './pages/sales/Addsales';
import Viewsales from './pages/sales/Viewsales';
import Addusers from './pages/users/Addusers';
import Viewusers from './pages/users/Viewusers';
import AdminLayout from './AdminLayout';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AdminLayout />}>
          <Route path="/home" element={<Home />} />

          <Route path="/categories/add" element={<Addcategories />} />
          <Route path="/categories/add/:categories_id" element={<Addcategories />} />
          <Route path="/categories/view" element={<Viewcategories />} />

          <Route path="/sales/add" element={<Addsales />} />
          <Route path="/sales/add/:sales_id" element={<Addsales />} />
          <Route path="/sales/view" element={<Viewsales />} />

          <Route path="/users/add" element={<Addusers />} />
          <Route path="/users/add/:users_id" element={<Addusers />} />
          <Route path="/users/view" element={<Viewusers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
