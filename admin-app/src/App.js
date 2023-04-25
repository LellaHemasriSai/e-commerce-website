import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import ForgotPassword from "./pages/forgotPassword";
import MainLayout from "./components/mainLayout";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";
import Customers from "./pages/customers";
import ColorList from "./pages/colorList";
import AddColor from "./pages/addColor";
import CategoryList from "./pages/categoryList";
import AddCategory from "./pages/addCategory";
import AddBrand from "./pages/addBrand";
import BrandList from "./pages/brandList";
import ProductList from "./pages/productList";
import AddProduct from "./pages/addProduct";
import AddCoupon from "./pages/addCoupon";
import CouponList from "./pages/couponList";
import ViewOrder from "./pages/viewOrder";
import WarehouseList from "./pages/warehouseList";
import AddWarehouse from "./pages/addWarehouse";
import AddBank from "./pages/addBank";
import BankList from "./pages/bankList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="colors-list" element={<ColorList />} />
          <Route path="colors" element={<AddColor />} />
          <Route path="colors/:id" element={<AddColor />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="warehouse-list" element={<WarehouseList />} />
          <Route path="warehouse" element={<AddWarehouse />} />
          <Route path="warehouse/:id" element={<AddWarehouse />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="bank" element={<AddBank />} />
          <Route path="bank/:id" element={<AddBank />} />
          <Route path="bank-list" element={<BankList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
