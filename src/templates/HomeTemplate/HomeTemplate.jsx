import React, { useEffect } from 'react'
import Header from './Layout/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Layout/Footer/Footer'

export default function HomeTemplate() {
 useEffect(() => {
  window.scrollTo(0, 0);
 })
 

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
