import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinTaiKhoanApi } from '../../redux/reducer/QuanLyNguoiDungReducer';
import _ from 'lodash';
import moment from 'moment';
export default function VeCuaToi() {
  const dispatch = useDispatch();
  const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer);
  const mangVe = thongTinTaiKhoan.thongTinDatVe;
  useEffect(() => {
    dispatch(layThongTinTaiKhoanApi());
  }, [])
  console.log(mangVe);
  const renderVe = () => {
    return mangVe?.map((item, index) => {
      const seats = _.first(item.danhSachGhe);
      return <div className='cardve m-3 flex flex-row bg-gray-300 p-3 items-center rounded-md' key={index}>
        <img className='h-24 w-16 mr-2' src={item.hinhAnh} alt='hinh ảnh phim' />
        <div className='font-bold'>
          <h1 className=''>{item.tenPhim}</h1>
          <p className='underline text-red-400'>{seats.tenCumRap} | {seats.tenHeThongRap}</p>
          <p>Ngày đặt: <span>{moment(item.ngayDat).format('DD-MM-YYYY')}</span></p>
          <p className='w-72 overflow-auto whitespace-nowrap'>Ghế: {item.danhSachGhe?.map((ghe, index)=>{
            return <span key={index} className='whitespace-nowrap mx-3 italic'>{ghe.tenGhe}</span>
          })}</p>
        </div>
      </div>
    })
  }

  return (
    <div className='mx-2'>
      <div className='text-center font-bold'>
        <h1 className='text-2xl text-blue-800'>Xin Chào {thongTinTaiKhoan?.hoTen}!</h1>
        <h4 className='text-xl text-purple-900'>Cảm ơn bạn đã đặt vé, hãy chú ý thời gian địa điểm để không bỏ lỡ nhé</h4>
      </div>
      <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 vecuatoi '>
        {renderVe()}
      </div>
    </div>
  )
}
