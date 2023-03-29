import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import OurStore from "./pages/ourStore";
import CompareProduct from "./pages/compareProduct";
import Wishlist from "./pages/wishlist";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import SignUp from "./pages/signup";
import ResetPassword from "./pages/resetPassword";
import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
