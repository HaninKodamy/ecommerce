import { useRef, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./index.css";
import { Link } from "react-router-dom";
import Search from '../searchBar/index';
import Cart from '../cart/index';

function Navbar() {
  const navRef = useRef();
  const [isSticky, setIsSticky] = useState(false);
  const showNavbar = () => {
    navRef.current.classList.toggle(
      "responsive_nav"
    );
  };

  // Add a scroll event listener to toggle the sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (query) => {
    // Implement your search logic here, e.g., fetching data based on the query
    console.log(`Searching for: ${query}`);
  };

  return (
    <header className={isSticky ? "sticky" : ""}>
      <div className="logo-header">
        <Search onSearch={handleSearch} className="search-component" />
        <p className="logo">Shop Nexa</p>
        <div className="nav-cart">
        <Cart/>
        </div>
      </div>
      <div className="header-container">
        <nav ref={navRef} className="navComponent">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <button
            className="nav-btn nav-close-btn"
            onClick={showNavbar}
          >
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
       
      </div>
    </header>
  );
  
}

export default Navbar;
