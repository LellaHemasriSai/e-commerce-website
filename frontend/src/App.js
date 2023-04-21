import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import OurStore from "./pages/ourStore";
import CompareProduct from "./pages/compareProduct";
import Wishlist from "./pages/wishlist";
import Logincs from "./pages/logincs";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import SignUp from "./pages/signup";
import ResetPassword from "./pages/resetPassword";
import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import { PrivateRoute } from "./routes/privateRoute";
import { OpenRoute } from "./routes/openRoute";
import Orders from "./pages/orders";
import SellerSignUp from "./pages/sellerSignup";

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
            <Route
              path="cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="my-orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route
              path="wishlist"
              element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              }
            />
            <Route path="logincs" element={<Logincs />} />
            <Route
              path="login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="signup"
              element={
                <OpenRoute>
                  <SignUp />
                </OpenRoute>
              }
            />
            <Route
              path="seller-register"
              element={
                <OpenRoute>
                  <SellerSignUp />
                </OpenRoute>
              }
            />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
