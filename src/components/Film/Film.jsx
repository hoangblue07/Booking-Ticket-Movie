import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Film(props) {
    const { Film } = props
    return (
        <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
            <figure className="mb-2">
                <img src={Film.hinhAnh} alt={Film.hinhAnh} className="h-64 ml-auto mr-auto" />
            </figure>
            <div className="rounded-lg p-4 bg-purple-700 flex flex-col">
                <div>
                    <h5 className="text-white text-xl h-10 font-bold leading-none mb-5">
                        {Film.tenPhim}
                    </h5>
                    <p className="text-lg text-gray-400 h-32 overflow-auto">{Film.moTa}</p>
                </div>
                <div className="flex items-center mt-3">
                    {
                        Film.dangChieu===true ? <NavLink to={`/chitietlichchieu/${Film.maPhim}`} className="text-lg bg-white text-purple-700 p-3 font-bold rounded-md hover:text-white transition-all hover:bg-yellow-300">
                            Đặt Vé
                        </NavLink> : <a className="text-white inline-flex items-center p-3 h-6 cursor-no-drop">Sắp Ra Mắt
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    }
                    <button onClick={() => {
                        window.open(`${Film.trailer}`, '_blank')
                    }} className="rounded-full bg-purple-900 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-current m-auto">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    )
}

// biDanh
// :
// "smile-am-anh"
// dangChieu
// :
// false
// danhGia
// :
// 9
// hinhAnh
// :
// "http://movieapi.cyberlearn.vn/hinhanh/smile-am-anh_gp00.jpg"
// hot
// :
// false
// maNhom
// :
// "GP00"
// maPhim
// :
// 10908
// moTa
// :
// "There are different way handle form state with Formik, but in this guide we'll be using the useFormik hook to directly provide all the Formik helpers"
// ngayKhoiChieu
// :
// "2024-04-23T00:04:09.983"
// sapChieu
// :
// true
// tenPhim
// :
// "Smile - Ám Ảnh"
// trailer
// :
// "https://www.youtube.com/embed/vAR8Jii3T1E"