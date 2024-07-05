import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Error404Page from './component/Error404Page';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Main from './layouts/Main';
import Dashboard from './pages/dashboard/Dashboard';
import ListProduct from './pages/products/product/ListProduct';
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';
import AddProduct from './pages/products/product/AddProduct';
import ProfilePage from './pages/profile/ProfilePage';
import EditProduct from './pages/products/product/EditProduct';
import DetailProduct from './pages/products/product/DetailProduct';
import ListCategory from './pages/products/category/ListCategory';
import AddCategory from './pages/products/category/AddCategory';
import EditCategory from './pages/products/category/EditCategory';
import ListBrand from './pages/products/brand/ListBrand';
import AddBrand from './pages/products/brand/AddBrand';
import EditBrand from './pages/products/brand/EditBrand';
import ListOrder from './pages/order/ListOrder';
import OrderDetail from './pages/order/OrderDetail';
import EditOrder from './pages/order/EditOrder';
import ListNews from './pages/news/ListNews';
import AddNews from './pages/news/AddNews';
import EditNew from './pages/news/EditNew';
import DetailNews from './pages/news/DetailNews';
import ListUser from './pages/user/ListUser';
import ListBanners from './pages/banners/ListBanners';
import AddBanners from './pages/banners/AddBanners';

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/dang-nhap"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dang-ky"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>}>
          <Route index element={<Dashboard />} />  {/* Default component */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* products */}
          <Route path="/productlist" element={<ListProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct/:productId" element={<EditProduct />} />
          <Route path="/detailproduct/:productId" element={<DetailProduct />} />
          {/* categories */}
          <Route path="/listcategory" element={<ListCategory />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/editcategory/:categoryId" element={<EditCategory />} />
          {/* brand */}
          <Route path="/listbrand" element={<ListBrand />} />
          <Route path="/addbrand" element={<AddBrand />} />
          <Route path="/editbrand/:brandId" element={<EditBrand />} />
          {/* users */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Order */}
          <Route path="/order" element={<ListOrder />} />
          <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
          <Route path="/editorder/:orderId" element={<EditOrder />} />
          {/* News */}
          <Route path="/listnews" element={<ListNews />} />
          <Route path="/addnews" element={<AddNews />} />
          <Route path="/editnews/:newsId" element={<EditNew />} />
          <Route path="/detailnews/:newsId" element={<DetailNews />} />
          {/* users */}
          <Route path="/listusers" element={<ListUser />} />
          {/* banners */}
          <Route path="/banners" element={<ListBanners />} />
          <Route path="/addbanners" element={<AddBanners />} />
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}
export default App;
