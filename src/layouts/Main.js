import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
export default function Main() {

  return (
    <>
     
      <div class="main-wrapper">
        <Header />
        <Outlet />
        <Sidebar />
      </div></>
  )

}
