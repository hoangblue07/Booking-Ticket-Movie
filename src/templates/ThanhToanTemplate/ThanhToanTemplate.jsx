import React, { useEffect } from 'react'
import { NavLink, Outlet, redirect, useNavigate } from 'react-router-dom'
import { LeftCircleOutlined, HomeOutlined } from '@ant-design/icons'
import { history } from '../../App'
import { USER_LOGIN } from '../../utils/config'
import notifiFuntion from '../../Notification/Notification'
export default function ThanhToanTemplate() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem(USER_LOGIN)) {
            notifiFuntion('info', "Bạn cần đăng nhập để tiếp tục");
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <div className='md:container mt-3 flex flex-row justify-between'>
                <button onClick={() => {
                    history.back();
                }} className='text-green-400 font-bold'><LeftCircleOutlined /> Trở Lại</button>
                <NavLink to={'/home'} className='text-green-400 font-bold'>Trang Trủ <HomeOutlined /></NavLink>
            </div>
            <Outlet />
        </div>
    )
}
