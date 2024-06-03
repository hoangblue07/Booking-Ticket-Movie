import { Tabs } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinLichChieuTheoHeThongRapApi } from '../../redux/reducer/QuanLyRapReducer';
import ThePhim from './ThePhim';




export default function RapPhim() {

  const dispatch = useDispatch();
  const { ThongTinLichChieu } = useSelector(state => state.QuanLyRapReducer);
  useEffect(() => {
    dispatch(layThongTinLichChieuTheoHeThongRapApi());
  }, []);
  const itemHeThongRap = () => {
    let newItems = ThongTinLichChieu?.map((item, index) => {
      const key = index.toString();
      const label =  <img height={30} width={30} src={item.logo} alt={item.logo} />
      ;
      const children = 
        <Tabs
          items={item.lstCumRap.map((cumRap, i) => {
            const id = String(i + 1);
            return {
              label: cumRap.tenCumRap,
              key: id,
              children: cumRap.danhSachPhim?.map((phim, index) => {
                return <div key={index}>
                  <ThePhim phim={phim}/>j
                </div>
              }),
            };
          })}
        />
      ;
      const data = { key, label, children };
      return data;
    });
    if (!Array.isArray(newItems)) {
      newItems = []; // Gán một mảng rỗng nếu newItems không phải là mảng
    }
    const mergedItems = [...newItems];
    return mergedItems;
  };

  return (
    <div className='container'><Tabs className='mx-2' defaultActiveKey="1" items={itemHeThongRap()} /></div>
  )
}
