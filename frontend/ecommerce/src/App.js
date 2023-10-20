import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Products from "./pages/products/products";
import Login from "./pages/login";
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import Overview from "./pages/overview";
import Orders from "./pages/orders"
import Listings from "./pages/listings"
import { CartProvider } from "./components/cartContext/index";
import { AuthContextProvider } from "./components/authContext";

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="/overview" element={<Overview/>} />
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/listings" element={<Listings/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
