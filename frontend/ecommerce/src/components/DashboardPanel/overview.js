import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderHome from './header';
import SidebarHome from './sidebar';
import "./index.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function Overview() {
    const [orders, setOrders] = useState([]);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        // Fetch orders
        axios.get("http://localhost:4000/api/orders")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        // Fetch listings
        axios.get('http://localhost:4000/api/listings')
            .then((response) => {
                setListings(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const orderData = orders.map(order => ({
        id: order._id,
        totalPrice: order.totalPrice
    }));

    const listingData = listings.map(listing => ({
        title: listing.description,
        price: listing.price
    }));

    return (
        <div className="orders-container" >
            <HeaderHome />
            <div className="content-container">
                <SidebarHome />
                <div className="charts-container" style={{display:'flex'}}>
                    <BarChart width={600} height={300} data={orderData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalPrice" fill="#8884d8" />
                    </BarChart>

                    <BarChart width={600} height={300} data={listingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="price" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
}

export default Overview;
