import { configureStore } from "@reduxjs/toolkit";
import QuanLyPhimReducer from "./reducer/QuanLyPhimReducer";
import QuanLyNguoiDungReducer from "./reducer/QuanLyNguoiDungReducer";
import LoadingReducer from "./reducer/LoadingReducer";
import QuanLyRapReducer from "./reducer/QuanLyRapReducer";
import QuanLyDatVeReducer from "./reducer/QuanLyDatVeReducer";



export const store = configureStore({
    reducer:{
        LoadingReducer,
        QuanLyPhimReducer,
        QuanLyNguoiDungReducer,
        QuanLyRapReducer,
        QuanLyDatVeReducer,
    },
})