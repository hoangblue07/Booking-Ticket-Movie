import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { batLoading, tatLoading } from './LoadingReducer';
import { MA_NHOM, http } from '../../utils/config';

const initialState = {
    ThongTinLichChieu:[],
    ThongTinPhim:[],
}

const QuanLyRapReducer = createSlice({
    name: 'QuanLyRapReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(layThongTinLichChieuTheoHeThongRapApi.fulfilled, (state, action) => {
            state.ThongTinLichChieu = action.payload;
        });
        builder.addCase(layThongTinLichChieuPhimApi.fulfilled, (state, action)=>{
            state.ThongTinPhim = action.payload;
        })
    }
});

export const { } = QuanLyRapReducer.actions

export default QuanLyRapReducer.reducer


export const layThongTinLichChieuTheoHeThongRapApi = createAsyncThunk(
    'QuanLyRapReducer/layThongTinLichChieuTheoHeThongRapApi', async (params, { dispatch }) => {
        dispatch(batLoading());
        setTimeout(() => {
            dispatch(tatLoading());
        }, 3000);
        const response = await http.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MA_NHOM}`);
        if (response.status === 200) {
            dispatch(tatLoading());
        }
        return response.data.content;
    }
)
export const layThongTinLichChieuPhimApi = createAsyncThunk(
    'QuanLyRapReducer/layThongTinLichChieuPhimApi', async(params, {dispatch})=>{
        dispatch(batLoading());
        setTimeout(() => {
            dispatch(tatLoading());
        }, 3000);
        const response = await http.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${params}`);
        if(response.status === 200){
            dispatch(tatLoading());
        }
        return response.data.content;
    }
)