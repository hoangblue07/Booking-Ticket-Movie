import React, { useEffect, useState } from 'react'
import { AlignLeftOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Popover } from 'antd';
import { ACCESS_TOKEN, USER_LOGIN, settings } from '../../../../utils/config';
export default function Header() {
    const [isCollapsed, setCollapsed] = useState(true);
    const handleToggle = () => {
        setCollapsed(!isCollapsed);
    };
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const renderLoginUl = () => {
        if (userLogin) {
            return <Popover
                content={<div>
                    <button className='text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300'>Xem Thông Tin</button>
                    <br />
                    <NavLink className='text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300' to='/vecuatoi'>Vé của tôi</NavLink>
                    <br/>
                    <button className='text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300' onClick={() => {
                        settings.eraseCookie(USER_LOGIN);
                        settings.eraseCookie(ACCESS_TOKEN);
                        settings.clearStorage(USER_LOGIN);
                        settings.clearStorage(ACCESS_TOKEN);
                        window.location.reload();
                    }}>Đăng xuất</button>
                </div>}
                title={`Xin chào ${userLogin.hoTen}`}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                className='p-2 lg:px-4 md:mx-2'
            >
                <button className='p-2 lg:px-4 md:mx-2 text-white hover:text-indigo-700 transition-colors duration-300'>
                    <UserOutlined className='mx-2' />
                    {userLogin.taiKhoan}
                </button>
            </Popover>
        } else {
            return <><NavLink to={'login'} className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">Đăng Nhập</NavLink>
                <NavLink className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">Đăng Kí</NavLink></>
        }
    }
    const navLinkClass = ({ isActive }) => {
        return isActive ? 'bg-purple-600 text-white p-2 lg:px-4 md:mx-2 rounded' : 'p-2 lg:px-4 md:mx-2 text-yellow-300 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-500'
    }
    return (
        <div className="header-2">
            <nav className="bg-black py-2 md:py-4">
                <div className="container px-4 mx-auto md:flex md:items-center">
                    <div className="flex justify-between items-center ">
                        <NavLink to={'/home'}>
                            <img className='h-16' src={require('../../../../assets/img/logohb/logohb.png')} alt='logo hoang blue' />
                        </NavLink>
                        <button className="border border-solid border-gray-600 px-3 py-1 rounded text-white opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle" onClick={handleToggle}>
                            <AlignLeftOutlined />
                        </button>
                    </div>
                    <div className={`md:flex flex-col md:flex-row md:mx-auto mt-3 md:mt-0 ${isCollapsed ? 'hidden' : 'flex'}`} id="navbar-collapse aaaa">
                        <NavLink
                            to={'/home'}
                            className={navLinkClass}
                        >Trang Trủ</NavLink>

                        <NavLink
                            to={'/rapphim'}
                            className={navLinkClass}
                        >Rạp Phim</NavLink>

                        <NavLink
                            to={'/lienHe'}
                            className={navLinkClass}
                        >Liên Hệ</NavLink>
                        {renderLoginUl()}
                    </div>

                </div>
            </nav>
        </div>

    )
}
