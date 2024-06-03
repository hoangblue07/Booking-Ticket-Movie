import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { layThongTinLichChieuPhimApi } from '../../redux/reducer/QuanLyRapReducer';
import { Modal, Rate, Tabs } from 'antd';
import { string } from 'yup';
import { isArray } from 'lodash';
import moment from 'moment';

export default function ChiTietLichChieu(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const { ThongTinPhim } = useSelector(state => state.QuanLyRapReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        dispatch(layThongTinLichChieuPhimApi(params.id));
        window.scrollTo(0, 0);
    }, []);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const renderMoTa = () => {
        const moTa = ThongTinPhim.moTa?.slice(0, 150);
        return <div>
            <span>{moTa}...</span>
            <button onClick={showModal}>Xem thêm</button>
            <Modal title="Chi tiết" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <p>{ThongTinPhim.moTa}</p>
            </Modal>
        </div>
    }
    let renderLich = () => {
        const mangLich = Array.isArray(ThongTinPhim?.heThongRapChieu)
            ? ThongTinPhim.heThongRapChieu.map((item, index) => {
                const id = String(index + 1);
                const key = id;
                const label = <img height={35} width={35} src={item.logo} alt={item.logo} />;
                const children = item.cumRapChieu?.map((cumRap, index) => {
                    return <div key={index}>
                        <p className='font-bold'>
                            {cumRap.tenCumRap}
                        </p>
                        <p>{cumRap.diaChi}</p>
                        <div>
                            <div className="thong-tin-lich-chieu grid grid-cols-4">
                                {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                    return <NavLink to={`/thanhtoan/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-pink-800 font-bold">
                                        {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                    </NavLink>
                                })}
                            </div>
                        </div>
                    </div>
                });
                const a = { key, label, children };
                return a;
            })
            : [];

        const a = [...mangLich];
        return a;
    };
    const items = renderLich();
    return (
        <div id='ChiTiet' style={{ backgroundImage: `url("${ThongTinPhim.hinhAnh}")` }}>
            <div className='lichchieu'>
                <div className='md:container'>
                    <div className='md:flex flex-row nhom'>
                        <div className='hinhanh md:w-full'>
                            <img className='w-auto h-60 md:w-52 md:h-80 m-auto' src={ThongTinPhim.hinhAnh} alt={ThongTinPhim.hinhAnh} />
                        </div>
                        <div className='thongtin mx-5 md:w-full'>
                            <h2>{ThongTinPhim.tenPhim}</h2>
                            {renderMoTa()}
                        </div>
                        <div className='danhGia md:w-full ml-10 mt-10'>
                            <h1 style={{ marginBottom: '5px', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                            <h1 className="text-green-400 text-2xl "><Rate allowHalf value={ThongTinPhim.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                            <img src="https://cdn-icons-png.flaticon.com/128/6637/6637207.png" alt="crying-smiley" className="mt-10" />
                        </div>
                    </div>
                    <div className='giochieu mt-16 md:p-7'>
                        <h1 className='font-bold text-center text-lg text-green-600'>Lịch Chiếu</h1>
                        <Tabs tabPosition='left' defaultActiveKey="1" items={items} />
                    </div>
                </div>
            </div>
        </div>
    )
}
