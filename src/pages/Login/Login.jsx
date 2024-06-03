import React, { Fragment, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRightOutlined, HomeOutlined } from '@ant-design/icons'
import { useFormik } from 'formik'
import *as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginAsyncApi } from '../../redux/reducer/QuanLyNguoiDungReducer';
import { USER_LOGIN } from '../../utils/config';
import { history } from '../../App';
import notifiFuntion from '../../Notification/Notification';
export default function Login() {
  const dispatch = useDispatch();
  const frmLogin = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required('Tài khoản không được bỏ trống'),
      matKhau: yup.string().min(6, 'Mật khẩu phải ít nhất 6 kí tự').required('Mật khẩu không được bỏ trống'),
    }),
    onSubmit: (value) => {
      dispatch(loginAsyncApi(value));
    }
  })
  useEffect(() => {
    if (localStorage.getItem(USER_LOGIN)) {
      notifiFuntion('info', "Bạn đã đăng nhập rồi");
      history.back();
    }
  }, [])

  return (
    <div className="bg-gradient-to-tr from-green-300 to-green-600 h-screen w-full flex justify-center items-center">
      <div className="bg-green-600 w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl">Xin Chào</h1>
          <p className="text-5xl font-extrabold">Welcome!</p>
        </div>
        <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8">
          <h3 className="text-3xl font-bold text-green-600 mb-4">
            ĐĂNG NHẬP
          </h3>
          <form onSubmit={(event) => {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form
            frmLogin.handleSubmit(event); // Xử lý submit form
          }} className="w-full flex flex-col justify-center">
            <div className="mb-4">
              <input name="taiKhoan" onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} placeholder="Tài khoản đăng nhập" className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-green-600" />
              {frmLogin.errors.taiKhoan ? <p className='text-red-400'>{frmLogin.errors.taiKhoan}</p> : ''}
            </div>
            <div className="mb-4">
              <input type='password' name="matKhau" onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} placeholder="Mật khẩu" className="w-full p-3 rounded border placeholder-gray-400 focus:outline-none focus:border-green-600" />
              {frmLogin.errors.matKhau ? <p className='text-red-400'>{frmLogin.errors.matKhau}</p> : ''}
            </div>
            <button type='submit' className="bg-green-600 font-bold text-white focus:outline-none rounded p-3">
              <ArrowRightOutlined />
            </button>
            <div className='flex m-5 flex-row justify-between'>
              <NavLink to={'/home'} className='text-green-400 font-bold'> Về Trang Trủ <HomeOutlined /></NavLink>
              <NavLink className={'font-bold text-blue-300 hover:text-blue-700'} to={'/home'}>Đăng kí tài khoản</NavLink>
            </div>

          </form>
        </div>
      </div>
    </div>

  )
}
