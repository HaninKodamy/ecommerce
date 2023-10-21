import React from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./index.css";
import { useLocation } from 'react-router-dom';

function SidebarHome() {
  const location = useLocation();
  const currentPage = location.pathname;
  const pageName = currentPage.split('/').pop();
  return (
    <Sidebar className="sideBarComp" style={{position: 'relative', zIndex: '9'}}>
        <Menu
          menuItemStyles={{
            button: {
             
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <p
            className="logo"
            style={{
              fontSize: "30px",
              paddingLeft: "40px",
              paddingBottom: "10px",
              paddingTop: "10px",
            }}
          >
            Shop Nexa
          </p>
          <MenuItem component={<Link to="/overview" />} className={`${pageName=='overview'?'active menu-item':'menu-item'}`}>
            {" "}
            Overview
          </MenuItem>
          <MenuItem component={<Link to="/listings" />} className={`${pageName=='listings'?'active menu-item':'menu-item'}`}>
            {" "}
            Listings
          </MenuItem>
          <MenuItem component={<Link to="/orders" />} className={`${pageName=='orders'?'active menu-item':'menu-item'}`}>
            {" "}
            Orders
          </MenuItem>
        </Menu>
      </Sidebar>
  )
}

export default SidebarHome