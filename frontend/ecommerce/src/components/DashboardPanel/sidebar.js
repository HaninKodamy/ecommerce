import React from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./index.css";

function SidebarHome() {
  return (
    <Sidebar className="sideBarComp" style={{position: 'relative', zIndex: '9'}}>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
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
          <MenuItem component={<Link to="/overview" />} className="menu-item">
            {" "}
            Overview
          </MenuItem>
          <MenuItem component={<Link to="/listings" />} className="menu-item">
            {" "}
            Listings
          </MenuItem>
          <MenuItem component={<Link to="/orders" />} className="menu-item">
            {" "}
            Orders
          </MenuItem>
        </Menu>
      </Sidebar>
  )
}

export default SidebarHome