import moment from 'moment';
import React from 'react'
import { NavLink } from 'react-router-dom';

export default function ThePhim(props) {
    const { phim } = props;
    const renderLichChieu = () => {
        return phim.lstLichChieuTheoPhim?.map((item, index) => {
            return <NavLink to={`/thanhtoan/${item.maLichChieu}`} key={index} className=" text-white bg-indigo-500 h-10 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg">{moment(item.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
        })
    }
    return (
        <section className="bg-gray-600 body-font m-3">
            <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/3 w-5/6 mb-5 md:mb-0">
                    <img className="object-cover object-center rounded" alt="hero" src={phim.hinhAnh} />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        {phim.tenPhim}
                    </h1>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 overflow-auto h-40">
                        {renderLichChieu()}
                    </div>
                </div>
            </div>
        </section>

    )
}
