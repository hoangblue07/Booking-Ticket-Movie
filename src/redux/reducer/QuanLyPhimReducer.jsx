
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MA_NHOM, http } from '../../utils/config';
import { batLoading, tatLoading } from './LoadingReducer';

const initialState = {
  DanhSachBanner: [],
  DanhSachPhim:[],
}
const QuanLyPhimReducer = createSlice({
  name: 'QuanLyPhimReducer',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    // gán danh sách banner từ api về reducer
    builder.addCase(layDanhSachBannerApi.pending, () => {
    });
    builder.addCase(layDanhSachBannerApi.fulfilled, (state, action) => {
      state.DanhSachBanner = action.payload;
    });
    builder.addCase(layDanhSachBannerApi.rejected, () => {

    });

    // gán danh sách phim lấy được từ api vào reducer
    builder.addCase(layDanhSachPhimDangChieuApi.fulfilled, (state, action)=>{
      state.DanhSachPhim = action.payload;
    });
  }
});

export const {setTinhTrangPhimDangChieu, setTinhTrangPhimSapChieu } = QuanLyPhimReducer.actions
export default QuanLyPhimReducer.reducer

export const displayLoading = () => {
  return async (dispatch) => {
    try {
      await dispatch(batLoading());
    } catch (error) {

    }
  }
}

export const layDanhSachBannerApi = createAsyncThunk(
  'QuanLyPhimReducer/layDanhSachBannerApi', async (params, { dispatch }) => {
    dispatch(batLoading());
    dispatch(batLoading());
    setTimeout(() => {
      dispatch(tatLoading());
    }, 3000);
    const response = await http.get('QuanLyPhim/LayDanhSachBanner');
    if (response.status === 200) {
      dispatch(tatLoading());
    }
    return response.data.content;
  }
);
export const layDanhSachPhimDangChieuApi = createAsyncThunk(
  'QuanLyPhimReducer/layDanhSachPhimApi', async ( params,{ dispatch }) => {
    dispatch(batLoading());
    setTimeout(() => {
      dispatch(tatLoading());
    }, 3000);
    const response = await http.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`);
    if (response.status === 200) {
      dispatch(tatLoading());
    }
    if(params ===false){
      return response.data.content.filter(Film => Film.dangChieu === false);
    }
    return response.data.content.filter(Film => Film.dangChieu === true);;
  }
)

