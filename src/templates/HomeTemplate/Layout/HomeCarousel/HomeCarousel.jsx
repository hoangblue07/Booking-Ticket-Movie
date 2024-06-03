import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { layDanhSachBannerApi } from '../../../../redux/reducer/QuanLyPhimReducer';

const contentStyle = {
  height: 'auto',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  backgroundPosition: 'center',
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat'

};
export default function HomeCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachBannerApi());
  }, [])
  const { DanhSachBanner } = useSelector(state => state.QuanLyPhimReducer);
  const renderBanner = () => {
    return DanhSachBanner?.map((item, index) => {
      return <div key={index}>
          <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
              <img src={item.hinhAnh} className='w-full h-full opacity-0' />
          </div>
      </div>
  })
  }
  return (
    <div className='mx-7'>
      <Slider  {...settings}>
        {renderBanner()}
      </Slider>
    </div>
  );
}
