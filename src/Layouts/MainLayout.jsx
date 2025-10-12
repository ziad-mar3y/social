import React from 'react'
import { Outlet } from 'react-router-dom'
import Navebar from '../Component/Navebar'

export default function MainLayout() {
  return (
    <>
    <Navebar/>
      <Outlet/>
    </>
  )
}
