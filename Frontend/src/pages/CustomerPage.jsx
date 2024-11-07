import React from 'react'
import Sidebar from '../Componeents/Sidebar'
import { Outlet } from 'react-router-dom'

function CustomerPage() {
  return (
    <div>
      <Sidebar/>
      <div className="main-content">
        <Outlet/>
      </div>
    </div>
  )
}

export default CustomerPage
