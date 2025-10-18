import React from 'react'
import { Outlet } from 'react-router-dom'
import Navebar from '../Component/Navebar'
import Footer from '../Component/Footer'

export default function MainLayout() {
  return (
    <>
    <Navebar/>

      <div className="container ">
        <Outlet/>
      </div>
    </>
  )
}
