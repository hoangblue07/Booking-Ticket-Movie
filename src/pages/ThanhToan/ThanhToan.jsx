import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { danhSachGheDangChon, datVeApi, layDanhSachPhongVeApi } from '../../redux/reducer/QuanLyDatVeReducer';
import _ from 'lodash';
import { Modal } from 'antd';
import notifiFuntion from '../../Notification/Notification';

export default function ThanhToan() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { DanhSachPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  useEffect(() => {
    dispatch(layDanhSachPhongVeApi(id));
  }, [])
  const renderGhe = () => {
    return DanhSachPhongVe.danhSachGhe?.map((item, index) => {
      let classGheVip = item.loaiGhe === 'Vip' ? 'ghevip' : '';
      let classGhe = 'button_gheChuaDat';
      if (item.daDat) {
        classGhe = 'button_gheDaDat'
      }
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === item.maGhe);
      let classGheDangChon = '';
      if (indexGheDD !== -1) {
        classGheDangChon = 'button_gheDangChon';
      }
      let classGheBanDat = '';
      if (userLogin?.taiKhoan === item.taiKhoanNguoiDat) {
        classGheBanDat = 'gheBanDat';
      }
      return <button disabled={item.daDat} onClick={() => {
        dispatch(danhSachGheDangChon(item));
      }} key={index} className={`btnGhe w-7 rounded-md h-7 lg:w-12 lg:h-12 text-xs md:text-lg md:w-10 md:h-10 m-1 ${classGhe} ${classGheVip} ${classGheDangChon} ${classGheBanDat}`}>
        {item.daDat === true ? classGheBanDat !== '' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg> :
          item.stt}
      </button>
    })
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    const mangMoi = _.map(danhSachGheDangDat, ({ maGhe, giaVe }) => ({ maGhe, giaVe }));
    const data = {
      maLichChieu: id,
      danhSachVe: mangMoi,
    }
    dispatch(datVeApi(data));

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const tongTien = danhSachGheDangDat?.reduce((tong, ghe) => {
    return tong += ghe.giaVe;
  }, 0)
  return (
    <div>

      <div className='md:container w-full mb-96'>
        <h1 className='text-green-700 font-bold text-2xl text-center mt-3'>Màn Hình</h1>
        <div className='trapezoid'></div>
        <div className='grid grid-cols-10 justify-items-center items-center mt-3'>
          {renderGhe()}
        </div>
        <div className='thongTinGhe mt-5 grid grid-cols-2 md:grid-cols-5 md:justify-items-center'>
          <div className='thuong'>
            <button className='h-5 w-5'></button>
            <span className='font-bold'>Ghế thường</span>
          </div>
          <div className='vip'>
            <button className='h-5 w-5'></button>
            <span className='font-bold'>Ghế vip</span>
          </div>
          <div className='dadat'>
            <button className='h-5 w-5'></button>
            <span className='font-bold'>Ghế đã đặt</span>
          </div>
          <div className='bandat'>
            <button className='h-5 w-5'></button>
            <span className='font-bold'>Ghế bạn đặt</span>
          </div>
          <div className='ghedangchon'>
            <button className='h-5 w-5'></button>
            <span className='font-bold'>Ghế đang chọn</span>
          </div>
        </div>
      </div>
      <div className='thanhtoan p-3 md:p-10'>
        <div className='phimbanchon flex flex-row justify-between  md:justify-around'>
          <div className='tenphim'>
            <h1>{DanhSachPhongVe.thongTinPhim?.tenPhim} </h1>
            <p>{DanhSachPhongVe.thongTinPhim?.gioChieu} | {DanhSachPhongVe.thongTinPhim?.ngayChieu} | 2D Phụ đề</p>
          </div>
          <NavLink to={`/rapphim`} className='font-bold text-xs md:text-base lg:text-2xl'>Đổi suất</NavLink>
        </div>
        <div className='datve mt-6 flex flex-row justify-between  md:justify-around'>
          <h1 className='font-bold'>Tạm Tính</h1>
          <p className='font-bold'>{tongTien.toLocaleString()} đ</p>
        </div>
        <div className='text-center mt-5'>
          <button onClick={() => {
            if (danhSachGheDangDat.length === 0) {
              notifiFuntion('error', "Vui lòng chọn ghế muốn đặt");
            } else {
              showModal();
            }
          }} className='bg-orange-600 font-bold whitespace-nowrap px-32 py-5 text-xs md:text-2xl text-white rounded-md'>Đặt Vé</button>
        </div>
        <Modal className='z-30' title="Thanh Toán" open={isModalOpen} footer='' onCancel={handleCancel}>
          <div className="w-full max-w-lg mx-auto p-8">
            <div className='thongtin'>
              <h2 className="text-lg text-blue-600 font-medium mb-2">Tên: {userLogin?.hoTen}</h2>
              <h2 className="text-lg font-medium mb-2">SĐT: {userLogin?.soDT}</h2>
              <p>Tên rạp: {DanhSachPhongVe.thongTinPhim?.tenCumRap}</p>
              <p>Tên phim: <span className='font-bold'>{DanhSachPhongVe.thongTinPhim?.tenPhim}</span></p>
              <div>
                <h1 className='font-bold text-green-600 inline' >Ghế:</h1>
                {
                  danhSachGheDangDat?.map((item, index) => {
                    return <span className='mx-2 whitespace-nowrap italic' key={index}>{item.stt}</span>
                  })
                }
              </div>
              <h2>Tổng Tiển: <span className='font-bold text-red-500'>{tongTien.toLocaleString()} đ</span></h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium mb-6">Thông Tin Thẻ</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
              }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">Số Thẻ</label>
                    <input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-2">Ngày Hết Hạn</label>
                    <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input type="text" name="cvv" id="cvv" placeholder={"000"} className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="card-holder" id="card-holder" placeholder="Full Name" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="mt-8">
                  <button onClick={handleOk} className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Thanh Toán</button>
                </div>
              </form>
              <p>Lưu ý: Tính năng chưa được hoàn chỉnh 100%</p>
            </div>
          </div>

        </Modal>
      </div>

    </div>
  )
}
