import React from 'react'
import Register from '../components/register';
import Navbar from '../components/navbar/index';
import Footer from '../components/footer/index';

function register() {
  return (
    <div>
      <Navbar/>
      <Register/>
      <Footer/>
    </div>
  )
}

export default register