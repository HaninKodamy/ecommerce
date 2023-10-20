import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css'
function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Make a GET request to fetch categories
        axios.get('http://localhost:4000/api/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [categories]);
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h4>About</h4>
                        <p className="text-justify">SopNexa is a compact e-commerce platform offering high-quality products at competitive prices. While it may be small now, it has the potential to grow over time.</p>
                    </div>

                    <div className="col-3 ">
                        <h4>Categories</h4>
                        <ul className="footer-links">
                            {categories.map((category) => (
                                <div key={category._id} >
                                    <Link to={`products?category=${category.name}`} style={{ textDecoration: 'none' }}>
                                        <h5>{category.name}</h5>
                                    </Link>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="col-3">
                        <h4>Quick Links</h4>
                        <ul className="footer-links" >
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/login">LogIn</a></li>
                            <li><a href="/sell">Sell</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container1">
                <div className="row1">
                    <div className="col-8 ">
                        <p className="copyright-text">Copyright &copy; 2023 All Rights Reserved by
                            <span><b>ShopNexa</b><br/><small> by HaneenKodamy &amp; MayaFakih</small></span>.
                        </p>
                    </div>

                    <div className="col-4 social">
                        <ul className="social-icons">
                            <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a className="instagram" href="#"><i className="fa fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
