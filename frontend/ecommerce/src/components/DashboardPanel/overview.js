import React from 'react'
import HeaderHome from './header'
import SidebarHome from './sidebar'
import "./index.css";


function Overview() {
  return (
    <>
    <div style={{width:'100%',position:"fixed",zIndex:'4'}}>
      <HeaderHome/>
    </div>
    <div style={{width:'100%', height:'100vh', top: '80px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <SidebarHome/>
      <div style={{position: 'absolute', zIndex: '1', width: 'calc(100% - 250px)', top: '80px', left: '250px', padding: '50px', height: '100vh', background: 'lightblue'}}>Overview</div>
    </div>
    </>
  )
}

export default Overview
