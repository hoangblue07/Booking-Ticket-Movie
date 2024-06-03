import React from 'react'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import MultipleRowSlick from '../../components/MultipleRowSlick/MultipleRowSlick'

export default function Home() {
  return (
    <div>
        <HomeCarousel/>
        <h2 className='text-2xl text-blue-400 text-center mt-10'>Phim Nổi Bật</h2>
        <MultipleRowSlick/>
    </div>
  )
}
