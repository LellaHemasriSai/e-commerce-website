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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="store" element={<OurStore />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
