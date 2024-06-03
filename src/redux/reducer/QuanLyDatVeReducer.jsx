import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { batLoading, tatLoading } from './LoadingReducer';
import { http } from '../../utils/config';
import notifiFuntion from '../../Notification/Notification';
import { history } from '../../App';

const initialState = {
    DanhSachPhongVe: [],
    danhSachGheDangDat: [],
}

const QuanLyDatVeReducer = createSlice({
    name: 'QuanLyDatVeReducer',
    initialState,
    reducers: {
        danhSachGheDangChon: (state, action) => {
            //cập nhập danh sách ghế đang đặt
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.payload.maGhe);
            if (index != -1) {
                // nếu tìm thấy ghế được chọn trong mảng thì trước đó đã được click vào rồi giờ xoá đi
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.payload);
            }
            state.danhSachGheDangDat = danhSachGheCapNhat;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(layDanhSachPhongVeApi.fulfilled, (state, action) => {
            state.DanhSachPhongVe = action.payload;
        });
        builder.addCase(datVeApi.fulfilled, (state, action) => {
            state.danhSachGheDangDat = [];
        });
    }
});

export const { danhSachGheDangChon } = QuanLyDatVeReducer.actions

export default QuanLyDatVeReducer.reducer


export const layDanhSachPhongVeApi = createAsyncThunk(
    'QuanLyDatVeReducer/layDanhSachPhongVeApi', async (params, { dispatch }) => {
        dispatch(batLoading());
        setTimeout(() => {
            dispatch(tatLoading());
        }, 3000);
        const response = await http.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params}`);
        if (response.status === 200) {
            dispatch(tatLoading());
        }
        return response.data.content;
    }
)
export const datVeApi = createAsyncThunk(
    'QuanLyDatVeReducer/datVeApi', async (params, { dispatch }) => {
        dispatch(batLoading());
        setTimeout(() => {
            dispatch(tatLoading());
        }, 3000);
        const response = await http.post('QuanLyDatVe/DatVe', params);
        if (response.status === 200) {
            notifiFuntion('success', response.data.content);
            history.push('/vecuatoi');
        }
        return response;
    }
)