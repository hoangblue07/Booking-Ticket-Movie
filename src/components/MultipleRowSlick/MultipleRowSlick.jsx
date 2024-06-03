import React, { useState } from 'react'
import Slider from 'react-slick';
import Film from '../Film/Film';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layDanhSachPhimDangChieuApi, setTinhTrangPhimDangChieu, setTinhTrangPhimSapChieu } from '../../redux/reducer/QuanLyPhimReducer';
import { Button } from 'antd';



var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  rows: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        rows: 1,
      }
    }
  ]
};


export default function MultipleRowSlick() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimDangChieuApi(true));
  }, [])
  const { DanhSachPhim } = useSelector(state => state.QuanLyPhimReducer);
  const renderFilm = () => {
    return DanhSachPhim?.map((item, index) => {
      return <div className="w-full pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2" key={index}>
        <Film Film={item} />
      </div>
    })
  }
  const [active, setActive] = useState({
    phimDangChieu: true,
    phimSapChieu: false,
  })
  return (
    <div className="slider-container mt-10 container">
      <div className='my-3'>

        <Button 
        onClick={() => {
          setActive({
            phimDangChieu: true,
            phimSapChieu: false,
          });
          dispatch(layDanhSachPhimDangChieuApi(true));
        }} className={active.phimDangChieu ? 'bg-blue-500 text-yellow-200 rounded-md mx-2' : 'bg-gray-200 text-blac rounded-md mx-2'}>Phim Đang Chiếu</Button>
        <Button
          onClick={() => {
            setActive({
              phimDangChieu: false,
              phimSapChieu: true,
            });
            dispatch(layDanhSachPhimDangChieuApi(false));
          }} className={active.phimSapChieu ? 'bg-blue-500 text-yellow-200 rounded-md mx-2' : 'bg-gray-200 text-blac rounded-md mx-2'}>Phim Sắp Chiếu</Button>
      </div>
      <Slider {...settings} className='mx-2'>
        {renderFilm()}
      </Slider>
    </div>
  )
}
