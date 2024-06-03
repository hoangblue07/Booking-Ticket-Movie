import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, USER_LOGIN, http, settings } from '../../utils/config';
import notifiFuntion from '../../Notification/Notification';
import { history } from '../../App';
import { batLoading, tatLoading } from './LoadingReducer';

const initialState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
    thongTinTaiKhoan:{},
}

const QuanLyNguoiDungReducer = createSlice({
    name: 'QuanLyNguoiDungReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loginAsyncApi.pending, () => {

        });
        builder.addCase(loginAsyncApi.fulfilled, (state, action) => {
            notifiFuntion('success', 'Đăng nhập thành công');
            state.userLogin = action.payload;
            settings.setStorageJson(USER_LOGIN, action.payload);
            settings.setCookieJson(USER_LOGIN, action.payload, 30);
            settings.setStorage(ACCESS_TOKEN, action.payload.accessToken);
            settings.setCookie(ACCESS_TOKEN, action.payload.accessToken, 30);
        });
        builder.addCase(loginAsyncApi.rejected, (state, action) => {
            // notifiFuntion('error', 'Đăng nhập thất bại');
        })
        builder.addCase(layThongTinTaiKhoanApi.fulfilled, (state, action)=>{
            state.thongTinTaiKhoan = action.payload;
        })
    }
});

export const { } = QuanLyNguoiDungReducer.actions

export default QuanLyNguoiDungReducer.reducer

export const loginAsyncApi = createAsyncThunk(
    'QuanLyNguoiDungReducer/loginAsyncApi', async (userLogin, { dispatch }) => {
        dispatch(batLoading());
        setTimeout(() => {
            dispatch(tatLoading());
        }, 3000);

        const response = await http.post('QuanLyNguoiDung/DangNhap', userLogin);

        if (response.status === 200) {
            history.back();
            dispatch(tatLoading());
        }
        return response.data.content;
    }
)

export const layThongTinTaiKhoanApi = createAsyncThunk(
    'QuanLyNguoiDungReducer/layThongTaiKhoanApi', async (params, {dispatch})=>{
        dispatch(batLoading());
        setTimeout(() => {
            dispatch(tatLoading());
        }, 3000);
        const response = await http.post('QuanLyNguoiDung/ThongTinTaiKhoan');
        if(response.status===200){
            dispatch(tatLoading());
        }
        return response.data.content;
    }
)