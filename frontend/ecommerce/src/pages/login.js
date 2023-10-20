import React from 'react'
import Login from '../components/login/index'
import Navbar from '../components/navbar/index';
import Footer from '../components/footer/index';

function login() {
  return (
    <div>
      <Navbar/>
      <Login/>
      <Footer/>
    </div>
  )
}

export default login