import React from 'react'


import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { createBrowserHistory } from 'history';
import RapPhim from './pages/RapPhim/RapPhim';
import LienHe from './pages/LienHe/LienHe';
import Loading from './components/Loading/Loading';
import ChiTietLichChieu from './pages/ChiTietLichChieu/ChiTietLichChieu';
import ThanhToan from './pages/ThanhToan/ThanhToan';
import ThanhToanTemplate from './templates/ThanhToanTemplate/ThanhToanTemplate';
import VeCuaToi from './pages/VeCuaToi/VeCuaToi';

export const history = createBrowserHistory();

export default function App() {
  return (
    <HistoryRouter history={history}>
      <Loading />
      <Routes>
        <Route element={<HomeTemplate />}>
          <Route index path='' element={<Home />} ></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='rapphim' element={<RapPhim />}></Route>
          <Route path='lienhe' element={<LienHe />}></Route>
          <Route path='chitietlichchieu/:id' element={<ChiTietLichChieu />}></Route>
        </Route>
        <Route path='login' element={<Login />}></Route>
        <Route element={<ThanhToanTemplate />}>
          <Route path='thanhtoan/:id' element={<ThanhToan />}></Route>
          <Route path='vecuatoi' element={<VeCuaToi/>}></Route>
        </Route>
        
      </Routes>
    </HistoryRouter>
  )
}
