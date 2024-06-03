import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
}

const LoadingReducer = createSlice({
  name: 'LoadingReducer',
  initialState,
  reducers: {
    batLoading:(state)=>{
        state.isLoading = true;
        return state;
    },
    tatLoading: (state)=>{
        state.isLoading = false;
    }
  }
});

export const {batLoading, tatLoading} = LoadingReducer.actions

export default LoadingReducer.reducer

